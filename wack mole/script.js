let squares = document.querySelectorAll('.square');
let mole = null;
let score = document.querySelector('#score');
let timeLeft = document.querySelector('#time-left');
let result = 0;
let currentTime = 60;
let hitPosition;
let timerId;
let moleTimerId;
let isPaused = false;
let isHardLevel = false; // Flag to indicate if the game is in hard mode

// Function to randomize mole appearance
function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    });
    let randomSquare = squares[Math.floor(Math.random() * squares.length)];
    randomSquare.classList.add('mole');
    hitPosition = randomSquare.id;
}

// Function to move the mole with adjustable interval
function moveMole() {
    moleTimerId = setInterval(randomSquare, isHardLevel ? 500 : 1000); // Faster mole appearance in hard level
}

// Start the game
function startGame() {
    result = 0;
    currentTime = isHardLevel ? 30 : 60; // Shorter time limit in hard level
    score.textContent = result;
    timeLeft.textContent = currentTime;
    moveMole();
    timerId = setInterval(countDown, 1000);
}

// Pause the game
function pauseGame() {
    if (!isPaused) {
        clearInterval(timerId);
        clearInterval(moleTimerId);
        isPaused = true;
    } else {
        timerId = setInterval(countDown, 1000);
        moveMole();
        isPaused = false;
    }
}

// Reset the game
function resetGame() {
    clearInterval(timerId);
    clearInterval(moleTimerId);
    squares.forEach(square => {
        square.classList.remove('mole');
    });
    isPaused = false;
    startGame();
}

// Countdown timer function
function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if (currentTime === 0) {
        clearInterval(timerId);
        clearInterval(moleTimerId);
        alert('Game Over! Your final score is ' + result);
    }
}

// Add event listener for mole hit
squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id === hitPosition && !isPaused) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    });
});

// Event listeners for buttons
document.querySelector('#pause').addEventListener('click', pauseGame);
document.querySelector('#reset').addEventListener('click', resetGame);
document.querySelector('#change-level').addEventListener('click', () => {
    isHardLevel = !isHardLevel; // Toggle between easy and hard levels
    document.querySelector('#change-level').textContent = isHardLevel ? 'Easy Level' : 'Hard Level'; // Update button text
    resetGame(); // Reset the game to apply level changes
});

// Start the game automatically
startGame();
