// SETUP VARIABLES
// ==========================================================

// This variable will be pre-programmed with our authentication key
// (the one we received when we registered)
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
function runQuery(numArticles, queryURL) {

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

        // Loop through and provide the correct number of articles
        for (var i = 0; i < numArticles; i++) {

            // Add to the Article Counter (to make sure we show the right number)
            articleCounter++;

            // Create the HTML well (section) and add the article content for each
            var wellSection = $("<div>");
            wellSection.addClass("well");
            wellSection.attr("id", "article-well-" + articleCounter);
            $("#well-section").append(wellSection);

            // Confirm that the specific JSON for the article isn't missing any details
            // If the article has a headline include the headline in the HTML
            if (newsData.articles[i].title !== "null") {
                $("#article-well-" + articleCounter)
                    .append(
                    "<h3 class='articleHeadline'><span class='label label-primary'>" +
                    articleCounter + "</span><strong> " +
                    newsData.articles[i].title + "</strong></h3>"
                    );

                // Log the first article's headline to console
                console.log(newsData.articles[i].title);
            }

            // If the article has a byline include the headline in the HTML
            if (newsData.articles[i].author && newsData.articles[i].author) {
                $("#article-well-" + articleCounter)
                    .append("<h5>" + newsData.articles[i].author + "</h5>");

                // Log the first article's Author to console.
                console.log(newsData.articles[i].author);
            }

            // Then display the remaining fields in the HTML (Section Name, Date, URL)
            $("#article-well-" + articleCounter)
                .append("<h5>Section: " + newsData.articles[i].source.name + "</h5>");
            $("#article-well-" + articleCounter)
                .append("<h5>" + newsData.articles[i].publishedAt + "</h5>");

            $("#article-well-" + articleCounter)
                .append("<h5>" + newsData.articles[i].description + "</h5>");
           
            var newsImage = $("<img>").attr("src", newsData.articles[i].urlToImage)
           
            $("#article-well-" + articleCounter)
                .append(newsImage);

           


            $("#article-well-" + articleCounter)
                .append( "<a href='" + newsData.articles[i].url + "'>" +
                newsData.articles[i].url + "</a>");

            // Log the remaining fields to console as well
            console.log(newsData.articles[i].publishedAt);
            console.log(newsData.articles[i].source.name);
            console.log(newsData.articles[i].url);


            
                var one = $("<div>").addClass("col s12 m4").attr("id", "columnOne")
                var two = $("<img>").attr("src", "assets/images/fox_logo.png")
                var three = '<div class="card">'
                    + '<div class="card-image">'
                    + '<img src=' + newsData.articles[i].urlToImage + '>'
                    + '<span class="card-title">' + ewsData.articles[i].source.name + '</span>'
                    + '<a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">arrow_forward</i></a>'
                    + '</div>'
                    + '<div class="card-content">'
                    + '<p>' + newsData.articles[i].description + '</p>'
                    + '</div>'
                    + '</div>'
                $("#newsRow").append(one);
                one.append(two, three);
            }
    });

}

// METHODS
// ==========================================================

// on.("click") function associated with the Search Button
$("#run-search").on("click", function (event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks).
    event.preventDefault();

    // Initially sets the articleCounter to 0
    articleCounter = 0;

    // Empties the region associated with the articles
    $("#well-section").empty();

    // Grabbing text the user typed into the search input
    searchTerm = $("#search-term").val().trim();
    var searchURL = queryURLBase + searchTerm;

    // Number of results the user would like displayed
    numResults = $("#num-records-select").val();

    // Start Year
    startYear = $("#start-year").val().trim();

    // End Year
    endYear = $("#end-year").val().trim();

    searchURL = searchURL + "&sources=" + "cnn";

    // If the user provides a startYear -- the startYear will be included in the queryURL
    if (parseInt(startYear)) {
        searchURL = searchURL + "&from=" + startYear + "0101";
    }

    // If the user provides a startYear -- the endYear will be included in the queryURL
    if (parseInt(endYear)) {
        searchURL = searchURL + "&to=" + endYear + "0101";
    }

    console.log("search URL test: " + searchURL);


    // Then we will pass the final searchURL and the number of results to
    // include to the runQuery function
    runQuery(numResults, searchURL);
});

// This button clears the top articles section
$("#clear-all").on("click", function () {
    articleCounter = 0;
    $("#well-section").empty();
});
