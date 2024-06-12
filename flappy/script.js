const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load images
const birdImg = new Image();
birdImg.src = 'blu.png'; // Replace with your bird image path
const pipeImg = new Image();
pipeImg.src = 'kipe.png'; // Replace with your pipe image path

// Game settings
const birdWidth = 48;
const birdHeight = 34;
const pipeWidth = 60;
const pipeGap = 140;
const gravity = 0.7; // Reduced gravity
const lift = -9; // Reduced lift
const pipeSpeed = 6;

// Game variables
let bird = {
    x: 50,
    y: canvas.height / 2,
    width: birdWidth,
    height: birdHeight,
    velocity: 0
};
let pipes = [];
let score = 0;
let frame = 0;
let gameRunning = false;
let highScore = 0;

// UI Elements

const stopButton = document.getElementById('stopButton');
const restartButton = document.getElementById('restartButton');
const lastScoreDisplay = document.getElementById('lastScore');
const highScoreDisplay = document.getElementById('highScore');

// Event Listeners
document.addEventListener('mousedown', () => {
    if (gameRunning) {
        bird.velocity = lift;
    }
});

// startButton.addEventListener('click', () => {
//     if (!gameRunning) {
//         gameRunning = true;
//         gameLoop();
//     }
// });

stopButton.addEventListener('click', () => {
    gameRunning = false;
});

restartButton.addEventListener('click', () => {
    resetGame();
    gameRunning = true;
    gameLoop();
});

// Create pipe
function createPipe() {
    const pipeHeight = Math.floor(Math.random() * (canvas.height / 2)) + 50;
    pipes.push({
        x: canvas.width,
        y: pipeHeight,
        width: pipeWidth,
        gap: pipeGap
    });
}

// Update game objects
function update() {
    if (!gameRunning) return;

    // Update bird position
    bird.velocity += gravity;
    bird.y += bird.velocity;

    // Prevent bird from falling out of the canvas
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        endGame();
    }

    // Update pipes
    if (frame % 90 === 0) {
        createPipe();
    }

    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed;

        // Collision detection
        if (
            bird.x < pipe.x + pipe.width &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.y || bird.y + bird.height > pipe.y + pipe.gap)
        ) {
            endGame();
        }

        // Remove off-screen pipes and increment score
        if (pipe.x + pipe.width < 0) {
            pipes.shift();
            score++;
        }
    });

    frame++;
}

// Draw everything
function draw() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bird
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // Draw pipes
    pipes.forEach(pipe => {
        // Top pipe
        context.drawImage(pipeImg, pipe.x, pipe.y - canvas.height, pipe.width, canvas.height);
        // Bottom pipe
        context.drawImage(pipeImg, pipe.x, pipe.y + pipe.gap, pipe.width, canvas.height);
    });

    // Draw score
    context.fillStyle = "#000";
    context.font = "20px Arial";
    context.fillText(`Score: ${score}`, 10, 20);
}

// Reset game
function resetGame() {
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    frame = 0;
}

// End game
function endGame() {
    gameRunning = false;
    if (score > highScore) {
        highScore = score;
    }
    lastScoreDisplay.textContent = `Last Score: ${score}`;
    highScoreDisplay.textContent = `Highest Score: ${highScore}`;
}

// Game loop
function gameLoop() {
    if (gameRunning) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
}

// Start the game
birdImg.onload = function() {
    gameLoop();
};
