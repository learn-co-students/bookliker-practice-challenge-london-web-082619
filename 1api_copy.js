const API_ENDPOINT = "http://localhost:3000" //Newの時に使う
const BOOKS_URL = `${API_ENDPOINT}/books`

const getBooks = function(){//パラメーターいらない
    return fetch(BOOKS_URL).then(resp => resp.json());//requestして受けとりJsonに変換
};


// const postBook = function(newBook) {
//     return fetch(BOOKS_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(newBook)
//     }
// }


const patchBook = function(book){
    return fetch (`${BOOKS_URL}/${book.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(book)
    }).then(resp => resp.json());
};

const API = {getBooks, patchBook};