const BASE_URL = "/http://localhost:3000"
const BOOKS_URL = "/books"


// GET REQUEST FOR ALL BOOKS
const getBooks = () => {
    return fetch("http://localhost:3000/books")
        .then(response => response.json())
}

//PATCH REQUEST
const configObject = (book, method) => {
    return {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    }
}

// PATCH REQUEST

const patchBooks = (book) => {
    return fetch(`http://localhost:3000/books/${book.id}`, configObject(book, "PATCH"))
        .then(response => response.json())
}

//API
const api = { getBooks, patchBooks }
