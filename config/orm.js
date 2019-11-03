// Import MySQL connection.
var connection = require("../config/connection.js");

// Create orm object
var orm = {

    // Function to select and display all of the items in the table
    selectAll: function(tableName, cb) {
        var queryTerms = "SELECT * FROM " + tableName + ";";

        // Query the database, error handling and display result
        connection.query(queryTerms, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    
    // Function to add (insert) one new record into the table
    insertOne: function(tableName, column, insertValue, cb) {
        var queryTerms = "INSERT INTO " + tableName + " (" + column + ") " +  "VALUES (?);";

        // Query the database, error handling and display result
        connection.query(queryTerms, [insertValue], function(err, result) {
            if (err) throw err;
            cb(result);
        })
    },
    
    // Function to update just one record in the table...in this case we will change the status of "devoured" from false to true
    updateOne: function(tableName, column, updateValue, id, cb) {
        var queryTerms = "UPDATE " + tableName + " ";
        queryTerms += "SET " + column + " = ? ";
        queryTerms += "WHERE id = ?;"; 

        // Query the database, error handling and display result
        connection.query(queryTerms, [updateValue, id], function(err, result) {
            if (err) throw err;
            cb(result);
        })
    }

}; // End of orm object creation

// Export the orm object for the model (burger.js).
module.exports = orm;