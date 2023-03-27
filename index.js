buttonColor = ["red", "blue", "green", "yellow"]
gamePattern = []
userClickedPattern = []
let level = 0
var started = false;




function nextSequence() {
    userClickedPattern = [];
    level++
    $("#level-title").text("Level " + level)

    let randomNumber = Math.floor((Math.random()) * 4)
    let randomChoosenColor = buttonColor[randomNumber]
    gamePattern.push(randomChoosenColor)

    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChoosenColor)

}



$(".btn").click(function () {

    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor);
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
})



function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}



function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100)
}



$("body").keypress(function (event) {
    if (!started) {
        $("#level-title").text("Level " + level)
        nextSequence()
        started = true
    }
})


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}