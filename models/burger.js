// Dependencies
var orm = require("../config/orm.js");

// Creation of "burger" object with orm functions
var burger = {

    // Selects all of the records in the table for display
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },

    // Adds one new record to the table
    insertOne: function(burgerName, cb) {
        orm.insertOne("burgers", "burger_name", burgerName, function(res) {
            cb(res);
        })
    },

    // Updates the "devoured" status of the burger to true
    updateOne: function(updateValue, id, cb) {
        orm.updateOne("burgers", "devoured", updateValue, id, function(res) {
            cb(res);
        });
    }
};
  
// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;
  