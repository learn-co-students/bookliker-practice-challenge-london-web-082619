const postBooks = () => {
    api.getBooks().then(renderBooks)
}

//QUERY SELECTORS

const listUl = document.querySelector('#list')
const showPanel = document.querySelector('#show-panel')

const renderBooks = allBooks => {
    allBooks.forEach(book => {
        const bookLi = document.createElement("li")
        bookLi.innerText = book.title
        listUl.appendChild(bookLi)
        bookLi.addEventListener("click", () => createShowPanel(book))
    })
}

const createShowPanel = book => {
    showPanel.innerText = ""

    const bookTitle = document.createElement("h2")
    bookTitle.innerText = book.title

    const bookImg = document.createElement("img")
    bookImg.src = book.img_url

    const bookDesc = document.createElement("p")
    bookDesc.innerText = book.description

    const likeUl = document.createElement("ul")

    createLikeList(book, likeUl)

    const likeBtn = document.createElement("button")

    if (checkUser(book)) {
        likeBtn.innerText = "Dislike !"
        likeBtn.addEventListener("click", () => triggerBookDislike(book, likeBtn))
    } else {
        likeBtn.innerText = "Like !"
        likeBtn.addEventListener("click", () => triggerBookLike(book, likeBtn))
    }

    showPanel.append(bookTitle, bookImg, bookDesc, likeUl, likeBtn)
}

const triggerBookLike = (book, likeBtn) => {
    book.users.push({ "id": 1, "username": "pouros"})
    api.patchBooks(book).then(bookData => createShowPanel(bookData))
}

const triggerBookDislike = (book, likeBtn) => {
    book.users = book.users.filter(bookUser => bookUser.id !== 1)
    api.patchBooks(book).then(bookData => createShowPanel(bookData))
}

const createLikeList = (book, likeUl) => {
    for (const user of book.users) {
        const likeList = document.createElement("li")
        likeList.innerText = user.username
        likeList.id = `user-${user.id}`
        likeUl.appendChild(likeList)
    }
}

//HELPER

const checkUser = (book) => {

    let result =false
    for (const user of book.users) {
        if (user.id === 1 && user.username === "pouros") {
            result = true
        }
    }
    return result
}
postBooks()