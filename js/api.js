const BOOKS_URL = "http://localhost:3000/books";

const getBooks = function(){
    return fetch(BOOKS_URL).
    then(resp => resp.json())
};

const patchBook = function(book){
    return fetch(`${BOOKS_URL}/${book.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(book)
    })
};

const API = {getBooks, patchBook};