// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var cheerio = require("cheerio");
var axios = require("axios");
const mongoose = require('mongoose');

var PORT = process.env.PORT || 8020;

// Configure Express
var app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
// var routes = require("./routes/apiRoutes.js");
// Routes
// =============================================================
require("./routes/apiRoutes.js")(app);
// require("./routes/post-api-routes.js")(app);

// app.use(routes);


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
