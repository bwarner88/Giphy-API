$(document).ready(function () {

    var topics = ['hockey', 'hats', 'jiu-jitsu', 'movies', 'memes', 'alex jones', 'star wars'];

    //create buttons from array
    var createButtons = function () {
        $('#buttonDiv').empty();
        for (var i = 0; i < topics.length; i++) {
            var btn = $('<button>' + topics[i] + '</button>');
            $('#buttonDiv').data(topics[i]);
            btn.attr('id', 'topicBtn')
            btn.attr('data-search', topics[i]);
            btn.text(topics[i]);
            $('#buttonDiv').append(btn)

        }
    }

    //api call declaring data of gifs for stll and animate
    var getGiphy = function () {
        var btnTopics = $(this).attr("data-search");


        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            btnTopics + "&api_key=dc6zaTOxFJmzC&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(queryURL);
                console.log(response);
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var topicsDiv = $("<div class='gifs'>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var topicsImage = $("<img>");
                    var animatedGif = results[i].images.fixed_height.url;
                    var stillImg = results[i].images.fixed_height_still.url;

                    topicsImage.attr('src', stillImg);
                    topicsImage.addClass('topicsGiphy');
                    topicsImage.attr('data-state', 'still');
                    topicsImage.attr('data-still', stillImg);
                    topicsImage.attr('data-animate', animatedGif);
                    topicsDiv.append(p);
                    topicsDiv.append(topicsImage);
                    $("#gifsDiv").prepend(topicsDiv);
                }
            });
    }


    //if statement to animate gifs
    var playGifs = function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    //click statements for buttons and animate 
    $(document).on('click', '#topicBtn', getGiphy)
    $(document).on('click', '.topicsGiphy', playGifs);

    //adds new buttons to the page
    $('#submitBtn').on('click', function (e) {
        e.preventDefault();
        var newBtn = $('#newTopic').val().trim();
        topics.push(newBtn);
        $('#newTopic').val('')
        createButtons();

    });


    createButtons()

})










