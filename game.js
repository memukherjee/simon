const buttonColors = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keypress(function() {
    if (!started) {
        gamePattern = [];
        userClickedPattern = [];
        $('#level-title').css('font-size','3rem');
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$('.btn').click(function (){
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

    console.log(userClickedPattern);
})

function nextSequence(){
    level++;
    $('#level-title').text('Level '+level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    playSound(randomChosenColor)
    $('#'+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            userClickedPattern = [];
            setTimeout(function () {
            nextSequence();
            },1000);
        }
    } else {
        console.log("wrong");
        $('body').addClass('game-over');
        playSound('wrong');
        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').css('font-size','2.5rem');
        $('#level-title').text('Game Over,Press a key to restart');

        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

function playSound(name){
    new Audio("sounds/"+name+".mp3").play();
}

function animatePress(name){
    $('.'+name).addClass('pressed');
    setTimeout(function(){
        $('.'+name).removeClass('pressed');
    }, 100);
}



