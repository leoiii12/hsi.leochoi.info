var duration = 120;

var startGame = function () {
    // Control pages
    $("#page-home").hide();
    $("#page-game").fadeIn("fast");

    // Initial
    $("#timer").text("Remain " + duration + " seconds !")

    generateNewQuestions();
    startTimer();
};

var counter;

function startTimer() {
    counter = setInterval(timer, 1000);
    var tick = duration;

    function timer() {
        tick = tick - 1;

        if (tick <= 0) {
            clearInterval(counter);
            endGame();
        }

        $("#timer").text("Remain " + tick + " seconds !");
    }
}

function generateNewQuestions() {
    for (var i = 0; i < labels.length; i++) {
        $("<div></div>", {
            text: labels[i],
            class: "labels",
            "data-id": i
        }).appendTo("#labels-container");

        $("<div></div>", {
            text: "Drag Here !",
            class: "select-areas",
            "data-id": i
        }).appendTo("#select-areas-container");
    }

    var answers = [];

    for (var i = 0; i < contents.length; i++) {
        answers.push($("<div></div>", {
            text: contents[i],
            class: "options",
            "data-id": i
        }));

        shuffle(answers);
    }

    for (var i = 0; i < answers.length; i++) {
        answers[i].appendTo("#options-container");
    }

    makeDraggable();
}

// Private functions

function drop(event, ui) {
    var targetBox = $(this);
    var draggable = ui.draggable;

    var question = targetBox.attr("data-id");
    var answer = draggable.attr("data-id");

    if (question == answer) {
        gameStatus.score = gameStatus.score + 1;
    }

    // Fix the correct box
    draggable.draggable("disable");
    draggable.draggable("option", "revert", false);

    // Prevent drop more than onc time
    targetBox.droppable("disable");

    // Update text
    targetBox.text(draggable.text());

    // Remove draggable element
    draggable.remove();

    // Update game status
    if ((gameStatus.numberOfRemainingQuestions = gameStatus.numberOfRemainingQuestions - 1) == 0) {
        clearInterval(counter);
        endGame();
    }
}

function makeDraggable() {
    $(".options").draggable({
        cursor: "move",
        revert: true
    });

    $(".select-areas").droppable({
        drop: drop,
        hoverClass: "hovered"
    });
};


// @http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}