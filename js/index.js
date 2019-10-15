document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById('list');
    const showPanel = document.getElementById('show-panel');
    const booksUrl = 'http://localhost:3000/books';
    
    displayTitles();

    
    function displayTitles(){
        getBooks()
            .then(json => {listBookTitles(json)})
    }

    function listBookTitles(array){
        return array.forEach(book => addBookTitleToList(book));
    }

    function getBooks(){
        return fetch(booksUrl)
            .then(resp => resp.json())
    }

    function addBookTitleToList(book){
        const bookItem = document.createElement('li');
        list.appendChild(bookItem);

        bookItem.innerText = book.title;
        bookItem.addEventListener('click', () => showBook(book));
    }

    function showBook(book){
        resetShow();
        const title = document.createElement('h2');
        const thumbnail = document.createElement('img');
        const description = document.createElement('p');
        const likeButton = document.createElement('button');
        
        showPanel.append(title, thumbnail, description, likeButton);

        title.innerText = book.title;
        thumbnail.src = book.img_url;
        description.innerText = book.description;
        likeButton.innerText = 'Read';
        likeButton.addEventListener('click', (e) => readBook(e, book));

        addUserList(book);
    }

    function readBook(e, book){
        const readList = e.currentTarget.nextElementSibling;
        const currentUser = {"id": 1, "username": "pouros"};
        patchBook(book, currentUser)
            .then(json => {
                addAllUsers(json.users, readList)
            })
    }

    function resetShow(){
        while (showPanel.hasChildNodes()){
            showPanel.removeChild(showPanel.firstElementChild);
        }
    }

    function resetUsers(list){
        while (list.hasChildNodes()){
            list.removeChild(list.firstChild);
        }
    }

    function addUserList(book){
        const userList = document.createElement('ul');
        showPanel.appendChild(userList);
        
        checkForUsers(book);

        addAllUsers(book.users, userList);
    }

    function addAllUsers(array, list){
        resetUsers(list);
        array.forEach(user => {
            addUserToList(user, list);
        })
    }

    function addUserToList(user, userList){
        let userItem = document.createElement('li');
        userList.appendChild(userItem);
        userItem.innerText = user.username;
    }

    function checkForUsers(book){
        if (book.users.length == 0){
            const noUsers = document.createElement('p');
            userList.appendChild(noUsers);
            noUsers.innerText = 'No users have read this book yet.';
        }
    }

    function patchBook(book, user){
        book.users = checkIfRead(book, user);
        const bookUrl = booksUrl + '/' + book.id
        return fetch(bookUrl, configObj(book))
            .then(resp => resp.json())
    }

    function configObj(book){
        return {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                users: book.users
                })
        }
    }

    function checkIfRead(book, currentUser){
        if(book.users.some(user => user.id == currentUser.id)){
            return book.users.filter(user => user.id != currentUser.id)
        } else{
            book.users.push(currentUser);
            return book.users;
        }
    }
});
