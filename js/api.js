const END_POINT = "http://localhost:3000"
const BOOKS_URL = `${END_POINT}/books`

const getBooks = function(){
    return fetch(BOOKS_URL)
    .then(resp => resp.json())
};

const patchBook = function(book, newDesc){
    return fetch(`${BOOKS_URL}/${book.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newDesc)
    })
};

const API = {getBooks, patchBook};