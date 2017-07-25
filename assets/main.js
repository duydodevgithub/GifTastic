// Arry of default animals
var defaultAnimals = ["dog", "cat", "bird", "elephant"];
function renderButtons() {
    $("#buttons-view").empty();
    // Looping through the array of defaultAnimals
    for (var i = 0; i < defaultAnimals.length; i++) {
        var a = $("<button>");
        a.addClass("animal");
        // Adding a data-attribute
        a.attr("data-name", defaultAnimals[i]);
        // Providing the initial button text
        a.text(defaultAnimals[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(a);
    }
}

$("#addAnimal").on("click", function(event) {
// Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#user-input").val().trim();
    defaultAnimals.push(animal);
    renderButtons();
});
renderButtons();

function displayPicture() {
        $("#displayResult").empty();
        // In this case, the "this" keyword refers to the button that was clicked
        var animal = $(this).attr("data-name");
        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Performing our AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
            })
            // After the data comes back from the API
            .done(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
                // Creating a div with the class "item"
                var gifDiv = $("<div class='gifDiv'>");
                // var rating = results[i].rating;
                //display rating
                // var rate = $("<p>");
                // rate.text("Rating: " + rating);
                // Creating an image tag
                var image = $("<img>");
                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                image.attr("src", results[i].images.downsized.url);
                image.attr("state","animate");
                image.attr("data-still",results[i].images.downsized_still.url);
                image.attr("data-animate",results[i].images.downsized.url);                
                gifDiv.append(image);

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                // $("#displayResult").prepend(rate);                
                $("#displayResult").prepend(gifDiv);
                // }
            }
            });
    }
function pausing () {
    $("img").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("state", "still");
      }
    });
}
$(document).on("click", "button", displayPicture);
$(document).on("click", "img", pausing );


