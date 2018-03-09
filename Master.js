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

    function runNYT(queryTest) {

        // AJAX Function
        $.ajax({
        url: queryTest,
        method: "GET"
        }).then(function(NYTData) {

            console.log("this is nydata", NYTData);

            var nytImage = "https://www.nytimes.com/" + NYTData.response.docs[1].multimedia[1].url;
    
            // var nytImage = "https://www.nytimes.com/" + NYTData.response.docs[1].multimedia[1].url;

            // makeACard.makeACardNYT(NYTData)

            var nytDescription = NYTData.response.docs[1].snippet;

            var nytTitle = NYTData.response.docs[1].headline.main;

            var nytURL = NYTData.response.docs[1].web_url;

            var nytLogo = "nyt_logo.png";

            makeCard(nytTitle, nytDescription, nytImage, nytURL, nytLogo);

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

            var cnnLogo = "cnn_logo.jpg";

            makeCard(cnnTitle, cnnDescription, cnnImage, cnnURL, cnnLogo);
        
    });
}


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
        var foxLogo = "fox_logo.png";
        console.log("this is fox " + foxImage);
        foxImage = foxImage.replace(/^\/\//,'https://');
  
        makeCard(foxTitle, foxDescription, foxImage, foxURL, foxLogo);
    });
  
  }
  
  
  function makeCard (title, description, img, link, logo) {
    console.log("image " + img);
    var one = $("<div>").addClass("col s12 m4").attr("id","columnOne")
    var two = $("<img>").attr("src", "assets/images/" + logo)
    var three = '<div class="card">'
                +'<div class="card-image">'
                +'<img src=' + img + '>'
                +'<span class="card-title">' + title + '</span>'
                +'<a href= "' + link + '" target="_blank" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">arrow_forward</i></a>'
                +'</div>'
                +'<div class="card-content">'
                +'<p>' + description + '</p>'
                +'</div>'
                +'</div>'
    $('img').error(function(){
        $(this).attr('src', 'assets/images/noImage.jpg');
    });
    $("#newsRow").append(one);
    one.append(two, three);
  }

$("#searchButton").on("click", function (event) {

    event.preventDefault();
 
    searchTerm = $("#first_name").val().trim();
    var searchURL = queryURLBase + searchTerm;
    
    var queryTest = queryURLBaseNYT + searchTerm;
 
    searchURLF = searchURL + "&sources=" + "fox-news";
    searchURLC = searchURL + "&sources=" + "cnn";
 
    console.log("search URL test: " + searchURL);
 
    runFox(searchURLF);
    runQuery(searchURLC);
    runNYT(queryTest);
 });

});