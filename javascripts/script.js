document.addEventListener("DOMContentLoaded", () => {
  class App {
    constructor() {
      // this.utilities = new Utilities();
      // this.api = new API();
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

    populateCard(article) {
      let flipCardBack = document.querySelector(".flip-card-back");
      let articleInfo = this.templates["article-info-placement"](article);
      // let articleTitle = document.querySelector(".article-title");
  
      flipCardBack.insertAdjacentHTML("beforeend", articleInfo);
    }
  }

  class API {
    static getNews(query, date, populate) {
       fetch(`https://newscatcher.p.rapidapi.com/v1/search?q=${query}&topic=news&sources=cnn.com&country=US&lang=en&from=${date}&page_size=1`, {
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

  

  // searchField.addEventListener("change", event => {
  //   let query = event.target.value;

  //   fetch(`https://newscatcher.p.rapidapi.com/v1/search?q=${query}&sources=cnn.com&lang=en`, {
  //     "method": "GET",
  //     "headers": {
  //       "x-rapidapi-key": "4a434644b7mshf0c157810805032p180f52jsn6f7ab924b303",
  //       "x-rapidapi-host": "newscatcher.p.rapidapi.com"
  //     }
  //     })
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log(data);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // });



  // fetch("https://newscatcher.p.rapidapi.com/v1/search?q=${query}&sort_by=date&sources=cnn.com&page_size=1", {
	// "method": "GET",
	// "headers": {
	// 	"x-rapidapi-key": "4a434644b7mshf0c157810805032p180f52jsn6f7ab924b303",
	// 	"x-rapidapi-host": "newscatcher.p.rapidapi.com"
	// }
  // })
  // .then(response => {
  //   return response.json();
  // })
  // .then(data => {
  //   console.log(data);
  // })
  // .catch(err => {
  //   console.error(err);
  // });

