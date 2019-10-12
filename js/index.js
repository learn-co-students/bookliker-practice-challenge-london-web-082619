const dom = {
  listPanel: document.querySelector("#list-panel"),
  showPanel: document.querySelector("#show-panel")
}

const currentUser = { id: 1, username: "pouros" }
const baseUrl = "http://localhost:3000/books"

document.addEventListener("DOMContentLoaded", function() {
  getAllBooks().then(renderBookList)
});

function getAllBooks() {
  return fetch(baseUrl)
    .then(response => response.json());
}

function renderBookList(booksJson) {
  booksJson.forEach(book => {
    dom.listPanel.append(createBookLi(book));
  });
}

function createBookLi(book) {
  const li = document.createElement("li");
  li.dataset.bookId = book.id;
  li.textContent = book.title;
  li.addEventListener("click", renderBookDetails);
  return li;
}

function renderBookDetails(event) {
  const bookId = event.target.dataset.bookId;
  getBook(bookId).then(bookJson => {
    const bookDetailsCard = createBookDetailsCard(bookJson);
    renderBookDetailsCard(bookDetailsCard);
  });
}

function getBook(bookId) {
  return fetch(`${baseUrl}/${bookId}`)
    .then(response => response.json());
}

function createBookDetailsCard(bookJson) {
  const card = document.createElement("div")
  card.dataset.bookId = bookJson.id;
  card.append(createBookHeading(bookJson.title));
  card.append(createBookThumbnail(bookJson.img_url));
  card.append(createBookDescription(bookJson.description));
  card.append(createBookLikesList(bookJson.users));
  card.append(createBookLikeButton(bookJson.title, bookJson.users));
  return card;
}

function createBookHeading(title) {
  const heading = document.createElement("h2");
  heading.textContent = title;
  return heading;
}

function createBookThumbnail(imgUrl) {
  const img = document.createElement("img");
  img.src = imgUrl;
  return img;
}

function createBookDescription(description) {
  const p = document.createElement("p");
  p.textContent = description;
  return p;
}

function createBookLikesList(users) {
  const ul = document.createElement("ul");
  ul.id = "likes-list";

  users.forEach(user => {
    const li = document.createElement("li");
    li.dataset.userId = user.id;
    li.textContent = user.username;
    ul.append(li);
  });
  return ul;
}

function createBookLikeButton(title, users) {
  const button = document.createElement("button");
  const userIds = users.map(user => user.id);
  if (userIds.includes(currentUser.id)) {
    button.textContent = `Unlike ${title}`;
  } else {
    button.textContent = `Like ${title}`;
  }
  button.addEventListener("click", toggleLike);
  return button;
}

function toggleLike(event) {
  const bookId = event.target.parentElement.dataset.bookId;
  const bookUsers = getUsersFromCard();
  let updatedBookUsers;
  if (currentUserHasLiked()) {
    updatedBookUsers = bookUsers.filter(user => {
      if (user.id !== currentUser.id) {
        return user;
      }
    });
  } else {
    updatedBookUsers = [...bookUsers, currentUser];
  }
  const requestConfig = buildPatchRequestConfig(updatedBookUsers);
  updateBook(bookId, requestConfig).then(renderLikes);
}

function currentUserHasLiked() {
  const likesList = getCurrentLikesList();
  const users = likesList.children;
  return [...users].some(listItem => {
    return listItem.dataset.userId === "1";
  });
}

function getUsersFromCard() {
  const users = []
  const likeList = getCurrentLikesList();
  [...likeList.children].forEach(listItem => {
    users.push({
      id: parseInt(listItem.dataset.userId),
      username: listItem.textContent
    });
  });
  return users;
}

function buildPatchRequestConfig(bookUsers) {
  const usersBody = { users: bookUsers };
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(usersBody)
  }
}

function updateBook(bookId, requestConfig) {
  return fetch(`${baseUrl}/${bookId}`, requestConfig)
    .then(response => response.json());
}

function renderLikes(bookJson) {
  const currentLikeList = getCurrentLikesList();
  const newLikeList = createBookLikesList(bookJson.users);
  currentLikeList.parentNode.replaceChild(newLikeList, currentLikeList);
  toggleLikeButtonText();
}

function getCurrentLikesList() {
  return document.querySelector("#likes-list")
}

function toggleLikeButtonText() {
  const button = document.querySelector("button");
  if (button.textContent.includes("Like")) {
    button.textContent = button.textContent.replace("Like", "Unlike");
  } else {
    button.textContent = button.textContent.replace("Unlike", "Like");
  }
}

function renderBookDetailsCard(bookDetailsCard) {
  clearShowPanel();
  dom.showPanel.appendChild(bookDetailsCard);
}

function clearShowPanel() {
  while (dom.showPanel.hasChildNodes()) {
    dom.showPanel.lastChild.remove();
  }
}