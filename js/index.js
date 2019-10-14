
const USER = {"id":1, "username":"pouros"};
document.addEventListener("DOMContentLoaded", function() {});

function fetchGetBooks(){ //get Json data
    return fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(jsonBooks => displyJsonBooks(jsonBooks))
};

function displyJsonBooks(jsonBooks){ //control iteration
    for(book of jsonBooks){
        renderBooks(book);
    }
};

function renderBooks(book){
    const list = document.querySelector("#list-panel");//ターゲットの親ロケーション
    const div = document.createElement("div");//箱
    const h2 = document.createElement("h2");//箱
    const p = document.createElement("p");//箱
    const img = document.createElement("img");//箱
    const h3 = document.createElement("h3")
    const detailButton = document.createElement("button")

    //ここから実際にデータ挿入
    div.className = "book";//名前
    div.id = book.id;//id. 後々役立つからセットで必ず設定しとくべき
    h2.innerHTML = book.title
    p.innerHTML = book.description
    img.src = book.img_url
    h3.innerHTML = book.users.map(user => user.username).join(", ")
    detailButton.className = "detail-button"
    detailButton.innerHTML = "Read this book"
    detailButtonFunctionality(book, detailButton);
    //作った箱にデータを入れたものを一括りとしてここからappend
    div.append(h2,p,img,h3,detailButton);
    list.appendChild(div)
    return div;
};

//ここから復習
function detailButtonFunctionality(book, detailButton) {
    debugger;
    detailButton.addEventListener('click', e => {
      toggleUser(book, USER)
    })
  }

  function toggleUser(book, user) {
    bookUser = book.users.findIndex(bookUser => bookUser.id === user.id)
  
    if (bookUser === -1) {
      book.users.push(user);
    } else {
      book.users.splice(bookUser, 1)
    }
  
    updateBook(book).then(book => {
      displayBook(book);
    })
  }

  function updateBook(book) {
    return fetch(`http://localhost:3000/books/${book.id}`, {
      method: 'PATCH', 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(book)
    }).then(resp =>   resp.json());
  }

  function displayBook(book) {
    const div = document.querySelector('#show-panel')
    while (div.firstChild){
      div.removeChild(div.firstChild)
    }
  
    div.appendChild(renderBooks(book))
  }

window.addEventListener("DOMContentLoaded", (event) => {
    fetchGetBooks(); // to triger "get" json
});