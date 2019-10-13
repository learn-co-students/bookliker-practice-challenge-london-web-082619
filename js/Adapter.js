class Adapter {

  static getBooks() {
    return fetch("http://localhost:3000/books")
      .then(response => response.json())
      .catch(console.log);
  }

  static updateBook(book) {
    const body = { users: book.users }
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    }
    return fetch(`http://localhost:3000/books/${book.id}`, config)
      .then(response => response.json())
      .catch(console.log);
  }

}