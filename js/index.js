const bookList = document.querySelector("#list")
const showPanel = document.querySelector("#show-panel")
const currentUser = { "id": 1, "username": "pouros" };

API.getBooks()
.then(books => renderBooks(books));

//iteration control
const renderBooks = function(books){
    console.log(books);
    for (const book of books){
        renderBook(book)
    }
};

const renderBook = function(book){
    const div = document.createElement("div")
    div.id = `book-${book.id}`
    const li = document.createElement("li")
    
    li.innerText = book.title
    li.addEventListener("click", function(e){
        showBook(book);
    })

    div.append(li)
    bookList.appendChild(div)
};

const showBook = function(book){
    while(showPanel.firstChild){
        showPanel.removeChild(showPanel.firstChild)
    };
    const div = document.createElement("div");
    div.id = `book-${book.id}`
    const h3 = document.createElement("h3");
    h3.innerText = book.title
    const p = document.createElement("p");
    p.innerText = book.description
    const img = document.createElement("img");
    img.src = book.img_url;
   
    const userUl = document.createElement("ul");
    userUl.id = "users-list"
    
    for (user of book.users){
        const userLi = document.createElement("li")
        userLi.innerText = user.username
        userLi.id = `user-${user.id}`
        userUl.appendChild(userLi) //iterationの時は中にappendChild
    };
    
    const btn = document.createElement("button");
    btn.innerText = "Read";
    btn.addEventListener("click", function(e){
        addUser(book)
    })

    div.append(h3,p,img,userUl,btn)
    showPanel.appendChild(div)
};

//optimistic
const addUser = function(book){
    //front-end
    const userLi = document.createElement("li")
    userLi.innerText = currentUser.username
    document.querySelector("#users-list").appendChild(userLi)
    //back-end
    book.users.push(currentUser);
    API.patchBook(book)
    console.log(book.users)
};