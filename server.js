var express = require("express");
var mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const ArticaleRoutes = require('./routes/ArticleRoutes');
const routes = require("./routes/ArticleRoutes");


// Initialize Express
var app = express();

// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

// Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./server/models");


// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/stancilLaw", { useNewUrlParser: true });

// Routes
// Define API routes here
// Send every other request to the React app
// Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/public/index.html"));
// });

// Add routes, both API and view
app.use(routes);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/unity";

mongoose.connect(MONGODB_URI);


// A GET route for scraping the  website
app.get("/scrape", function (req, res) {
  console.log("entering get scrape");
  var articleArr = [];
  //Scrape cybercoders for Jobs
  axios.get("https://www.hg.org/law-articles-by-practice/estate-and-trust")
    .then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      // Now, we grab every h3 within an article tag, and do the following:
      $("div.article").each(function (i, element) {

        // Save an empty result object
        var result = {};

        // Add fields to result object
        result.title = $(this)
          .find("li")
          .text()
          .trim();

        result.link = $(this)
          .find("a")
          .attr("href");

        result.summary = $(this)
          .find("p")
          .text()
          .trim();
        // console.log("the result in scrape")
        // console.log(result);
        articleArr.push(result);
      });

      // add each scrape to document in the collection
      db.Article.create(articleArr)
        .then(function (dbArticle) {
          // View the added result in the console
          // Send JSon of client side
          console.log("you are using the result being sent to client side")
          console.log("87 " + dbArticle);
          res.json(dbArticle);
          // })

        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          console.log("this is the error logic" + err);



        });

    });
})









app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});


// app.get("/", function (req, res) {
//   res.render("index");
// });

