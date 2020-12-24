let gameOver = false;
const colors = ["red", "green", "yellow", "blue"];
let playerPattern = [];
let pattern = [];
let currentLevel;
let started = false;

$(document).keypress(function () {
    gameOver = false;
    nextSeq();
});

$(document).click(function () {
    gameOver = false;
    if (!started) {
        nextSeq();
        started = true;
    }
})

$(".btn").click(function (event) {
    ifPressed(event.currentTarget.id);
    makeSound(event.currentTarget.id);
    playerPattern.push(event.currentTarget.id);
    check(playerPattern.length);
});

function makeSound(id) {
    switch (id) {
        case "red":
            var red = new Audio("./sounds/red.mp3");
            red.play();
            break;
        case "green":
            var green = new Audio("./sounds/green.mp3");
            green.play();
            break;
        case "blue":
            var blue = new Audio("./sounds/blue.mp3");
            blue.play();
            break;
        case "yellow":
            var yellow = new Audio("./sounds/yellow.mp3");
            yellow.play();
            break;
    }
}
function ifPressed(id) {
    $("#" + id).addClass("pressed");
    setTimeout(function () {
        $("#" + id).removeClass("pressed");
    }, 100)
}

function getRandom() {
    return Math.floor(Math.random() * 4);
}

function nextSeq() {
    var currentColor = colors[getRandom()];
    $("#" + currentColor).fadeOut(100).fadeIn(100);
    makeSound(currentColor);
    pattern.push(currentColor);
    currentLevel = pattern.length;
    $("h1").text("Level " + currentLevel);
}

function check(level) {

    if (playerPattern[level - 1] !== pattern[level - 1]) {
        $("h1").text("GameOver Press any Key or refresh to Restart");
        playerPattern = [];
        pattern = [];
        gameOver = true;
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 100);
        var over = new Audio("./sounds/wrong.mp3");
        over.play();
    }

    if (level === pattern.length && !gameOver) {
        setTimeout(nextSeq, 1000);
        playerPattern = [];
    }

}
