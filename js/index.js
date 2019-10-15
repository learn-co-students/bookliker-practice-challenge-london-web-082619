
const CURRENT_USER = {"id": 1, "username": "pouros"};

document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to BookLiker!");
    API.getBooks().then(books => renderBooks(books))
});

function renderBooks(books){

    books.forEach(book => {
        renderBook(book)
    })
};

function renderBook(book){
    let bookList = document.getElementById('list')

    let bookLi = document.createElement('li')
    bookLi.innerText = book.title;
    bookLi.addEventListener('click', event => {
        event.preventDefault();
        showBook(book);
    })

    bookList.appendChild(bookLi)
};

function showBook(book){

    let showPanel = document.getElementById('show-panel');
    showPanel.innerText = "";

    let bookTitle = document.createElement('h2');
    bookTitle.innerText = book.title;
    let bookImage = document.createElement('img');
    bookImage.src = book.img_url;
    let bookDescription = document.createElement('p');
    bookDescription.innerText = book.description;
    
    let readList = document.createElement('ul');
    
    book.users.forEach(user => {
        let userLi = document.createElement('li');
        userLi.innerText = user.username;
        readList.appendChild(userLi)
    })

    let readBookButton = document.createElement('button');
    readBookButton.innerText = "Read Book";
    readBookButton.addEventListener('click', () => {
        markBookAsRead(book)
    })
    
    showPanel.append(bookTitle, bookImage, bookDescription, readList, readBookButton);
}

function markBookAsRead(book){

    let userHasAlreadyRead = false;

    for (let i = 0; i < book.users.length; i++){
        if (book.users[i].id == CURRENT_USER.id && book.users[i].username == CURRENT_USER.username){
            userHasAlreadyRead = true;
            break;
        }
    }

    if (userHasAlreadyRead == false){
        addUserToReadList(book);
    } else {
        alert("You have already read this book!");
    }
}

function addUserToReadList(book){
    API.patchBook(book).then(book => showBook(book))
}