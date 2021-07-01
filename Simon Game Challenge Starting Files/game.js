buttonArray=["red","yellow","green","blue"];

gamePattern=[];

userClickedPattern=[];

var level=0;
var playing=false;
$(".btn").click( function() {

  var userChosenColour = $(this).attr("id");
  $("#"+userChosenColour).fadeOut(100).fadeIn(100);
  userClickedPattern.push(userChosenColour);

  playsound(userChosenColour);
  animatepress(userChosenColour);
  checkanswer((userClickedPattern.length)-1);
});


$(document).keypress(function(event){

  $("#level-title").text("Level " + level);
  if(!playing)
  {
    nextSequence();
    playing=true;
  }
});

function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+ level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChoosenColor = buttonArray[randomNumber];
  gamePattern.push(randomChoosenColor);

  $("#"+randomChoosenColor).fadeOut(100).fadeIn(100);
  playsound(randomChoosenColor);
}

function checkanswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    if(userClickedPattern.length===gamePattern.length)
      setTimeout(function(){
        nextSequence();},1000);

  }
  else
  {
    $("#level-title").text("Game Over!! Press any key to restart");
    var fail = new Audio("sounds/wrong.mp3");
    fail.play();

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("body").keypress(function(){
      startOver();
    });
    console.log("failure");
  }
}

function startOver()
{
  level=0;
  gamePattern=[];
  playing=false;
  $("#level-title").text("Press any key to Start");
}



function playsound(name){
  var sound = "sounds/"+name+".mp3";
  var audio= new Audio(sound);
  audio.play();
}

function animatepress(currentColour){

  $("#"+currentColour).addClass("pressed");

  setTimeout(function () {

    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
