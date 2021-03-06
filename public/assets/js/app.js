// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function () {

    // Goes to scrape articles when button is clicked 
    $("#scrape").on("click", function(event) {

        // Send the GET request.
        $.get("/api/scrape/", {
            }).then(
            function() {
                console.log("Scrape complete");
                location.reload();
            }
        );
    });

    // Saves an article when button is clicked
    $(".save").on("click", function(event) {
        // Send the PUT request.
        var id = $(this).attr("data-id");
        console.log(id);

        var savingArticle = {
            isSaved: true
          };

        $.ajax("/api/save-article/" + id, {
            type: "PUT",
            data: savingArticle
            }).then(
            function() {
                console.log("Article has been saved.");
                // Reload the page to remove the newly saved article from the listings
                location.reload();
            }
        );
    });

    // Opens the "notes" modal when clicked from the saved articles page
    $(".notes").on("click", function(event) {
        var id = $(this).attr("data-id");
        console.log(id);
        $("#view-notes").modal();
    
        // Adds a new note when clicked
        $("#new-note").on("click", function(event) {
            event.preventDefault();

            if (!$("#article-note").val()) { // Front-end validation...
                alert("Please enter a new note.")
            } else { // If text is present...
            
                // This will put the new note retrieved from the form into an object
                var newNote = {
                    body: $("#article-note").val().trim()
                }
                console.log(newNote);

                $.ajax("/api/new-note/" + id, {
                    type: "POST",
                    data: newNote
                    }).then(
                    function() {
                        console.log("New note has been added.");
                        // Reload the page to remove the newly saved article from the listings
                        location.reload();
                    }
                );

            } // End else statement
        });
    });

    // Removes an article from saved when button is clicked
    $(".unsave").on("click", function(event) {
        // Send the PUT request.
        var id = $(this).attr("data-id");
        console.log(id);

        var unsaveArticle = {
            isSaved: false
            };

        $.ajax("/api/unsave-article/" + id, {
            type: "PUT",
            data: unsaveArticle
            }).then(
            function() {
                console.log("Article has been removed from saved articles.");
                // Reload the page to remove the newly saved article from the listings
                location.reload();
            }
        );
    });
    

    // Deletes all articles when button is clicked
    $("#clear").on("click", function(event) {

        // Send the DELETE request.
        $.ajax({
            type: "DELETE",
            url: "/api/delete/",
            }).then(
            function() {
                console.log("Clear articles: complete");
                location.reload();
            }
        );
    });

});