/******************* API *******************/
CONFIG = {
    BASE_URL: "http://localhost:3000",
    BOOKS_URL: "http://localhost:3000/books",
    USERS_URL: "http://localhost:3000/users",
};

function getBooks(){
    return fetch(CONFIG.BOOKS_URL).then(responce => responce.json())
}

function fetchConfig(id,bodyData){
    return fetch(`${CONFIG.BOOKS_URL}/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(bodyData)
    }).then(resp => resp.json());
}

/******************* domController *******************/

const divList = document.querySelector('#show-panel');
const ulList = document.querySelector('#list');
const divShow = document.querySelector('#show-panel');
const btn = document.createElement('button')
    btn.innerText = "Read Book"

document.addEventListener("DOMContentLoaded", function() {
    renderBooks()
});


function addBookElement(book){
    const li = document.createElement('li')
    li.innerHTML = `${book.title}`
    li.dataset.id = book.id
    ulList.append(li)
    li.addEventListener('click', e=>{
        bookInfo(book)
    })
    
    
}
function bookUsers(book){
    const listUser = document.querySelector('#list-user')
    let li;
    listUser.innerHTML = "";
    book.users.forEach(user =>{
        li = document.createElement('li')
        li.innerText = user.username
        listUser.append(li);
    })
}
function bookInfo(book){
    divShow.innerHTML = ""
    

        const span = document.createElement('span')
        span.innerHTML = `
        <h2>${book.title}</h2>
        <img src= "${book.img_url}">
        <p>${book.description}<p>
        <ul id="list-user> </ul>
        `
        const ulList = document.createElement("ul")
        ulList.id = "list-user";
        divShow.append(span, btn, ulList);

        // users liked this book
        btn.addEventListener('click', (e, id) =>{
            ulList.innerHTML = ""
            updateBookLike(book, book.id)
        })
        bookUsers(book)
}
function updateBookLike(book, id){
    newUser ={"id": 1, "username": "Abdullah"}
    
    book.users.push(newUser)
    fetchConfig(id, book)
    .then(bookInfo(book))
}
function addAllBooksElements(arrayOfBooks){
    arrayOfBooks.forEach(book => addBookElement(book))
}
function renderBooks(){
    getBooks().then(book => addAllBooksElements(book))
}