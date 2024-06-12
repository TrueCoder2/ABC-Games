const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const gameOverDialog = document.getElementById('gameOverDialog');
const finalScore = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');
const playerGif = document.getElementById('playerGif'); // Reference to the player GIF

const obstacleImg = new Image();
obstacleImg.src = 'obstacle.png'; // Replace with your obstacle image URL

const backgroundImg = new Image();
backgroundImg.src = 'dd.jpeg'; // Replace with your background image URL

const hitSound = new Audio('hit.wav'); // Replace with your sound effect URL

const player = {
    x: 50,
    y: canvas.height - 50,
    width: 40,
    height: 120,
    speed: 5,
    dx: 0,
    dy: 0
};

const obstacles = [];
const gravity = 0.5;
let isJumping = false;
let score = 0;
let lives = 3;
let obstacleFrequency = 50;
let frameCount = 0;
let gameRunning = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    player.y = canvas.height - player.height;
});

startBtn.addEventListener('click', () => {
    playerGif.style.display = 'block'; // Show the player GIF
    gameRunning = true;
    gameLoop();
});

stopBtn.addEventListener('click', () => {
    gameRunning = false;
    playerGif.style.display = 'none'; // Hide the player GIF
});

restartBtn.addEventListener('click', () => {
    resetGame();
    playerGif.style.display = 'block'; // Show the player GIF
    gameRunning = true;
    gameLoop();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        player.dx = -player.speed;
    } else if (e.key === ' ' && !isJumping) {
        player.dy = -10;
        isJumping = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Right' || e.key === 'ArrowLeft' || e.key === 'Left') {
        player.dx = 0;
    }
});

function updatePlayer() {
    player.x += player.dx;
    player.y += player.dy;
    
    if (player.y + player.height < canvas.height) {
        player.dy += gravity;
    } else {
        player.dy = 0;
        player.y = canvas.height - player.height;
        isJumping = false;
    }
    
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    // Update player GIF position
    playerGif.style.left = `${player.x}px`;
    playerGif.style.top = `${player.y}px`;
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.drawImage(obstacleImg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function updateObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.x += obstacle.dx;
        obstacle.y += obstacle.dy;
    });
    
    while (obstacles.length > 0 && (obstacles[0].y > canvas.height || obstacles[0].x > canvas.width || obstacles[0].x < -40)) {
        obstacles.shift();
        score++;
        if (score % 10 === 0 && obstacleFrequency > 20) {
            obstacleFrequency -= 5;
            obstacles.forEach(obstacle => {
                obstacle.dy += 0.5;
                obstacle.dx += 0.5;
            });
        }
    }
    
    obstacles.forEach(obstacle => {
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            lives--;
            hitSound.play(); // Play hit sound
            resetPlayer();
            if (lives <= 0) {
                gameRunning = false;
                playerGif.style.display = 'none'; // Hide the player GIF
                showGameOverDialog();
            }
        }
    });
}

function spawnObstacle() {
    const x = Math.random() * (canvas.width - 40);
    const y = -40;
    const width = 40;
    const height = 40;
    const angle = Math.random() * Math.PI / 4 - Math.PI / 8; // Random angle between -22.5 to 22.5 degrees
    const speed = 3 + score * 0.1;
    const dx = speed * Math.sin(angle);
    const dy = speed * Math.cos(angle);
    
    obstacles.push({ x, y, width, height, dx, dy });
}

function drawScoreAndLives() {
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
    ctx.fillText(`Lives: ${lives}`, canvas.width - 100, 20);
}

function resetPlayer() {
    player.x = 50;
    player.y = canvas.height - 50;
    player.dx = 0;
    player.dy = 0;
}

function showGameOverDialog() {
    finalScore.textContent = `Game Over! Your score: ${score}`;
    gameOverDialog.classList.remove('hidden');
}

function resetGame() {
    score = 0;
    lives = 3;
    obstacleFrequency = 50;
    frameCount = 0;
    obstacles.length = 0;
    resetPlayer();
    gameOverDialog.classList.add('hidden');
}

function gameLoop() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    updatePlayer();
    drawObstacles();
    updateObstacles();
    drawScoreAndLives();
    
    frameCount++;
    if (frameCount % obstacleFrequency === 0) {
        spawnObstacle();
    }
    
    requestAnimationFrame(gameLoop);
}

// Ensure images are loaded before starting the game
backgroundImg.onload = () => {
    obstacleImg.onload = () => {
        playerGif.onload = () => {
            // Images are loaded, now we can start the game
            playerGif.style.display = 'block'; // Show the player GIF when ready
        };
    };
};
