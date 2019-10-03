console.log("hello");

function deleteErrors(){
  const errors = document.getElementById('errors_messages');
  const msg = document.getElementById('msg');
  if(errors){
    setTimeout(() => {
      errors.style.display = 'none';
    }, 3000);
  }
  if(msg){
    setTimeout(() => {
      msg.style.display = 'none';
    }, 3000);
  }
  
}

function addArticle(){
  const articles = document.getElementById('cardArticle');
  articles.addEventListener('click', (e)=>{
    if(e.target.classList.contains('fav')){
      e.preventDefault();
      const article = e.target.parentElement.parentElement.parentElement;
      readArticle(article);
    }
  })
}

function readArticle(article){
  let infoArticle = {
    title: article.querySelector('h3').textContent,
    description: article.querySelector('p').textContent,
    id: article.querySelector('.data-id').textContent
  };
  insertArticle(infoArticle);
}

function insertArticle(article){
  const listArticles = document.getElementById('list-articles');
  let row = document.createElement('tr');
  row.innerHTML = `
    <td> ${article.title} </td>
    <td> ${article.description} </td>
    <td>
      <a href="#" data-id="${article.id}" class="delete-article"> X </a>
    </td>
  `;
  listArticles.appendChild(row);
  storageLocalStorage(article);
}

function deleteArticle(){
  const listArticles = document.getElementById('list-articles');
  listArticles.addEventListener('click', (e)=>{
    if(e.target.classList.contains('delete-article')){
      e.preventDefault();
      e.target.parentElement.parentElement.remove();
      const article = e.target.parentElement.parentElement;
      const articleID = article.querySelector('a').getAttribute('data-id');
      deleteLocalStorage(articleID);
    }
  })
}

function cleanArticles(){
  const btnCleanArticles = document.getElementById('clean-articles');
  btnCleanArticles.addEventListener('click', (e)=>{
    const listArticles = document.querySelector('#list-articles tbody');
    while(listArticles.firstChild){
      listArticles.removeChild(listArticles.firstChild);
    }
    cleanLocalStorage();
    return false;
  })
}

function storageLocalStorage(article){
  let articles;
  articles = getArticlesLocalStorage();
  articles.push(article);
  localStorage.setItem("articles", JSON.stringify(articles));
}

function getArticlesLocalStorage(){
  let articles;
  if(localStorage.getItem('articles')=== null){
    articles = [];
  }else{
    articles = JSON.parse(localStorage.getItem('articles'))
  }
  return articles;
}

function loadLocalStorage(){
  let articles;
  articles = getArticlesLocalStorage();
  articles.forEach((article) => {
    const listArticles = document.getElementById('list-articles');
    let row = document.createElement('tr');
    row.innerHTML = `
      <td> ${article.title} </td>
      <td> ${article.description} </td>
      <td>
        <a href="#" id="${article.id}" class="delete-article"> X </a>
      </td>
    `;
    listArticles.appendChild(row);
  });
}

function deleteLocalStorage(articleID){
  let articles;
  articles = getArticlesLocalStorage();
  articles.forEach((article, index) =>{
    if(articleID === article.id){
      articles.splice(index, 1);
    }
  })
  localStorage.setItem("articles", JSON.stringify(articles));
}


function cleanLocalStorage(){
  localStorage.clear();
}



























// function addArticle(){
//   const cardArticle = document.getElementById('cardArticle');
//   cardArticle.addEventListener('click', (e)=>{
//     if(e.target.classList.contains('fav')){
//       e.preventDefault();
//       const article = e.target.parentElement.parentElement.parentElement;
//       readArticle(article);
//     }
//   });
// }

// function readArticle(article){
//   console.log(article);
//   const infoArticle = {
//     title: article.querySelector('h3').textContent,
//     description: article.querySelector('p').textContent,
//     id: article.querySelector('.data-id').textContent
//   };
//   insertArticle(infoArticle);
// }

// function insertArticle(article){
//   const listArticles = document.querySelector('#list-articles tbody');
//   const row = document.createElement('tr');
//   row.innerHTML = `
//     <td>${article.title}</td>
//     <td>${article.description}</td>
//     <td>
//       <a href="#" class="delete-article" data-id="${article.id}">X</a>
//     </td>
//   `;
//   listArticles.appendChild(row);
 
// }
