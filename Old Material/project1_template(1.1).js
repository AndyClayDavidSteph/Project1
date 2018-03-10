var nytImage;

var nytDescription;

var nytTitle;

var webUrl;

// $(document).ready(function(){



    // function makeACardFox() {
    //     var one = $("<div>").addClass("col s12 m4").attr("id","columnOne")
    //     var two = $("<img>").attr("src", "assets/images/fox_logo.png")
    //     var three = '<div class="card">'
    //                 +'<div class="card-image">'
    //                 +'<img src=' + foxImage + '>'
    //                 +'<span class="card-title">' + foxTitle + '</span>'
    //                 +'<a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">arrow_forward</i></a>'
    //                 +'</div>'
    //                 +'<div class="card-content">'
    //                 +'<p>' + foxDescription + '</p>'
    //                 +'</div>'
    //                 +'</div>'
    //     $("#newsRow").append(one);
    //     one.append(two, three);
    // }
    
    // function makeACardCNN() {
    //     var one = $("<div>").addClass("col s12 m4").attr("id","columnOne")
    //     var two = $("<img>").attr("src", "assets/images/cnn_logo.png")
    //     var three = '<div class="card">'
    //                 +'<div class="card-image">'
    //                 +'<img src=' + cnnImage + '>'
    //                 +'<span class="card-title">' + cnnTitle + '</span>'
    //                 +'<a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">arrow_forward</i></a>'
    //                 +'</div>'
    //                 +'<div class="card-content">'
    //                 +'<p>' + cnnDescription + '</p>'
    //                 +'</div>'
    //                 +'</div>'
    //     $("#newsRow").append(one);
    //     one.append(two, three);
    // }
    
    function makeACardNYT() {
        var one = $("<div>").addClass("col s12 m4").attr("id","columnOne")
        var two = $("<img>").attr("src", "assets/images/nyt_logo.png")
        var three = '<div class="card">'
                    +'<div class="card-image">'
                    +'<img src=' + nytImage + '>'
                    +'<span class="card-title">' + nytTitle + '</span>'
                    +'<a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">arrow_forward</i></a>'
                    +'</div>'
                    +'<div class="card-content">'
                    +'<p>' + nytDescription + '</p>'
                    +'</div>'
                    +'</div>'
        $("#newsRow").append(one);
        one.append(two, three);
        console.log(NYTData);
    }
    
    
    
    
    //  $("#searchButton").on("click", makeACardFox);
    //  $("#searchButton").on("click", makeACardCNN);
     $("#searchButton").on("click", makeACardNYT);
    // });
    