// const canvas = document.getElementById('gameCanvas');
// const ctx = canvas.getContext('2d');

// let ball = {
//     x: canvas.width / 2,
//     y: canvas.height - 30,
//     dx: 2,
//     dy: -2,
//     radius: 10
// };

// let paddle = {
//     height: 10,
//     width: 75,
//     x: (canvas.width - 75) / 2
// };

// let bricks = [];
// const brickRowCount = 6;  // Increase rows for more bricks
// const brickColumnCount = 12;  // Increase columns for more bricks
// const brickWidth = 60;
// const brickHeight = 20;
// const brickPadding = 10;
// const brickOffsetTop = 30;
// const brickOffsetLeft = 30;

// let score = 0;
// let rightPressed = false;
// let leftPressed = false;
// let interval;

// const gameOverModal = document.getElementById('gameOverModal');
// const closeBtn = document.querySelector('.close');
// const restartButton = document.getElementById('restartButton');
// const finalScore = document.getElementById('finalScore');

// document.addEventListener('keydown', keyDownHandler);
// document.addEventListener('keyup', keyUpHandler);
// document.getElementById('playButton').addEventListener('click', startGame);
// document.getElementById('stopButton').addEventListener('click', stopGame);
// closeBtn.addEventListener('click', closeGameOverModal);
// restartButton.addEventListener('click', restartGame);

// function keyDownHandler(e) {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = true;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = true;
//     }
// }

// function keyUpHandler(e) {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = false;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = false;
//     }
// }

// function startGame() {
//     if (!interval) {
//         interval = setInterval(draw, 10);
//     }
// }

// function stopGame() {
//     clearInterval(interval);
//     interval = null;
// }

// function openGameOverModal() {
//     finalScore.textContent = score;
//     gameOverModal.style.display = "block";
// }

// function closeGameOverModal() {
//     gameOverModal.style.display = "none";
// }

// function restartGame() {
//     document.location.reload();
// }

// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
//     ctx.fillStyle = "#FFFFFF";
//     ctx.fill();
//     ctx.closePath();
// }

// function drawPaddle() {
//     ctx.beginPath();
//     ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
//     ctx.fillStyle = "#FFFFFF";
//     ctx.fill();
//     ctx.closePath();
// }

// function drawBricks() {
//     for(let c = 0; c < brickColumnCount; c++) {
//         if (!bricks[c]) bricks[c] = [];
//         for(let r = 0; r < brickRowCount; r++) {
//             if (!bricks[c][r]) {
//                 bricks[c][r] = { x: 0, y: 0, status: 1 };
//             }
//             if(bricks[c][r].status == 1) {
//                 const brickX = (c*(brickWidth+brickPadding)) + brickOffsetLeft;
//                 const brickY = (r*(brickHeight+brickPadding)) + brickOffsetTop;
//                 bricks[c][r].x = brickX;
//                 bricks[c][r].y = brickY;
//                 ctx.beginPath();
//                 ctx.rect(brickX, brickY, brickWidth, brickHeight);
//                 ctx.fillStyle = `hsl(${(r * 30) + (c * 5)}, 100%, 50%)`; // More colorful bricks
//                 ctx.fill();
//                 ctx.closePath();
//             }
//         }
//     }
// }

// function collisionDetection() {
//     for(let c = 0; c < brickColumnCount; c++) {
//         for(let r = 0; r < brickRowCount; r++) {
//             const b = bricks[c][r];
//             if(b.status == 1) {
//                 if(ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
//                     ball.dy = -ball.dy;
//                     b.status = 0;
//                     score++;
//                     document.getElementById('score').innerText = score;
//                     if(score == brickRowCount * brickColumnCount) {
//                         alert("YOU WIN, CONGRATS!");
//                         document.location.reload();
//                     }
//                 }
//             }
//         }
//     }
// }

// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBricks();
//     drawBall();
//     drawPaddle();
//     collisionDetection();

//     if(ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
//         ball.dx = -ball.dx;
//     }
//     if(ball.y + ball.dy < ball.radius) {
//         ball.dy = -ball.dy;
//     } else if(ball.y + ball.dy > canvas.height - ball.radius) {
//         if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
//             ball.dy = -ball.dy;
//         }
//         else {
//             clearInterval(interval);
//             openGameOverModal();
//         }
//     }

//     ball.x += ball.dx;
//     ball.y += ball.dy;

//     if(rightPressed && paddle.x < canvas.width - paddle.width) {
//         paddle.x += 7;
//     }
//     else if(leftPressed && paddle.x > 0) {
//         paddle.x -= 7;
//     }
// }

// drawBricks();


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    dx: 2,
    dy: -2,
    radius: 10
};

let paddle = {
    height: 10,
    width: 75,
    x: (canvas.width - 75) / 2
};

let bricks = [];
const brickRowCount = 6;  // Increase rows for more bricks
const brickColumnCount = 12;  // Increase columns for more bricks
const brickWidth = 60;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let score = 0;
let rightPressed = false;
let leftPressed = false;
let interval;

const gameOverModal = document.getElementById('gameOverModal');
const closeBtn = document.querySelector('.close');
const restartButton = document.getElementById('restartButton');
const finalScore = document.getElementById('finalScore');

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.getElementById('playButton').addEventListener('click', startGame);
document.getElementById('stopButton').addEventListener('click', stopGame);
closeBtn.addEventListener('click', closeGameOverModal);
restartButton.addEventListener('click', restartGame);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function startGame() {
    if (!interval) {
        interval = setInterval(draw, 10);
    }
}

function stopGame() {
    clearInterval(interval);
    interval = null;
}

function openGameOverModal() {
    finalScore.textContent = score;
    gameOverModal.style.display = "block";
}

function closeGameOverModal() {
    gameOverModal.style.display = "none";
}

function restartGame() {
    closeGameOverModal();
    document.location.reload();
}

function resetBallAndPaddle() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height - 30;
    ball.dx = 2;
    ball.dy = -2;
    paddle.x = (canvas.width - paddle.width) / 2;
}

function resetBricks() {
    bricks = [];
    for(let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for(let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = `hsl(${(r * 30) + (c * 5)}, 100%, 50%)`; // More colorful bricks
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if(b.status == 1) {
                if(ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
                    ball.dy = -ball.dy;
                    b.status = 0;
                    score++;
                    document.getElementById('score').innerText = score;
                    if(score == brickRowCount * brickColumnCount) {
                        resetBricks();  // Regenerate bricks when all are broken
                    }
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if(ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if(ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    } else if(ball.y + ball.dy > canvas.height - ball.radius) {
        if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
        }
        else {
            clearInterval(interval);
            interval = null;
            openGameOverModal();
        }
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    if(rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += 7;
    }
    else if(leftPressed && paddle.x > 0) {
        paddle.x -= 7;
    }
}

resetBricks();
drawBricks();
