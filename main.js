import { users } from "./userMock.js";
import { posts } from "./postMock.js";

const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log('message');
    const user = users.find(
      (u) => u.email === email && u.password === password
      
    );
    if (user) {
      window.location.href = "posts.html";
    } else {
      alert("Пользователь не найден");
    }
  });
}

if (document.getElementById("postsContainer")) {
  setTimeout(() => {
    document.querySelector(".spinner-border").style.display = "none";

    const postsContainer = document.querySelector(".posts-container");
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "col-md-4 mb-4";
      postElement.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.content.substring(0, 40)}...</p>
            <a href="post.html?id=${
              post.id
            }" class="btn btn-primary">Подробнее</a>
          </div>
        </div>
      `;
      postsContainer.appendChild(postElement);
    });
  }, 2000);
}

if (document.getElementById("postTitle")) {
  setTimeout(() => {
    const postId = new URLSearchParams(window.location.search).get("id");
    const post = posts.find((p) => p.id == postId);

    document.querySelector(".spinner-border").style.display = "none";

    if (post) {
      document.getElementById("postTitle").textContent = post.title;
      document.getElementById("postContent").textContent = post.content;
      const author = users.find((u) => u.id === post.authorId);
      document.getElementById("postAuthor").textContent = author
        ? `${author.name} - ${post.date}`
        : "";
    } else {
      document.title = "Несуществующая статья";
      document.querySelector(".card-body").innerHTML =
        '<h5>404 - Статья не найдена</h5><a href="posts.html" class="btn btn-primary">Назад</a>';
    }
  }, 2000);
}
