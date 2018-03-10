$(document).ready(function(){

    // var nytImage;

    // var nytDescription;

    // var nytTitle;

    // var webUrl;

var authKeyNYT = "8b2443cf7edc4be4b55a691a14699bd0";

// Search Parameters
var queryTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

// URL Base
var queryURLBaseNYT = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKeyNYT + "&q=";
console.log("this is url: " + queryURLBaseNYT);


$("#searchButton").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks).
    event.preventDefault();
  
    // Get Search Term
    queryTerm = $("#first_name").val().trim();
  
    console.log("this is queryTerm: "+queryTerm)

    var queryTest = queryURLBaseNYT + queryTerm;

    console.log("this is queryTest: " + queryTest);

    runNYT(queryTest);
  
  });

    function runNYT(queryTest) {

        // AJAX Function
        $.ajax({
        url: queryTest,
        method: "GET"
        }).then(function(NYTData) {

            console.log("this is nydata", NYTData);

            var nytImage;

            var multimedia = NYTData.response.docs[1].multimedia[1];

            if (multimedia){
                nytImage = "https://www.nytimes.com/" + NYTData.response.docs[1].multimedia[1].url;
            } else{
                nytImage = "assets/images/noImage.jpg";
            };

            // var nytImage = "https://www.nytimes.com/" + NYTData.response.docs[1].multimedia[1].url;

            // makeACard.makeACardNYT(NYTData)

            var nytDescription = NYTData.response.docs[1].snippet;

            var nytTitle = NYTData.response.docs[1].headline.main;

            var nytURL = NYTData.response.docs[1].web_url;


            var one = $("<div>").addClass("col s12 m4").attr("id","columnOne")
            var two = $("<img>").attr("src", "assets/images/nyt_logo.png")
            var three = '<div class="card">'
                        +'<div class="card-image">'
                        +'<img src=' + nytImage + '>'
                        +'<span class="card-title">' + nytTitle + '</span>'
                        +'<a href= "' + nytURL + '" target="_blank" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">arrow_forward</i></a>'
                        +'</div>'
                        +'<div class="card-content">'
                        +'<p>' + nytDescription + '</p>'
                        +'</div>'
                        +'</div>'
            $("#newsRow").append(one);
            one.append(two, three);
        });

    };

var authKey = "7227db0863104fd7b602754dfdc975ef";
// These variables will hold the results we get from the user's inputs via HTML
var searchTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;
// queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
// the user hits the search button
var queryURLBase = "https://newsapi.org/v2/everything?apiKey=" +
    authKey + "&q=";
console.log(queryURLBase);
// Counter to keep track of article numbers as they come in
var articleCounter = 0;
// FUNCTIONS
// ==========================================================
// This runQuery function expects two parameters:
// (the number of articles to show and the final URL to download data from)
function runQuery(queryURL) {
    // The AJAX function uses the queryURL and GETS the JSON data associated with it.
    // The data then gets stored in the variable called: "newsData"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (newsData) {
        // Logging the URL so we have access to it for troubleshooting
        console.log("------------------------------------");
        console.log("URL: " + queryURL);
        console.log("------------------------------------");
        // Log the newsData to console, where it will show up as an object
        console.log(newsData);
        console.log("------------------------------------");

            var cnnImage = newsData.articles[0].urlToImage;

            var cnnTitle = newsData.articles[0].title;

            var cnnDescription = newsData.articles[0].description;

            var cnnURL = newsData.articles[0].url;

            if (cnnImage){
                cnnImage = newsData.articles[0].urlToImage;
            } else{
                cnnImage = "assets/images/noImage.jpg";
            };

            var one = $("<div>").addClass("col s12 m4").attr("id","columnOne")
            var two = $("<img>").attr("src", "assets/images/cnn_logo.png")
            var three = '<div class="card">'
                        +'<div class="card-image">'
                        +'<img src=' + cnnImage + '>'
                        +'<span class="card-title">' + cnnTitle + '</span>'
                        +'<a href= "' + cnnURL + '" target="_blank" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">arrow_forward</i></a>'
                        +'</div>'
                        +'<div class="card-content">'
                        +'<p>' + cnnDescription + '</p>'
                        +'</div>'
                        +'</div>'
            $("#newsRow").append(one);
            one.append(two, three);
        
    });
}
// METHODS
// ==========================================================
// on.("click") function associated with the Search Button
$("#searchButton").on("click", function (event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks).
    event.preventDefault();
    // Initially sets the articleCounter to 0
    // articleCounter = 0;
    // Empties the region associated with the articles
    // $("#well-section").empty();
    // Grabbing text the user typed into the search input
    searchTerm = $("#first_name").val().trim();
    var searchURL = queryURLBase + searchTerm;

    searchURL = searchURL + "&sources=" + "cnn";
 
    console.log("search URL test: " + searchURL);
    // Then we will pass the final searchURL and the number of results to
    // include to the runQuery function
    runQuery(searchURL);
});
// This button clears the top articles section
$("#clear-all").on("click", function () {
    articleCounter = 0;
    $("#well-section").empty();
});

 
 function runFox (queryURL) {
 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (newsData) {
 
        console.log("------------------------------------");
        console.log("URL: " + queryURL);
        console.log("------------------------------------");
 
        console.log(newsData);
        console.log("------------------------------------");
 
        console.log(newsData.articles[0].publishedAt);
        console.log(newsData.articles[0].source.name);
        console.log(newsData.articles[0].url);
        console.log(newsData.articles[0].title);
 
 
        var foxImage = newsData.articles[0].urlToImage;

        var foxTitle = newsData.articles[0].title;

        var foxDescription = newsData.articles[0].description;

        var foxURL = newsData.articles[0].url;
        console.log("this is fox " + foxImage);

        foxImage = foxImage.replace(/^\/\//,'https://');

        console.log("this is fox " + foxImage);

        var one = $("<div>").addClass("col s12 m4").attr("id","columnOne")
        var two = $("<img>").attr("src", "assets/images/fox_logo.png")
        var three = '<div class="card">'
                    +'<div class="card-image">'
                    +'<img src=' + foxImage + '>'
                    +'<span class="card-title">' + foxTitle + '</span>'
                    +'<a href= "' + foxURL + '" target="_blank" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">arrow_forward</i></a>'
                    +'</div>'
                    +'<div class="card-content">'
                    +'<p>' + foxDescription + '</p>'
                    +'</div>'
                    +'</div>'
        $('img').error(function(){
            $(this).attr('src', 'assets/images/noImage.jpg');
        });
        $("#newsRow").append(one);
        one.append(two, three);
        
 
    });
 
 }

 $("#searchButton").on("click", function (event) {

    event.preventDefault();
 
    searchTerm = $("#first_name").val().trim();
    var searchURL = queryURLBase + searchTerm;
 
    searchURL = searchURL + "&sources=" + "fox-news";
 
    console.log("search URL test: " + searchURL);
 
    runFox(searchURL);
 });


});

