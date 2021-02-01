document.addEventListener("DOMContentLoaded", () => {
  class App {
    constructor() {
      this.gallery = new Gallery(); 
      this.init();
    }

    init() {
      this.gallery.init();
    }
  }

  class Utilities {
    static getTodayDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();

      return yyyy + '/' + mm + '/' + dd;
    }

    static getNewsName(url) {
      return url.split(".")[0];
    }

    static getCardBack(card) {
      return [...card.children].filter(child => child.classList.contains("card-back"))[0]
    }
  }
  class Gallery {
    init() {
      this.addEventListeners();
    }

    addEventListeners() {
      this.search();
      this.processTemplates();
    }

    processTemplates() {
      this.templates = {};

      document.querySelectorAll("script[type='text/x-handlebars']").forEach(tmpl => {
        this.templates[tmpl["id"]] = Handlebars.compile(tmpl["innerHTML"]);
      });
    }

    search() {
      let searchField = document.querySelector("#search-field");
      let date = Utilities.getTodayDate();

      searchField.addEventListener("change", event => {
        let query = event.target.value;
        API.getNews(query, date, this.populateCard.bind(this));
      });
    }

    matchCardToFetchedNewsSource(fetchedUrl) {
      const cards = document.querySelectorAll(".card");
      let fetchedNewsName = Utilities.getNewsName(fetchedUrl);
      return [...cards].filter(card => card.id === fetchedNewsName)[0];      
    }

    populateCard(article) {
      let card = this.matchCardToFetchedNewsSource(article.clean_url);
      let articleInfo = this.templates["article-info-placement"](article);
      let cardBack = Utilities.getCardBack(card);
      cardBack.insertAdjacentHTML("beforeend", articleInfo);
      
      card.classList.add("flip");
    }
  }

  class API {
    static getNews(query, date, populate) {
       fetch(`https://newscatcher.p.rapidapi.com/v1/search?q=${query}&topic=news&sources=foxnews.com&country=US&lang=en&from=${date}&page_size=1`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "4a434644b7mshf0c157810805032p180f52jsn6f7ab924b303",
        "x-rapidapi-host": "newscatcher.p.rapidapi.com"
      }
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        let article = data.articles[0];
        populate(article);
      })
      .catch(err => {
        console.error(err);
      });
    }
  }

  new App();
});