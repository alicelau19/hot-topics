let articleSelector = document.querySelector(".articles");
let portfolioSelector = document.querySelector(".portfolio");
let DATABASE_URL = "database/database.json";

function loadArticles() {
  fetch(DATABASE_URL,{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.statusText === "OK") {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((data) => {
      const articles = data.articles;
      const length = articles.length;
      portfolioSelector.innerHTML = "";
      for (let i = 0; i < length; i++) {
        let article = `
        <div class="article">
            <h2> ${articles[i].name}</h2>
            <div class="flex-article">
              <div class="image-box">
                  <img class="images" src="${articles[i].image}" alt="${articles[i].tagline}"/>
                  <p class="image-tagline">${articles[i].tagline}</p>
              </div>
              <p class="article-text">${articles[i].text}</p>
            </div>
        </div>
        `;
        articleSelector.innerHTML = articleSelector.innerHTML + article;
      }
    })
    .catch((err) => {
      console.log("Error ", err);
    });
}

function loadPortfolio() {
  fetch(DATABASE_URL)
    .then((response) => {
      if (response.statusText === "OK") {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((data) => {
      const portfolio = data.portfolio;
      const length = portfolio.length;
      articleSelector.innerHTML = "";
      for (let i = 0; i < length; i++) {
        let singlePortfolio = `
        <div class="portfolio-card">
        <img class="portfolio-img"src="${portfolio[i].image}" alt="${portfolio[i].tagline}"/>
        <p class="portfolio-title">${portfolio[i].name}</p>
        </div>
        
        `;
        portfolioSelector.innerHTML =
          portfolioSelector.innerHTML + singlePortfolio;
      }
    })
    .catch((err) => {
      console.log("Error", err);
    });
}

//removing active attribute on nav-bar
let navItems = document.querySelectorAll("header div div a");

function handleButton(ev) {
  ev.preventDefault();
  let activeItem = ev.target;

  for (let item of navItems) {
    if (item.id) {
      item.removeAttribute("id");
    }
  }

  activeItem.id = "active";
}

for (let item of navItems) {
  item.addEventListener("click", handleButton);
}

// loading initial content (on the page load)
window.onload = loadArticles();
