
// API CONSTANTS

baseURL = "http://localhost:3000/books/"
headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
}

// API FUNCTIONS

function get() {
    return fetch(baseURL).then(resp => resp.json())
}


function patch(book, dataObj){
    return fetch(baseURL+`${book.id}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(dataObj)
    })
    .then(resp => resp.json())
}

function deleteBook(book){
    return fetch(baseURL+`${book.id}`, { method: "DELETE"})
}

API = {
    get: get(),
    patch: patch,
    deleteBook: deleteBook
}
