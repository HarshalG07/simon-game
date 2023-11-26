var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var status = true;

function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  var ranNum = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[ranNum];
  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);

  level++;
}

function playSound(color) {
  switch (color) {
    case "red":
      var red = new Audio("./sounds/red.mp3");
      red.play();
      break;
    case "blue":
      var blue = new Audio("./sounds/blue.mp3");
      blue.play();
      break;
    case "green":
      var green = new Audio("./sounds/green.mp3");
      green.play();
      break;
    case "yellow":
      var yellow = new Audio("./sounds/yellow.mp3");
      yellow.play();
      break;
  }
}

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  $(this).fadeOut(50).fadeIn(50);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  // nextSequence();
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 70);
}

$(document).keydown(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function checkAnswer(level) {
  if (gamePattern[level] === userClickedPattern[level]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    var wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game over, Press any key to Restart");
    startOver();
  }
  // nextSequence();
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
