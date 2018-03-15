$(document).ready(function () {

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
        }).then(function (NYTData) {

            for (var i = 1; i <= articleCount; i++) {
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

    // This runQuery function expects two parameters:
    // (the number of articles to show and the final URL to download data from)

    // RUNNIG CNN
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

            for (var i = 1; i <= articleCount; i++) {
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

    function runFox(queryURL) {

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

            for (var i = 1; i <= articleCount; i++) {
                var foxImage = newsData.articles[i].urlToImage;
                var foxTitle = newsData.articles[i].title;
                var foxDescription = newsData.articles[i].description;
                var foxURL = newsData.articles[i].url;
                var foxLogo = "fox.png";

                console.log("this is fox " + foxImage);

                // Delete the // before the URL if it has it and add "https://"
                foxImage = foxImage.replace(/^\/\//, 'https://');

                // Run in the makeCard function, the following inputs set above
                makeCard(foxTitle, foxDescription, foxImage, foxURL, foxLogo);
            };
        });

    }

    // Create the cards with each news source for the user to see
    function makeCard(title, description, img, link, logo) {

        if (!img) {
            img = "assets/images/noImage.jpg";
        };

        var one = $("<div>").addClass("col s12 m4").attr("id", "columnOne")
        var two = $("<img>").attr("src", "assets/images/" + logo);
        let thumbnail = $("<img>").attr("src", img);
        var three = $('<div class="card">'
            + '<div class="card-image crop-height">'
            + '</div>'
            + '<div class="titleMargin">'
            + '<span class="card-title">' + title + '</span>'
            + '<a href= "' + link + '" target="_blank" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">arrow_forward</i></a>'
            + '</div>'
            + '<div class="card-content">'
            + '<p>' + description + '</p>'
            + '<button id="sentimentButton" data-name = "' + link +'"> Analyze Sentiment </button>'
            + '</div>'
            + '</div>')

        // Respond to errors when no image is present by displaying a placeholder image            
        $(thumbnail).on('error', function (err) {
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

        // Empty existing query to allow for a new one
        $("#newsRow").empty();

        // Prevent page from refreshing upon search button click
        event.preventDefault();

        // Grab the search term value
        searchTerm = $("#first_name").val().trim();
        var searchURL = queryURLBase + searchTerm;

        var newsSource = $('input[name=newsGroup]:checked').val();
        console.log("this is the news source 1test: " + newsSource);

        var queryTest = queryURLBaseNYT + searchTerm;


        // This is taking the checked boxes and giving them the correct value to run through the API. 
        // NYT still calls it's own API, the rest are funneled to the newsAPI 
        // I'm calling the function within the if/else statement instead of at the bottom

        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            if (val[i] == "nyt"){
                runNYT(queryTest);
            } else {
            searchURLC = searchURL + "&sources=" + val[i];
            runQuery(searchURLC);
            console.log("check box = " + val[i]);
            }
        });

        // searchURLF = searchURL + "&sources=" + "fox-news";
        // searchURLC = searchURL + "&sources=" + newsSource;

        console.log("search URL test: " + searchURL);

    });

    // Firebase =================================================================================================
    var config = {
        apiKey: "AIzaSyAEfh4yrqhOl7kZMICEKGS2rh1yllroSPw",
        authDomain: "project1-3912c.firebaseapp.com",
        databaseURL: "https://project1-3912c.firebaseio.com",
        projectId: "project1-3912c",
        storageBucket: "",
        messagingSenderId: "406225880569"
    };


    // Standard firebase configuration
    firebase.initializeApp(config);

    // Set database variable 
    var database = firebase.database();

    // On click button search function
    $("#searchButton").on("click", function (event) {
        // Prevent page from refreshing upon button click
        event.preventDefault();

        // Grabs user input
        var search = $("#first_name").val().trim();

        if (search === ""){
            return;
        }

        var search = {
            search: search,
        };

        // Push into the database what the search item was
        database.ref().push(search);

        // Clear the search value
        $("#first_name").val("");

    });

    // Pull back from the database the 10 last values stored
    // database.ref().limitToLast(10).on("child_added", function (childSnapshot) {
    //     console.log(childSnapshot.val());

    //     // Store everything into a variable.
    //     var search = childSnapshot.val().search;

    //     // Add each train's data into the table
    //     $("#dataDump").append("<button id='oldSearch'>" + search + "</button>");
    // });

    database.ref().on("value",function(snapshot){
        $("#dataDump").empty();
        var data = snapshot.val();
        // console.log(data);
        var searchTerms = {};
        
        // Search through the stored database search terms... if it exists, add +1 to it, otherwise, set it to 0
        for (var key in data) {
            var term = data[key].search.toLowerCase();
            if (searchTerms[term] || searchTerms[term] === 0){
                searchTerms[term] = searchTerms[term] + 1;
            } else {
                searchTerms[term] = 1;
            }
        };
        
        // Create an empty array
        var array = [];

        // Create an object for the searchTerm that involves the term and its counter
        for (var term in searchTerms) {
            let obj = {
                term: term,
                count : searchTerms[term]
            };
            array.push(obj);
        }

        // Actually sort through the array pushing the highest value in front
        array = array.sort(function(a, b) {
            if (a.count < b.count) return 1;
            if (a.count > b.count) return -1;   
        });

        console.log(array)

        // Return 10 values from the array
        var length;
        if (array.length > 10){
            length = 10;
        } else{
            length = array.length -1;
        };
        
        // Store 10 values or less from the array in the array[i].term and color code it accordingly
        for (var i =0; i <= length; i++){
            $("#dataDump").append("<a id='oldSearch'>" + array[i].term + " (" + array[i].count + ") |" + "</a>");
        };
    });

    // Run on click for firebase terms to then re-populate cards for the user to see
    $("#dataDump").on("click", "a", function (event) {

        // Empty the news div to clear for next query
        $("#newsRow").empty();

        // Prevent page from refreshing upon button click
        event.preventDefault();

        // searchTerm = $("#oldSearch").val().trim();
        var searchTerm = $(this).text();

        var searchURL = queryURLBase + searchTerm;

        var queryTest = queryURLBaseNYT + searchTerm;

        searchURLF = searchURL + "&sources=" + "fox-news";
        searchURLC = searchURL + "&sources=" + "cnn";

        console.log("search URL test: " + searchURL);

        // Call the APIs to run again passing through the proper search terms
        runFox(searchURLF);
        runQuery(searchURLC);
        runNYT(queryTest);
    });

    // grabbing the link, and running it through a couple API's to get the text and a "sentiment score"
    function scoreFunction() {
        
       var appendScoreHere = $(this);

       var loadingImage = $('<div><img src="assets/images/loading.gif"></div>')
       appendScoreHere.after(loadingImage)

       var urlToCheck =  $(this).attr("data-name");
       console.log("Score FUnction URL: " + urlToCheck);

        var authKey = "234735fed7408c1c6423de7e0364aa78";
        
        // queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
        var queryURLBase = "https://api.diffbot.com/v3/analyze?token=" + authKey + "&url=" + urlToCheck;

        console.log(queryURLBase);

        $.ajax({
            url: queryURLBase,
            method: "GET"

        }).then(function (articleData) {

            loadingImage.remove()
            // Logging the URL so we have access to it for troubleshooting

            console.log("this is the URL in the AJAX function: " + queryURLBase);

            console.log(articleData);

            console.log(articleData.objects[0].text);

            articleText = articleData.objects[0].text;

            getSentiment(articleText, appendScoreHere);

        });
    }

    // Sentiment and policital analysis pulled from an API
    function getSentiment(articleText, appendScoreHere) {
        $.post(
            'https://apiv2.indico.io/apis/multiapi?apis=political,emotion',
            JSON.stringify({
                'api_key': "99883d108820881bbdf367b594a55cf0",
                'data': articleText,
            })
        ).then(function (res) {

            res = JSON.parse(res);
            console.log(res);
            console.log(res.results.emotion.results.anger);
            console.log(res.results.emotion.results.joy);
            console.log(res.results.emotion.results.sadness);
            console.log(res.results.emotion.results.fear);
            console.log(res.results.emotion.results.surprise);

            var anger = res.results.emotion.results.anger;
            var joy = res.results.emotion.results.joy;
            var sadness = res.results.emotion.results.sadness;
            var fear = res.results.emotion.results.fear;
            var surprise = res.results.emotion.results.surprise;

            // Sentimental analysis
            if ( anger > joy && anger > sadness && anger > fear && anger > surprise) {
                anger = (anger * 100);
                anger = (anger.toFixed(2) + "%");
                anger = "Anger " + anger; 
                console.log("Anger is the greatest " + anger);
                appendScoreHere.after($("<h6>").html("Strongest Emotion: " + anger.bold()));
                
            } else if (joy > anger && joy > sadness && joy > fear && joy > surprise) {
                joy = (joy * 100);
                joy = (joy.toFixed(2) + "%")
                joy = "Joy " + joy;
                console.log("Joy is the greatest " + joy);
                appendScoreHere.after($("<h6>").html("Strongest Emotion: " + joy.bold()));
            } else if (sadness > anger && sadness > joy && sadness > fear && sadness > surprise) {
                sadness = (sadness * 100);
                sadness = (sadness.toFixed(2) + "%");
                sadness = "Sadness " + sadness;
                console.log("Sadness is the greatest " + sadness);
                appendScoreHere.after($("<h6>").html("Strongest Emotion: " + sadness.bold()));
            } else if (fear > anger && fear > joy && fear > sadness && fear > surprise) {
                fear = (fear * 100);
                fear = (fear.toFixed(2) + "%");
                fear = "Fear " + fear;
                console.log("sadness is the greatest " + fear);
                appendScoreHere.after($("<h6>").html("Strongest Emotion: " + fear.bold()));
            } else {
                surprise = (surprise * 100);
                surprise = (surprise.toFixed(2) + "%");
                surprise = "Surprise " + surprise;
                console.log("surpirse is the greatest: " + surprise);
                appendScoreHere.after($("<h6>").html("Strongest Emotion: " + surprise.bold()));
            }

            var libertarian =  res.results.political.results.Libertarian;
            var green = res.results.political.results.Green;
            var liberal =  res.results.political.results.Liberal;
            var conservative =  res.results.political.results.Conservative;
            
            // Political analysis 
            if (libertarian > green && libertarian > liberal && libertarian > conservative) {
                libertarian = (libertarian * 100);
                libertarian = (libertarian.toFixed(2) + "%");
                libertarian =  "Libertarian " + libertarian;
                console.log("libertarian is the greatest " + libertarian);
                appendScoreHere.after($("<h6>").html("Political Ideology: " + libertarian.bold()));
            } else if (green > libertarian && green > liberal && green > conservative) {
                green = (green * 100);
                green = (green.toFixed(2) + "%");
                green = "Green " + green;
                
                console.log("Anger is the greatest " + green);
                appendScoreHere.after($("<h6>").html("Political Ideology: " + green.bold()));
            } else if (liberal > libertarian && liberal > green && liberal > conservative) {
                liberal = (liberal * 100);
                liberal = (liberal.toFixed(2) + "%");
                liberal = "Liberal " + liberal;
                console.log("Liberal is the greatest " + liberal);
                appendScoreHere.after($("<h6>").html("Political Ideology: " + liberal.bold()));
            } else {
                conservative = (conservative * 100);
                conservative = (conservative.toFixed(2) + "%");
                conservative = "Conservative " + conservative; 
                console.log("conservative is the greatest: " + conservative);
                appendScoreHere.after($("<h6>").html("Political Ideology: " + conservative.bold()));
            }


            console.log(res.results.political.results.Libertarian);
            console.log(res.results.political.results.Green);
            console.log(res.results.political.results.Liberal);
            console.log(res.results.political.results.Conservative);

        });
    }

    $(document).on("click", "#sentimentButton", scoreFunction);

});

