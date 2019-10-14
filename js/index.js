
const USER = {"id":1, "username":"pouros"};
document.addEventListener("DOMContentLoaded", function() {});
const bookList = document.querySelector("#list")
const bookShow = document.querySelector("#show-panel")

API.getBooks().then(books => renderBooks(books));//データの呼び出し、よって()コール。変換したものをiterationのメソッドにパス

const renderBooks = function(books){//iterationのコントロールのみ
  for (const book of books) {
    renderBook(book);
  }
};
const renderBook = function(book){
  //箱作とコンテンツ挿入
  const li = document.createElement("li");
  li.className = "book";
  li.id = book.id;
  const h2 = document.createElement("h2");
  h2.innerText = book.title;
  h2.addEventListener("click", function(event){
    showBook(book)
  });
  li.append(h2);
  bookList.appendChild(li);
  return li;
};

const showBook = function(book){
  const div = document.createElement("div");
  div.id = book.id
  const p = document.createElement("p");
  p.innerText = book.description;
　const img = document.createElement("img");
  img.src = book.img_url;
  const h3 = document.createElement("h3")
  h3.innerText = book.users.map(user => user.username).join(", ");
  const button = document.createElement("button");
  button.innerText = "Like";
  button.ButtonFunctionality(book, button);
  div.append(p,img,h3,button);
  while (bookShow.firstChild){
    bookShow.removeChild(bookShow.firstChild)
  };
    bookShow.appendChild(div)
};

// const likeBook = function(book, ){

// }

// // //ここから復習
// const detailButtonFunctionality(book, detailButton) {
//     debugger;
//     detailButton.addEventListener('click', e => {
//       toggleUser(book, USER)
//     })
//   }

//   function toggleUser(book, user) {
//     bookUser = book.users.findIndex(bookUser => bookUser.id === user.id)
  
//     if (bookUser === -1) {
//       book.users.push(user);
//     } else {
//       book.users.splice(bookUser, 1)
//     }
  
//     updateBook(book).then(book => {
//       displayBook(book);
//     })
//   }

//   function updateBook(book) {
//     return fetch(`http://localhost:3000/books/${book.id}`, {
//       method: 'PATCH', 
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify(book)
//     }).then(resp =>   resp.json());
//   }


