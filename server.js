var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var articles = require("./routes/articleRoutes");
// var port = process.env.PORT || 3000;
var port = 3000;


// Requiring our Note and Article models
// might not need these here
// var Note = require("./models/Note.js");
// var Article = require("./models/Article.js");


// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

//routes
// var notes = require("./routes/noteRoutes")
app.use("/", articles);

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/mongooseScraper");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");

});


// Listen on port 3000
app.listen(port, function() {
  console.log("App running on port 3000!");


});
