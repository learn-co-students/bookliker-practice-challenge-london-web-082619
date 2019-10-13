class BookController {

  static init() {
    BookController.addAllBooksToList();
  }

  static addAllBooksToList() {
    const bookList = document.querySelector("#list-panel");
    Adapter.getBooks()
      .then(bookRecords => {
        bookRecords.forEach(bookRecord => {
          const book = new Book(bookRecord);
          bookList.append(book.createLi());
        });
      });
  }

  static showBookDetails(book) {
    const showPanel = document.querySelector("#show-panel");
    BookController.clearElement(showPanel);
    showPanel.append(
      book.createThumbnail(),
      book.createHeading(),
      book.createDescription(),
      book.createLikesList(),
      book.createLikeButton()
    )
  }

  static clearElement(element) {
    while (element.hasChildNodes()) {
      element.lastChild.remove();
    }
  }

  static toggleLike(event, book) {
    if (book.currentUserHasLikedBook()) {
      book.removeCurrentUserFromUsers();
    } else {
      book.addCurrentUserToUsers();
    }
    BookController.refreshLikesList(book);
    BookController.refreshLikeButton(event.target);
    Adapter.updateBook(book)
      .then(bookRecord => book.users = bookRecord.users)
      .catch(console.log);
  }

  static refreshLikesList(book) {
    const currentList = document.querySelector("#likes-list");
    const newList = book.createLikesList();
    currentList.parentNode.replaceChild(newList, currentList);
  }

  static refreshLikeButton(button) {
    if (button.textContent.includes("Like")) {
      button.textContent = button.textContent.replace("Like", "Unlike");
    } else {
      button.textContent = button.textContent.replace("Unlike", "Like");
    }
  }

}