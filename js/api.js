const API_ENDPOINT = "http://localhost:3000";
const BOOKS_URL = `${API_ENDPOINT}/books`;
const USERS_URL = `${API_ENDPOINT}/users`;

const API = {
    getBooks,
    patchBook
}

function getBooks(){
    return fetch(BOOKS_URL).then(response => response.json());
}

function patchBook(book){

    let userData = {"users": [ ...book.users, CURRENT_USER]} ;

    let url = `${BOOKS_URL}/${book.id}`

    let configObject = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }, 
        body: JSON.stringify(userData)
    };
    return fetch(url, configObject).then(response => response.json());
}



