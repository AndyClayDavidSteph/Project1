function setupAPI() {

    function makeACardNYT(value) {
        var one = $("<div>").addClass("col s12 m4").attr("id","columnOne")
        var two = $("<img>").attr("src", "assets/images/nyt_logo.png")
        var three = '<div class="card">'
                    +'<div class="card-image">'
                    +'<img src=' + value + '>'
                    +'<span class="card-title">' + value + '</span>'
                    +'<a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">arrow_forward</i></a>'
                    +'</div>'
                    +'<div class="card-content">'
                    +'<p>' + nytDescription + '</p>'
                    +'</div>'
                    +'</div>'
        $("#newsRow").append(one);
        one.append(two, three);
    }

    var publicFunctions = {
        makeACardNYT: makeACardNYT
    }
    
    return publicFunctions;
}



var makeACard = setupAPI();

makeACard.makeACardNYT());



// function makeACardFox() {
// 	var one = $("<div>").addClass("col s12 m4").attr("id","columnOne")
// 	var two = $("<img>").attr("src", "assets/images/fox_logo.png")
// 	var three = '<div class="card">'
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
// 	var one = $("<div>").addClass("col s12 m4").attr("id","columnOne")
// 	var two = $("<img>").attr("src", "assets/images/cnn_logo.png")
// 	var three = '<div class="card">'
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





//  $("#searchButton").on("click", makeACardFox);
//  $("#searchButton").on("click", makeACardCNN);
 

