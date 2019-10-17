document.addEventListener("DOMContentLoaded", () => renderBooks());

// DOM CONSTANTS

const listPanel = document.querySelector('#list-panel')
const list = document.querySelector('#list')
const showPanel = document.querySelector('#show-panel')
const likeAreaDiv = document.createElement('div')
    likeAreaDiv.id = "like-area"


// FUNCTIONALITY

function renderBooks(){
    API.get.then(books => {
        books.forEach(book => {
            renderBook(book)
        })
    })
}

function renderBook(book){
    li = document.createElement('h4')
    li.id = book.id
    li.innerText = book.title
    li.addEventListener('click', () => displayDetails(book))
    
    list.append(li)
}

function displayDetails(book){
    showPanel.innerText = ""
    likeAreaDiv.innerText = ""
    
    renderElement("h2", showPanel, book.title)

    image = document.createElement('img')
    image.src = book.img_url
    image.height = 300
    showPanel.append(image)
    
    renderElement('p', showPanel, book.description)

    showPanel.append(likeAreaDiv)

    renderUsers(book.users)

    likeButton = document.createElement('button')
    likeButton.innerText = 'LIKE'
    likeButton.addEventListener('click', () => likeFunction(book))
    
    showPanel.append(likeButton)
}

function renderUsers(users){
    users.forEach(user =>{
        u = document.createElement('li')
        u.innerText = user.username
        u.id = user.username
        likeAreaDiv.append(u)
    })
    
}

function likeFunction(book){
    if(document.querySelector('#pouros')==null){
//backend
    dataObj = {
        users: [...book.users, {
            id: 1,
            username: "pouros"
        }]
    }
    API.patch(book, dataObj)

//frontend
    li = document.createElement('li')
    li.innerText = "pouros"
    li.id = "pouros"
    likeAreaDiv.append(li)
    }
    else{
        alert('alreade liked')
        deleteLike(book)
    }
}

function deleteLike(){
    //backend
    

    //frontend
}







// HELPER METHODS

function renderElement(ele, parent, content){
    element = document.createElement(ele)
    element.innerText = content

    parent.append(element)
}