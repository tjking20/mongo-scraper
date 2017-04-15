var express = require('express');
var router = express.Router();
var articleController = require('../controllers/articleController.js');
var Article = require("../models/articleModel.js");
var request = require("request");
var cheerio = require("cheerio");
// var Note = require("../models/Note.js");


/*
 * GET
 */
// router.get('/', articleController.list);
router.get('/', function(req, res){
	// articleController.list();
	//shows all articles in the db
	request("https://www.nytimes.com/", function (error, response, html){
		var $ = cheerio.load(html);
		$(".story-heading").each(function(i, element) {

	      // Save an empty result object
	      var result = {};

	      // Add the text and href of every link, and save them as properties of the result object
	      result.title = $(this).children("a").text();
	      result.link = $(this).children("a").attr("href");

	      // console.log("title" + result.title);//title is blank
	      // console.log("link" + result.link);//link is woring



	      

	      // Now, save that entry to the db
	      articleController.create(result);

	    });
	});
  // });
  // Tell the browser that we finished scraping the text
  res.send("Scrape Complete");


});

/*
 * GET
 */
// router.get('/', articleController.list);
router.get('/', function(req, res){
	// articleController.list();
	//shows all articles in th;e db


	
});

/*
 * GET
 */
router.get('/:id', articleController.show);

/*
 * POST
 */
router.post('/', articleController.create);

/*
 * PUT
 */
router.put('/:id', articleController.update);

/*
 * DELETE
 */
router.delete('/:id', articleController.remove);

module.exports = router;
