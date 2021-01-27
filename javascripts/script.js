document.addEventListener("DOMContentLoaded", () => {
  let searchField = document.querySelector("#search-box");

  searchField.addEventListener("change", event => {
    let query = event.target.value;

    fetch(`https://newscatcher.p.rapidapi.com/v1/search?q=${query}&sources=cnn.com&page_size=1`, {
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
        console.log(data);
      })
      .catch(err => {
        console.error(err);
      });
  });



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

  // fetch("https://newscatcher.p.rapidapi.com/v1/search_free?q=Trump&lang=en&sort_by=date&sources=nytimes.com&page_size=1", {
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-key": "4a434644b7mshf0c157810805032p180f52jsn6f7ab924b303",
  //     "x-rapidapi-host": "newscatcher.p.rapidapi.com"
  //   }
  //   })
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });

  // fetch("https://newscatcher.p.rapidapi.com/v1/search_free?q=Trump&sort_by=date&sources=wsj.com&page_size=1", {
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-key": "4a434644b7mshf0c157810805032p180f52jsn6f7ab924b303",
  //     "x-rapidapi-host": "newscatcher.p.rapidapi.com"
  //   }
  //   })
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });

  // fetch("https://newscatcher.p.rapidapi.com/v1/search_free?q=Trump&sort_by=date&sources=foxnews.com&page_size=1", {
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-key": "4a434644b7mshf0c157810805032p180f52jsn6f7ab924b303",
  //     "x-rapidapi-host": "newscatcher.p.rapidapi.com"
  //   }
  //   })
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });

  // fetch("https://newscatcher.p.rapidapi.com/v1/search_free?q=Trump&sort_by=date&sources=nationalreview.com&page_size=1", {
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-key": "4a434644b7mshf0c157810805032p180f52jsn6f7ab924b303",
  //     "x-rapidapi-host": "newscatcher.p.rapidapi.com"
  //   }
  //   })
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });
});
