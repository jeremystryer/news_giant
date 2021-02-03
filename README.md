<a href="https://jeremystryer.github.io/news_giant/" target="_blank">Click Here To Check Out News Giant</a>

![Screenshot of News Giant](/images/news-giant-screenshot.png?raw=true "News Giant")

<a href="https://jeremystryer.github.io/news_giant/" target="_blank">News Giant</a> is a searched-based news aggregator that sources articles from left, center, and right media outlets. The application leverages the [Newscatcher API](https://rapidapi.com/newscatcher-api-newscatcher-api-default/api/newscatcher?endpoint=apiendpoint_8218240c-8c08-420b-8cfe-36a56759f524). 

As an educator who has tutored middle school, high school, and college students in essay and research writing, I have at times had students investigate current events as part of an assignment. My students have consistently had doubts about where to start looking for information and some students commented to me that the type of information that they found varied a lot depending on the news website. I would often suggest to them the names of a few different websites and tell them to start by Googling the topic, but I thought that a search tool that could collect a few articles from different media outlets on any given topic would be handy.

My goal in creating News Giant was to provide such a tool. While News Giant is extremely limited in scope (only one article per media outlet), it provides a starting point for seeing what different news websites are saying about a particular topic.

Since the application uses Newscatcher's free version, API requests are limited to 21 per hour. Initially, I had wanted to include more than a dozen media sources on the website, but to the best of my knowledge Newscatcher's API does not allow for a request to specify more than one specific news source. Therefore, each requested article requires a separate API request. As a result, I have limited News Giant to only six media outlets and even still there can only be three searches per hour. A paid version of Newscatcher's API would allow for a significantly higher number of searches, but paying for the API is just out of the scope of this project for me. If I find a free API alternative that fits the site's needs better, I will change to it.

I built News Giant from scratch using pure HTML, CSS, and vanilla JavaScript. The website is fully responsive (CSS Grid and a couple of brief media queries).

If you have any ideas for how to improve this application, know of another news API, or would like to continue developing this web app, please let me know. Feel free to fork the code and keep on developing as well.
