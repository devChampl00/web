const playBoard = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high-score');
const finalScoreElement = document.querySelector('.final-score');
const controls = document.querySelectorAll('.controls i');
const pauseOverlay = document.querySelector('.pause-overlay');
const gameOverOverlay = document.querySelector('.game-over-overlay');
const resumeButton = document.querySelector('.resume-btn');
const restartButton = document.querySelector('.restart-btn');
const difficultySelect = document.getElementById('difficulty');
const speedControl = document.getElementById('speed-control');
const themeSelector = document.getElementById('theme-selector');

let gameOver = false;
let gamePaused = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;
let snakeBody = [[snakeX, snakeY]];
let setIntervalId;
let score = 0;
let gameSpeed = 125;

// Prevent default scroll behavior for arrow keys
window.addEventListener('keydown', (e) => {
    const preventScrollKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape'];
    if (preventScrollKeys.includes(e.key)) {
        e.preventDefault();
    }
}, { passive: false });

// Theme Selector
themeSelector.addEventListener('change', (e) => {
    const selectedTheme = e.target.value;

    // Remove all theme classes
    document.documentElement.classList.remove(
        'theme-cyberpunk',
        'theme-forest',
        'theme-ocean',
        'theme-sunset'
    );

    // Add selected theme class if a theme is selected
    if (selectedTheme) {
        document.documentElement.classList.add(`theme-${selectedTheme}`);
        // Simpan tema di localStorage
        localStorage.setItem('game-theme', selectedTheme);
    } else {
        // Hapus tema dari localStorage jika default dipilih
        localStorage.removeItem('game-theme');
    }
});

// Fungsi untuk memuat tema saat halaman dimuat
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('game-theme');
    if (savedTheme) {
        themeSelector.value = savedTheme;
        document.documentElement.classList.add(`theme-${savedTheme}`);
    }
}

// Panggil fungsi load theme saat halaman dimuat
loadSavedTheme();

restartButton.addEventListener('click', () => {
    // Ambil tema yang dipilih sebelumnya
    const currentTheme = localStorage.getItem('game-theme') || '';

    // Reload halaman
    location.reload();

    // Setel ulang tema setelah reload
    if (currentTheme) {
        localStorage.setItem('game-theme', currentTheme);
    }
});

// Sisa kode script sebelumnya tetap sama
const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;

    for (let segment of snakeBody) {
        if (segment[0] === foodX && segment[1] === foodY) {
            return updateFoodPosition();
        }
    }
};

const handleGameOver = () => {
    clearInterval(setIntervalId);
    finalScoreElement.innerText = `Your Score: ${score}`;
    gameOverOverlay.classList.add('active');
};

const pauseGame = () => {
    if (!gameOver) {
        gamePaused = !gamePaused;
        if (gamePaused) {
            clearInterval(setIntervalId);
            pauseOverlay.classList.add('active');
        } else {
            resumeGame();
        }
    }
};

const resumeGame = () => {
    pauseOverlay.classList.remove('active');
    gamePaused = false;
    setIntervalId = setInterval(initGame, gameSpeed);
};

const changeDirection = (e) => {
    const key = typeof e === 'object' ? e.key : e;

    if (key === 'ArrowUp' && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (key === 'ArrowDown' && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (key === 'ArrowLeft' && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (key === 'ArrowRight' && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
};

// Touch controls for mobile
controls.forEach(button => {
    button.addEventListener('click', () => changeDirection(button.dataset.key));
});

let highScore = localStorage.getItem('high-score') || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const initGame = () => {
    if (gameOver || gamePaused) return;

    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Checking if the snake hit the food
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodX, foodY]); // Add new segment
        score++;

       // Perbarui high score
       highScore = Math.max(score, parseInt(localStorage.getItem('high-score') || 0));

       localStorage.setItem('high-score', highScore);
       scoreElement.innerText = `Score: ${score}`;
       highScoreElement.innerText = `High Score: ${highScore}`;
    }

    // Update snake head position
    snakeX += velocityX;
    snakeY += velocityY;

    // Shift snake body segments
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = [...snakeBody[i - 1]];
    }
    snakeBody[0] = [snakeX, snakeY]; // Update head position

    // Check wall collision
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
        handleGameOver();
        return;
    }

    // Render snake body and check self collision
    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="${i === 0 ? 'head' : 'body'}" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        // Check head collision with body (skip first segment which is head)
        if (i !== 0 && snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
            handleGameOver();
            return;
        }
    }

    playBoard.innerHTML = html;
};

// Difficulty and speed controls
difficultySelect.addEventListener('change', (e) => {
    switch(e.target.value) {
        case 'easy':
            gameSpeed = 200;
            break;
        case 'medium':
            gameSpeed = 125;
            break;
        case 'hard':
            gameSpeed = 75;
            break;
    }
    speedControl.value = gameSpeed;
    if (!gameOver && !gamePaused) {
        clearInterval(setIntervalId);
        setIntervalId = setInterval(initGame, gameSpeed);
    }
});

speedControl.addEventListener('input', (e) => {
    gameSpeed = parseInt(e.target.value);
    if (!gameOver && !gamePaused) {
        clearInterval(setIntervalId);
        setIntervalId = setInterval(initGame, gameSpeed);
    }
});

// Event listeners for game controls
document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        pauseGame();
    } else if (!gamePaused) {
        changeDirection(e);
    }
});

resumeButton.addEventListener('click', resumeGame);
restartButton.addEventListener('click', () => {
    location.reload();
});

// Initialize game
updateFoodPosition();
setIntervalId = setInterval(initGame, gameSpeed);
