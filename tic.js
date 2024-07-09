// Game constants
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Game variables
let board;
let currentPlayer;
let gameActive;

// DOM elements
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

// Initialize the game
function initGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = X_CLASS;
    gameActive = true;
    statusElement.textContent = `Player ${currentPlayer.toUpperCase()}'s turn`;
    boardElement.classList.remove(O_CLASS);
    boardElement.classList.add(X_CLASS);
    resetBoard();
}

// Reset board and event listeners
function resetBoard() {
    board.forEach((cell, index) => {
        const cellElement = document.getElementById(`cell-${index}`);
        cellElement.textContent = '';
        cellElement.removeEventListener('click', handleClick);
        cellElement.addEventListener('click', handleClick, { once: true });
        cellElement.classList.remove(X_CLASS, O_CLASS);
    });
    resetButton.addEventListener('click', initGame);
}

// Handle click on cell
function handleClick(event) {
    const cell = event.target;
    const index = parseInt(cell.id.split('-')[1]);

    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.classList.add(currentPlayer);
    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        updateStatus();
    }
}

// Check if there is a winner
function checkWin(player) {
    return WINNING_COMBOS.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

// Check if it's a draw
function isDraw() {
    return board.every(cell => {
        return cell !== '';
    });
}

// End the game
function endGame(draw) {
    if (draw) {
        statusElement.textContent = `It's a draw!`;
    } else {
        statusElement.textContent = `Player ${currentPlayer.toUpperCase()} wins!`;
    }
    gameActive = false;
}

// Swap turns between X and O
function swapTurns() {
    currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
}

// Update game status
function updateStatus() {
    statusElement.textContent = `Player ${currentPlayer.toUpperCase()}'s turn`;
}

// Start the game
initGame();

document.getElementById('changecolor').addEventListener('click',function(){
    document.body.style.backgroundColor=Randcolorgen();
    document.getElementById('colorcheck').textContent(Randcolorgen);
});

function Randcolorgen(){
    const letter='0123456789ABCDEF';
    let color='#';
    for(let i=0;i<6;i++){
        color=color+letter[Math.floor(Math.random()*15)];
    }
    return color;
}