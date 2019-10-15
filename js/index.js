document.addEventListener("DOMContentLoaded", function() {
    const BASE_URL = 'http://localhost:3000'
    const BOOKS_URL = `${BASE_URL}/books`

    const getBooks = () => {
        fetch(`${BOOKS_URL}`)
        .then(response => response.json())
        .then(arrayOfBookData => handleBookData(arrayOfBookData))
        .catch(console.log)
    }

    const addLikeToBook = (book, user) => {
        book.users.push(user)
        fetch(`${BOOKS_URL}/${book.id}`, {
            "method": "PATCH", 
            "headers": {
                "Content-Type": "application/json",
                "Accepted": "application/json"
            },
            "body": JSON.stringify(book)
        }).then(response => response.json())
          .then(bookData => addUserToBook(bookData))
    }

    const handleBookData = (arrayOfBookData) => {
        arrayOfBookData.forEach(book => {
            renderBook(book);
        })
    }

    const renderBook = (book) => {
        let listPanel = document.getElementById("list-panel")
        let listItem = document.createElement("li")
        let bookContainer = document.createElement("div")

        let title = createTitle(book);
        let description = createDescription(book);
        let image = createImage(book);
        let likes = createLikesDisplay()
        likes.setAttribute("id", `${book.id}`)
        let readButton = createReadButton(book)

        listPanel.appendChild(listItem)
        listItem.appendChild(bookContainer)
        bookContainer.appendChild(title)
        bookContainer.appendChild(description)
        bookContainer.appendChild(image)
        bookContainer.appendChild(likes)
        bookContainer.appendChild(readButton)
    }

    const createTitle = (book) => {
        let title = document.createElement("h2");
        title.innerText = book.title
        return title
    }

    const createDescription = (book) => {
        let description = document.createElement("p")
        description.innerText = book.description
        return description
    }

    const createImage = (book) => {
        let image = document.createElement("img")
        image.setAttribute("src", `${book.img_url}`)
        return image
    }

    const createLikesDisplay = () => {
        let likes = document.createElement('p');
        likes.innerText = 0;
        return likes
    }

    const createReadButton = (book) => {
        let likesButton = document.createElement('button')
        likesButton.innerText = "Like"
        likesButton.addEventListener("click", () => handleLikes(book))
        return likesButton
    }

    const handleLikes = (book) => {
        user = {"id": 100, "username": "Steve"}
        addLikeToBook(book, user)
        // if (userAlreadyLikesBook(book, user)) {
        //     return;
        // } else {
        //     addLikeToBook(book, user);
        // }
    }

    // const userAlreadyLikesBook = (book, user) => {
    //     debugger;
    //     if (typeof book == "object") {
    //         if (book.users.id == user.id) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     } else {
    //         book.users.forEach(bookUser => {
    //             if (bookUser.id == user.id) {
    //                 return true;
    //             } else {
    //                 return false;
    //             }
    //         })
    //     }
    // }

    // const addLikeToBook = (bookData) => {
    //     let likes = document.getElementById(bookData.id)
    //     likes.innerText = 
    // }


    getBooks();

});