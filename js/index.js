document.addEventListener("DOMContentLoaded", () => {

    const bookList = document.getElementById('list')
    const showPanel = document.getElementById('show-panel')
    const ROOTPATH = 'http://localhost:3000'
    const BOOKPATH = `${ROOTPATH}/books`

    function getBooks() {
        return fetch(BOOKPATH)
        .then(resp => resp.json())
        .then(json => renderBooks(json))
    }

    function renderBooks(json) {
        json.forEach(book => createBookListItem(book))
    }

    function createBookListItem(book) {
        const li = document.createElement('li')
        li.innerText = book.title
        bookList.append(li)
        li.addEventListener('click', () => {
            showBook(book)
        })
    }

    function removeChildren(panel) {
        while (panel.hasChildNodes()) {
            panel.removeChild(panel.firstChild);
        }
    }

    function showBook(book) {
            removeChildren(showPanel)
            const img = document.createElement('img')
            img.src = book.img_url
            
            const h3 = document.createElement('h3')
            h3.innerText = book.title

            const p = document.createElement('p')
            p.innerText = book.description

            const ul = document.createElement('ul')
            book.users.forEach(user => {
                const li = document.createElement('li')
                li.innerText =user.username
                ul.append(li)
            })
            
            const button = document.createElement('button')
            button.innerText = 'Read'
            button.addEventListener('click', () => {
                markAsRead(book)
            })
            
            showPanel.append(img, h3, p, ul, button)
    }

    function markAsRead(book) {        
        if (book.users.some(user => user.id === 1)) {
            for( let i = 0; i < book.users.length; i++){ 
                if ( book.users[i].id === 1) {
                  book.users.splice(i, 1);
                }
             }
            addUserToBook(book)

        } else {
            book.users.push({"id": 1, "username": "pouros"})
            addUserToBook(book)
        }
    }

    function addUserToBook(book) {
        object = {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
    } 
        return fetch(`${BOOKPATH}/${book.id}`, object)
        .then(showBook(book))
    }
    getBooks()
    


})
