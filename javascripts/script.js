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
      return [...card.html.children].filter(child => child.classList.contains("card-back"))[0];
    }
  }

  class Card {
    constructor(htmlSection) {
      this.html = htmlSection;
    }

    processTemplates() {
      this.templates = {};

      document.querySelectorAll("script[type='text/x-handlebars']").forEach(tmpl => {
        this.templates[tmpl["id"]] = Handlebars.compile(tmpl["innerHTML"]);
      });
    }

    addSummaryLinkEventListener() {
      let readSummaryLink = this.html.querySelector(".read-summary-link-text");

      readSummaryLink.addEventListener("click", () => {
        this.processTemplates();
        this.showSummary();
      });
    }

    showSummary() {
      let modal = document.querySelector(".modal");
      let modalContent = document.querySelector(".modal-content");
      let article = { "news-name": this["news-name"], summary: this["summary"] };
      let articleInfo = this.templates["summary"](article);
      let closeBtn;
      
      if (summary.length === 0) {
        summary = "No Summary Is Available.";
      }

      modalContent.innerHTML = articleInfo;
      closeBtn = document.querySelector(".close-button");
      
      modal.classList.add("show-modal");
 
      document.addEventListener("click", event => {
        if (event.target === closeBtn || event.target === modal) {
          modal.classList.remove("show-modal");
        }
      });
    }
  }
  
  class Gallery {
    init() {
      this.cards = this.collectCards();
      this.addEventListeners();
    }

    addEventListeners() {
      this.search();
      this.processTemplates();
    }

    collectCards() {
      let cardSections = document.querySelectorAll(".card");
      return [...cardSections].map(cardSection => {
        return new Card(cardSection);
      });
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
      let fetchedNewsName = Utilities.getNewsName(fetchedUrl);
      return [...this.cards].filter(card => card.html.id === fetchedNewsName)[0];      
    }

    populateCard(article) {
      let card = this.matchCardToFetchedNewsSource(article.clean_url);
      
      card["news-name"] = Utilities.getNewsName(article.clean_url);
      card.title = article.title;
      card.link = article.link;
      card.clean_url = article.clean_url;
      card.summary = article.summary;

      let articleInfo = this.templates["article-info-placement"](card);
      let cardBack = Utilities.getCardBack(card);
      cardBack.innerHTML = articleInfo;

      card.html.classList.add("flip");
      // this.selectSummaryLink(card);
      card.addSummaryLinkEventListener();
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

      for (let i = 0; i < this.cards.length; i += 1) {
        let card = this.cards[i].html.id;
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
       fetch(`https://newscatcher.p.rapidapi.com/v1/search?q=${query}&sources=${website}&country=US&lang=en&from=${date}&page_size=1`, {
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
        console.log(err);
      });
    }
  }

  new App();
});