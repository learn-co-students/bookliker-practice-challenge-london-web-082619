class Book {

  constructor(bookRecord) {
    this.id = bookRecord.id;
    this.title = bookRecord.title;
    this.description = bookRecord.description;
    this.imgUrl = bookRecord.img_url;
    this.users = bookRecord.users;
    this.currentUser = { id: 1, username: "pouros" }
  }

  createLi() {
    const li = document.createElement("li");
    li.textContent = this.title;
    li.addEventListener("click", () => BookController.showBookDetails(this));
    return li;
  }

  createThumbnail() {
    const img = document.createElement("img");
    img.src = this.imgUrl;
    return img;
  }

  createHeading() {
    const heading = document.createElement("h2");
    heading.textContent = this.title;
    return heading;
  }

  createDescription() {
    const description = document.createElement("p");
    description.textContent = this.description;
    return description;
  }

  createLikesList() {
    const ul = document.createElement("ul");
    ul.id = "likes-list";
    this.users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = user.username;
      ul.append(li);
    });
    return ul;
  }

  createLikeButton() {
    const button = document.createElement("button");
    button.addEventListener("click", event => BookController.toggleLike(event, this));
    if (this.currentUserHasLikedBook()) {
      button.textContent = `Unlike ${this.title}`;
    } else {
      button.textContent = `Like ${this.title}`;
    }
    return button;
  }

  currentUserHasLikedBook() {
    return this.users.some(user =>
      user.id === this.currentUser.id
    );
  }

  removeCurrentUserFromUsers() {
    this.users = this.users.filter(user =>
      user.id !== this.currentUser.id
    );
  }

  addCurrentUserToUsers() {
    this.users.push(this.currentUser);
  }

}