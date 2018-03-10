$(document).ready(function(){

var articleCount = 3;

// NEW YORK TIMES ===========================================================================================    

// New York Times Authorization Key
var authKeyNYT = "8b2443cf7edc4be4b55a691a14699bd0";

// URL Base for New York Times
var queryURLBaseNYT = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKeyNYT + "&q=";

    console.log("this is url: " + queryURLBaseNYT);

    // New York Times API Call
    function runNYT(queryTest) {

        // AJAX Function
        $.ajax({
        url: queryTest,
        method: "GET"
        }).then(function(NYTData) {

          for (var i = 1; i <= articleCount; i++){
            console.log("this is nydata", NYTData);

            var multimedia = NYTData.response.docs[i].multimedia[i];

            if (multimedia && multimedia.url) {
                var nytImage = "https://www.nytimes.com/" + NYTData.response.docs[i].multimedia[i].url;
            } else {
                var nytImage = "assets/images/noImage.jpg";
            };

            var nytDescription = NYTData.response.docs[i].snippet;

            var nytTitle = NYTData.response.docs[i].headline.main;

            var nytURL = NYTData.response.docs[i].web_url;

            var nytLogo = "nyt_logo.png";
            

            // Run in the makeCard function, the following inputs set above
            makeCard(nytTitle, nytDescription, nytImage, nytURL, nytLogo);
        };

        });

    };

// CNN ===========================================================================================    

// News API key that works with CNN and Fox
var authKey = "7227db0863104fd7b602754dfdc975ef";

// queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
var queryURLBase = "https://newsapi.org/v2/everything?apiKey=" +
    authKey + "&q=";
console.log(queryURLBase);

// FUNCTIONS
// ==========================================================
// This runQuery function expects two parameters:
// (the number of articles to show and the final URL to download data from)


//RUNNIG CNN
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

            for (var i = 1; i <= articleCount; i++){
            var cnnImage = newsData.articles[i].urlToImage;

            var cnnTitle = newsData.articles[i].title;

            var cnnDescription = newsData.articles[i].description;

            var cnnURL = newsData.articles[i].url;

            var cnnLogo = newsData.articles[i].source.id + ".png";
            console.log("Logo TEST: " + cnnLogo);

            // Run in the makeCard function, the following inputs set above
            makeCard(cnnTitle, cnnDescription, cnnImage, cnnURL, cnnLogo);
            }
        
    });
}

// FOX ===========================================================================================

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
  
        for (var i = 1; i <= articleCount; i++){
        var foxImage = newsData.articles[i].urlToImage;
        var foxTitle = newsData.articles[i].title;
        var foxDescription = newsData.articles[i].description;
        var foxURL = newsData.articles[i].url;
        var foxLogo = "fox_logo.png";
        
        console.log("this is fox " + foxImage);

        // Delete the // before the URL if it has it and add "https://"
        foxImage = foxImage.replace(/^\/\//,'https://');
        
        // Run in the makeCard function, the following inputs set above
        makeCard(foxTitle, foxDescription, foxImage, foxURL, foxLogo);
        };
    });
  
  }
  
  // Create the cards with each news source for the user to see
  function makeCard (title, description, img, link, logo) {
    
    if (!img){
        img = "assets/images/noImage.jpg";
    };
    
    var one = $("<div>").addClass("col s12 m4").attr("id","columnOne")
    var two = $("<img>").attr("src", "assets/images/" + logo);
    let thumbnail = $("<img>").attr("src", img);
    var three = $('<div class="card">'
                    +'<div class="card-image crop-height">'
                    +'</div>'
                    +'<div>'
                        +'<span class="card-title">' + title + '</span>'
                        +'<a href= "' + link + '" target="_blank" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">arrow_forward</i></a>'
                    +'</div>'
                    +'<div class="card-content">'
                        +'<p>' + description + '</p>'
                    +'</div>'
                +'</div>')

    // Respond to errors when no image is present by displaying a placeholder image            
    $(thumbnail).on('error', function(err){
        this.onerror = null;
        $(this).attr('src', 'assets/images/noImage.jpg');
    });

    // Append the proper information to the card
    three.children('.card-image').prepend(thumbnail);
    one.append(two, three);
    $("#newsRow").prepend(one);
    }

// Activate the search term to populate the API function search terms when clicked on
$("#searchButton").on("click", function (event) {

    event.preventDefault();
 
    searchTerm = $("#first_name").val().trim();
    var searchURL = queryURLBase + searchTerm;

    var newsSource = $('input[name=newsGroup]:checked').val();
    console.log("this is the news source 1test: "+ newsSource);
    

    
    var queryTest = queryURLBaseNYT + searchTerm;
 
    searchURLF = searchURL + "&sources=" + "fox-news";
    searchURLC = searchURL + "&sources=" + newsSource;
 
    console.log("search URL test: " + searchURL);
 
    // Call the APIs to run again passing through the proper search terms
    runFox(searchURLF);
    runQuery(searchURLC);
    runNYT(queryTest);
    
 });

    var config = {
        apiKey: "AIzaSyAEfh4yrqhOl7kZMICEKGS2rh1yllroSPw",
        authDomain: "project1-3912c.firebaseapp.com",
         databaseURL: "https://project1-3912c.firebaseio.com",
         projectId: "project1 - 3912c",
         storageBucket: "",
         messagingSenderId: "406225880569"
    };

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for search Button
$("#searchButton").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var search = $("#first_name").val().trim();

    var search = {
        search: search,
    };

    database.ref().push(search);

    $("#first_name").val("");

});

});



