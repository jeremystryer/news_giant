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

    static identifyAllCards() {
      return document.querySelectorAll(".card");
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
        this.populateAllCards(query, date);
      });
    }

    matchCardToFetchedNewsSource(fetchedUrl) {
      const CARDS = Utilities.identifyAllCards();
      let fetchedNewsName = Utilities.getNewsName(fetchedUrl);
      return [...CARDS].filter(card => card.id === fetchedNewsName)[0];      
    }

    populateCard(article) {
      let card = this.matchCardToFetchedNewsSource(article.clean_url);
      const ARTICLE_INFO_FOR_CARD = 
        {
          "news-name": Utilities.getNewsName(article.clean_url), 
          title: article.title, 
          link: article.link, 
          clean_url: article.clean_url,
          summary: article.summary,
        }
            
      let articleInfo = this.templates["article-info-placement"](ARTICLE_INFO_FOR_CARD);
      let cardBack = Utilities.getCardBack(card);
      cardBack.innerHTML = articleInfo;
      card.classList.add("flip");
    }

    showNoContentMessage(fetchedUrl) {
      const CARDS = Utilities.identifyAllCards();
      let card = this.matchCardToFetchedNewsSource(fetchedUrl);
      let cardBack = Utilities.getCardBack(card);

      const ARTICLE_INFO_FOR_CARD = 
        { 
          "news-name": Utilities.getNewsName(fetchedUrl),
          message: "No Article Available Today On This Topic",
        }

      let articleInfo = this.templates["no-content-placement"](ARTICLE_INFO_FOR_CARD); 
      cardBack.innerHTML = articleInfo;
      card.classList.add("flip");
    }

    populateAllCards(query, date) {
      const CARDS = Utilities.identifyAllCards();
      const CARDS_TO_WEBSITES = {
        cnn: "cnn.com",
        nationalreview: "nationalreview.com",
        foxnews: "foxnews.com",
        federalist: "federalist.com",
        nypost: "nypost.com",
        newyorker: "newyorker.com",
        ap: "ap.com",
        wsj: "wsj.com",
        politico: "politico.com",
        bloomberg: "bloomberg.com",
        vox: "vox.com",
        newsweek: "newsweek.com",
      }

      for (let i = 0; i < CARDS.length; i += 1) {
        let card = CARDS[i].id;
        let website = CARDS_TO_WEBSITES[card];

        API.getNews(query, date, website, this.populateCard.bind(this), this.showNoContentMessage.bind(this));
      }
    }
  }

  class API {
    constructor() {
      this.tooManyRequests = false;
    }

    static getNews(query, date, website, populateCallback, showNoContentCallback) {
       fetch(`https://newscatcher.p.rapidapi.com/v1/search?q=${"query"}&sources=${website}&country=US&lang=en&from=${date}&page_size=1`, {
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
        if (this.tooManyRequests) {
          return;
        }

        if (data.message) {
          this.tooManyRequests = true;
          alert("As a free service, only a limited number of searches are available per hour. Please try again later.");
        } else if (data.status === "No matches for your search.") {
          this.tooManyRequests = false;
          showNoContentCallback(data.user_input.sources[0]);
        } else {
          this.tooManyRequests = false;
          let article = data.articles[0];
          populateCallback(article);
        }
      })
      .catch(err => {
        debugger;
      });
    }
  }

  new App();
});