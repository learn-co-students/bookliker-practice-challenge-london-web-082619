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

    //作った箱にデータを入れたものを一括りとしてここからappend
    div.append(h2,p,img,h3,detailButton);
    list.appendChild(div)
    return div;
};

window.addEventListener("DOMContentLoaded", (event) => {
    fetchGetBooks(); // to triger "get" json
});