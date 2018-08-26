var endGame = function () {
    // Control page
    $("#page-game").fadeOut("fast");
    $("#page-end").fadeIn("slow");

    // Show score
    $("#score").text("You scored " + gameStatus.score + " !");

    // Set up timer to return home page
    setTimeout(function () {
        $("#page-end").hide();
        $("#page-home").fadeIn("slow");

        resetGame();
    }, 5 * 1000);
};