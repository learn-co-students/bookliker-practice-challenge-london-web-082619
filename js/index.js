window.addEventListener("DOMContentLoaded", () => loadBooks());
const bookList = document.querySelector("#list-panel");
const currentUser = { id: 1, username: "pouros" };

const loadBooks = () => {
  adapter.getBooks()
    .then(renderBooksList)
    .catch(console.error);
}

const renderBooksList = books => {
  books.forEach(renderBook);
}

const renderBook = book => {
  const li = document.createElement("li");
  li.textContent = book.title;
  li.addEventListener("click", () => showBook(book));
  bookList.append(li);
}

const showBook = book => {
  const showPanel = document.querySelector("#show-panel")
  clearElement(showPanel);
  showPanel.append(
    createBookThumbnail(book.img_url),
    createBookHeading(book.title),
    createBookLikesWidget(book)
  );
};

const clearElement = element => {
  while (element.hasChildNodes()) {
    element.lastChild.remove();
  }
}

const createBookThumbnail = imgURL => {
  const thumbnail = document.createElement("img");
  thumbnail.src = imgURL;
  return thumbnail;
}

const createBookHeading = bookTitle => {
  const h2 = document.createElement("h2");
  h2.textContent = bookTitle;
  return h2;
}

const createBookLikesWidget = book => {
  const likeContainer = document.createElement("div");
  likeContainer.append(createLikersList(book.users));
  likeContainer.append(createLikeButton(book));
  return likeContainer;
}

const createLikersList = bookUsers => {
  const likesList = document.createElement("ul");
  bookUsers.forEach((bookUser) => {
    likesList.append(createLiker(bookUser, likesList));
  });
  return likesList;
}

const createLiker = (bookUser) => {
  const li = document.createElement("li");
  li.textContent = bookUser.username;
  return li;
}

const createLikeButton = book => {
  const button = document.createElement("button");
  if (currentUserHasLikedBook(book)) {
    button.textContent = "Unlike book";
  } else {
    button.textContent = "Like book";
  }
  button.addEventListener("click", (event) => toggleBookLike(event, book));
  return button;
}

const toggleBookLike = (event, book) => {
  const updatedUsers = createUpdatedBookUsers(book);
  adapter.patchBook(book.id, updatedUsers)
    .then(book => rerenderLikesWidget(event.target.parentNode, book))
    .catch(console.error);
}

const createUpdatedBookUsers = book => {
  if (currentUserHasLikedBook(book)) {
    return book.users.filter(user => {
      return user.id !== currentUser.id
    });
  } else {
    return [...book.users, currentUser];
  }
}

const currentUserHasLikedBook = book => {
  return book.users.some(user => user.id === currentUser.id);
}

const rerenderLikesWidget = (likesWidget, updatedBook) => {
  likesWidget.parentNode.replaceChild(
    createBookLikesWidget(updatedBook),
    likesWidget
  );
}
