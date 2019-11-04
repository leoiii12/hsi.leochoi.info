var gameStatus = {
    score: 0,
    numberOfRemainingQuestions: 0
};

var promise1 = $.ajax({method: "GET", url: "json/labels.json", dataType: "json"});
var promise2 = $.ajax({method: "GET", url: "json/contents.json", dataType: "json"});

var labels = [];
var contents = [];

$.when(promise1, promise2).then(function (response1, response2) {
    labels = response1[0];
    contents = response2[0];

    // Control pages
    $("#page-loading").hide();
    $("#page-home").fadeIn("fast");

    resetGame();
});

function resetGame() {
    // Reset variables
    gameStatus.score = 0;
    gameStatus.numberOfRemainingQuestions = labels.length;

    // Clear elements
    $("#labels-container").empty();
    $("#select-areas-container").empty();
    $("#options-container").empty();

    // Solve cursor bugs
    $("body").css("cursor", "default");
}
