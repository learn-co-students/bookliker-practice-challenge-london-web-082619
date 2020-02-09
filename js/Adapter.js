const booksURL = "http://localhost:3000/books"

const getBooks = () => {
  return fetch(booksURL)
    .then(objectify);
}

const patchBook = (bookId, updatedUsers) => {
  config = createPatchConfig(updatedUsers);
  return fetch(`${booksURL}/${bookId}`, config)
    .then(objectify);
}

const createPatchConfig = updatedUsers => {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ users: updatedUsers })
  }
}

const objectify = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("HTTP status code " + response.status);
  }
}

const adapter = {
  getBooks: getBooks,
  patchBook: patchBook
}