const userList = document.getElementById("user-list");
let reposList = document.getElementById("repos-list");

const form = document.querySelector("#github-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = e.target.search.value;
  fetch(`https://api.github.com/search/users?q=${username}`)
    .then((res) => res.json())
    .then((data) =>
      data.forEach((user) => {
        let h5 = document.createElement("h5");
        h5.textContent = `${user.login}`;
        let img = document.createElement("img");
        img.src = `${user.avatar}`;
        let link = document.createElement("a");
        link.href = `https://github.com/${username}`;

        
        h5.addEventListener("click", (e) => {
          let username = e.target.value; 
          fetch(`https://api.github.com/users/${username}/repos`)
            .then((res) => res.json())
            .then((repos) =>
              repos.forEach((repo) => {
                let repo = document.createElement("li");
                repo.textContent = `${repo.name}`;
              })
            );
          reposList.append(repo);
        });
        userList.appendChild(h5, img, link);
      })
    );
});
