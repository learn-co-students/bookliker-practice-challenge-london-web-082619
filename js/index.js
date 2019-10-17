const bookList = document.querySelector("#list");
const showPanel = document.querySelector("#show-panel");
const currentUser = { "id": 1, "username": "pouros" };

API.getBooks().then(books => renderBooks(books));

//iteration
// const renderBooks = function(books){
//   for (const book of books){   
//     renderBook(book);
//   }
// };
const renderBooks = function(books){
  books.forEach(book => {
    renderBook(book)
});
};

//list books
const renderBook = function(book){
  const li = document.createElement("li");
  const h3 = document.createElement("h3");
  h3.innerText = book.title;
  h3.addEventListener("click", function(e){
    showBook(book)
  })
  li.append(h3);
  bookList.appendChild(li);
};

const showBook = function(book){
  while(showPanel.firstChild){
    showPanel.removeChild(showPanel.firstChild)
  };
  const p = document.createElement("p");
  p.innerText = book.description
  const img = document.createElement("img");
  img.src = book.img_url;
  
      //list of users
      const userUl = document.createElement("ul");
      userUl.id = "users-list"
      //iteration 
      for (const user of book.users){
        const userLi = document.createElement("li");
        userLi.innerText = user.username
        userUl.appendChild(userLi)
      };
  
  const btn = document.createElement("button");
  btn.innerText = "Read"
  const form = document.createElement("form");
  form.className ="patch-form"
  form.innerHTML = `<input type="textarea" name="description" value="" placeholder="description" class="input-text"><input type="submit" name="submit" value="Amend" class="submit">`;
  form.addEventListener("submit", function(e){
    e.preventDefault()
    updateDesc(book, p, e)
  })
   
  showPanel.append(p,img,userUl,btn,form);

};
//Optimistic
const updateDesc = function(book, p, e){
  // p.innerText = e.target.elements.description.value;
  const descForm = document.querySelector('input[name="description"]');
  p.innerText = descForm.value;
  
  const newDesc = {
      // description: e.target.elements.description.value
      description: descForm.value
  };
  API.patchBook(book, newDesc)
};