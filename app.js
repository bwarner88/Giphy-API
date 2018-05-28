

var topics = [];


var displayGif = function(){
$("button").on("click", function () {
    var btnTopics = $(this).data("search");


    var url = "https://api.giphy.com/v1/gifs/search?q=" +
        btnTopics + "&api_key=dc6zaTOxFJmzC&limit=10";


    $.ajax({
        url: url,
        method: "GET"
    })
        .then(function (response) {
            console.log(url);
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
});
}

$('#submitBtn').on('click', function (e) {
    e.preventDefault();
    var newBtn = $('#newTopic').val().trim();
    topics.push(newBtn);
    $('#newTopic').val(' ')
    createNewBtn();
});

var createNewBtn = function () {
    for (var i = 0; i < topics.length; i++) {
        var btn = $('<button>');
        btn.attr('class', 'gifs')
        btn.attr('data-search', topics[i]);
        btn.text(topics[i]);
        $('#buttonDiv').append(btn)
    }
}
$(document).on('click', '.gifs', displayGif);

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
$(document).on('click', '.topicsGiphy', playGifs);

displayGif();






