// Dependencies
var express = require("express");

// Set up the router for later export
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Route to display all of the burgers on the home page
router.get("/", function(req, res) {
    // Use "selectAll" function in the orm
    burger.selectAll(function(data) {
        var hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    })
})

// Route to add a new burger to the database table
router.post("/api/burgers", function(req, res) {
    // Use the "insertOne" function in the orm
    burger.insertOne(req.body.burgerName, function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

// Route to update the "devoured" status of the burger
router.put("/api/burgers/:id", function(req, res) {
    // Set devoured to true
    var updateValue = true;
    // Use the "updateOne" function in the orm
    burger.updateOne(updateValue, req.params.id, function(result) {
        if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
        } else { // Otherwise, successful update
        res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;