
const currentUser = {"id":1, "username":"pouros"};
const bookList = document.querySelector("#list")
const bookShow = document.querySelector("#show-panel")
const amendBtn = document.querySelector("#test"); //テスト練習で追加

API.getBooks().then(books => renderBooks(books));//データの呼び出し、よって()コール。変換したものをiterationのメソッドにパス

const renderBooks = function(books){//iterationのコントロールのみ
  for (const book of books) {// オブジェクトがarrayの中
    renderBook(book);
  }
};
const renderBook = function(book){
  const li = document.createElement("li");//箱作とコンテンツ挿入
  li.className = "book";
  li.id = book.id;
  const h2 = document.createElement("h2");
  h2.innerText = book.title;
  h2.addEventListener("click", function(event){
    while (bookShow.firstChild){                //前にコールされて挿入されたものを消す。この場合はIterationの心配がないのでここ。githubを参照
      bookShow.removeChild(bookShow.firstChild)
    };
    showBook(book);
  });
  li.append(h2);
  bookList.appendChild(li);

};

//ここから復習//
const showBook = function(book){
  const div = document.createElement("div");
  div.id = book.id
  const h2 = document.createElement("h2");
  h2.innerText = book.title;
  const p = document.createElement("p");
  p.innerText = book.description;
　const img = document.createElement("img");
  img.src = book.img_url;

  const ul = document.createElement("ul")
  ul.id= "users-list"
    book.users.forEach(user => {
      const userLi = document.createElement("li");
      userLi.innerText = user.username;
      userLi.id = `user-${user.id}`;
      ul.append(userLi)
    });
  
  const readButton = document.createElement("button")
  readButton.addEventListener("click", function(event){
    handleUser(book);
  });
  
  if (alreadyRead(book)){
    readButton.innerText = "Unread me"
  } else {readButton.innerText = "Read me"
  };
  const 
  div.append(h2,p,img,ul,readButton);
  bookShow.appendChild(div)
};

const handleUser = function(book){
  if (!alreadyRead(book)){
    book.users.push(currentUser)
    API.patchBook(book)
    const userLi = document.createElement('li')
    const ul = document.querySelector("#users-list")
    userLi.innerText = currentUser.username
    userLi.id = `user-${currentUser.id}`
    ul.append(userLi)
    const readButton = document.querySelector('button')
    readButton.innerText = 'UnRead Me'
  } else {
    book.users = book.users.filter(user => user.id !== currentUser.id)
    API.patchBook(book)
    const foundLi = document.querySelector(`#user-${currentUser.id}`)
    foundLi.remove()
    const readButton = document.querySelector('button')
    readButton.innerText = 'Read Me'
  }
}

const alreadyRead = function(book){
  return book.users.find(usr => usr.id === currentUser.id) //true flase判定に使うのでプログラム内で保持しておく必要あり。よってReturn
};

//以下は勝手に追加。テスト練習

// amendBtm.addEventListener("click", function(event){
//     event.preventDefault();
//     amendDescription({
//       description: 
//     })
// });
// const amendDescrition