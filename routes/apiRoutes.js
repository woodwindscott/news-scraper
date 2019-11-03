// Dependencies
var cheerio = require("cheerio");
var axios = require("axios");
const mongoose = require('mongoose');

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true });

var db = require("../models");

// Routes
module.exports = function(app) {

    // A GET route for scraping the New York Times website
    app.get("/api/scrape", function(req, res) {

        // Make a request via axios to grab the HTML body from New York Times
        axios.get("https://www.nytimes.com").then(function(response) {

        // Load the HTML into cheerio and save it to a variable
        var $ = cheerio.load(response.data);

        // Targeting each <article> with the class: "css-8atqhb"
        $("article.css-8atqhb").each(function(i, element) {

            // Save an empty result object
            var result = {};

            // Add the headline, summary and link of each article, and save them as properties of the result object
            result.headline = $(this)
                .find("h2")
                .text();
            result.summary = $(this)
                .find("p")
                .text();
            result.link = "https://nytimes.com" + 
                $(this)
                .find("a")
                .attr("href");

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function(dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
                })
                .catch(function(err) {
                // If an error occurred, log it
                console.log(err);
                });
            });

        // Send a message to the client
        res.send("Scrape Complete");
        });
    });

    app.get("/", function(req, res) {
        // Grab every document in the Articles collection
        db.Article.find({})
        .then(function(dbArticle) {
            res.render("index", {articles: dbArticle});
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
    });

    app.get("/saved", function(req, res) {
        // Grab every saved document in the Articles collection
        db.Article.find({ isSaved: true })
        .populate("notes")
        .then(function(dbArticle) {
            console.log(dbArticle);
            res.render("saved_articles", {articles: dbArticle});
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
    });

    // Add a new note to Notes Collection

    app.post("/api/new-note/:id", function(req, res) {
        db.Note.create(req.body)
            .then(function(dbNote) {
                console.log(dbNote);
                return db.Article.findOneAndUpdate({_id: req.params.id}, { $push: { notes: dbNote._id } }, { new: true });
            })
            .then(function(dbArticle) {
                console.log(dbArticle);
                res.json(dbArticle);
            }).catch(function(err) {
                res.json(err);
            })
    });
    // Change "isSaved" to true
    app.put("/api/save-article/:id", function(req, res) {

        db.Article.updateOne(
            { _id: req.params.id },

            { $set: { isSaved: true } },
            function(error, edited) {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                else {
                    console.log(edited);
                    res.send(edited);
                }
            }
        );
    });
        
    // Change "isSaved" to false
    app.put("/api/unsave-article/:id", function(req, res) {

        db.Article.updateOne(
            { _id: req.params.id },

            { $set: { isSaved: false } },
            function(error, edited) {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                else {
                    console.log(edited);
                    res.send(edited);
                }
            }
        );
    });

    // When "Clear Articles" button is selected, it will delete the entire Articles and Notes collections
    app.delete("/api/delete", function(req, res) {
        // Delete the entire Articles collection
        db.Article.remove({}, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Articles Collection deleted");
                // Delete the entire Notes collection
                return db.Note.remove({}, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Notes Collection deleted");
                    }
                });
            }
        });
        res.end();
    });

};