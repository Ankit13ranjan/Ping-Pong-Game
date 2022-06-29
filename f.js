var ball = document.getElementById('ball');
var rod1 = document.getElementById('rod1');
var rod2 = document.getElementById('rod2');

rod1.style.left = rod1.offsetLeft + "px";


let gameOn = false;

let rod2name = "Rod2";
let storeName= "PPName";
let storeScore= "PPMaxScore";
let rod1name = "Rod1";

let movement,
    score,
    maxScore,
    rod,
    ballSpeedX=2,
    ballSpeedY=2;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;



var rodwidth = rod1.offsetWidth;

function setValue(value){
    return value + "px";
}


(function () {
    rod = localStorage.getItem(storeName);
    maxScore = localStorage.getItem(storeScore);

    if (rod === "null" || maxScore === "null") {
        alert("This is the first time you are playing this game. LET'S START");
        maxScore = 0;
        rod = "Rod1"
    } else {
        alert(rod + " has maximum score of " + maxScore * 100);
    }

    resetBoard(rod);
})();



function resetBoard(rodName) {

    rod1.style.left = (window.innerWidth - rod1.offsetWidth) / 2 + 'px';
    rod2.style.left = (window.innerWidth - rod2.offsetWidth) / 2 + 'px';
    ball.style.left = (windowWidth - ball.offsetWidth) / 2 + 'px';


    // Lossing player gets the ball
    if (rodName === rod2name) {
        ball.style.top = (rod1.offsetTop + rod1.offsetHeight) + 'px';
        ballSpeedY = 2;
    } else if (rodName === rod1name) {
        ball.style.top = (rod2.offsetTop - rod2.offsetHeight) + 'px';
        ballSpeedY = -2;
    }

    score = 0;
    gameOn = false;

}



function storeWin(rod, score) {

    if (score > maxScore) {
        maxScore = score;
        localStorage.setItem(storeName, rod);
        localStorage.setItem(storeScore, maxScore);
    }

    clearInterval(movement);
    resetBoard(rod);

    alert(rod + " wins with a score of " + (score * 100) + ". Max score is: " + (maxScore * 100));

}



function keyCode(keypress){
    var left = parseInt(rod1.style.left);

    if(keypress==97 || keypress==65){   //A pressed
        if(left>20)
        {
            rod1.style.left=setValue(left-20);
            rod2.style.left=setValue(left-20);
        }
    }
    else if(keypress==100 || keypress==68){   //S pressed
        if(left<(window.innerWidth-rodwidth)-20)
        {
            rod1.style.left=setValue(left+20);
            rod2.style.left=setValue(left+20);
        }
    }

    if(event.code == "Enter"){
        if(!gameOn){
            gameOn = true;
            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY = ballRect.y;
            let ballDia = ballRect.width;

            let rod1Height = rod1.innerHeight;
            let rod2Height = rod2.innerHeight;
            let rod1Width = rod1.innerWidth;
            let rod2Width = rod2.innerWidth;

            movement = setInterval(function(){
                ballX += ballSpeedX;
                ballY += ballSpeedY;


                ball.style.left = ballX + 'px';
                ball.style.top = ballY + 'px';

                let rod1X = rod1.getBoundingClientRect();
                let rod2X = rod2.getBoundingClientRect();

                //Wall Reverse Side
                if((ballX+ballDia) > windowWidth || ballX < 0){
                    ballSpeedX = -ballSpeedX;                              
                }

                let possition = ballX + ballDia/2;

                //Rod1 Reverse
                if(ballY <= rod1Height){
                    ballSpeedY = -ballSpeedY;
                    score++;

                    //Check for Game Over

                    if((possition < rod1X) || (rod1X+rod1Width) < possition){
                        storeWin(rod2name, score);
                    }

                }
                //Rod2 Reverse
                else if((ballY + ballDia) >= (windowHeight-rod2Height)){
                    ballSpeedY = -ballSpeedY;
                    score++;

                    //Check for Game Over

                    if((possition < rod2X) || (rod2X+rod2Width) < possition){
                        storeWin(rod1name, score);
                    }
                }


            },10);

        }
    }
    
}

window.addEventListener("keypress", function (event) {
        keyCode(event.keyCode);
});

    