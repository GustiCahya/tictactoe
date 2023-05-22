// Tic-Tac-Toe game logic

// Create a 2D array to represent the game board
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let currentPlayer = 'X';
let isGameOver = false;

const canvas = document.getElementById('board');
const context = canvas.getContext('2d');

// Draw the Tic-Tac-Toe grid
function drawBoard() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = 'black';
  context.lineWidth = 4;

  // Draw horizontal lines
  for (let i = 1; i < 3; i++) {
    context.beginPath();
    context.moveTo(0, i * 100);
    context.lineTo(canvas.width, i * 100);
    context.stroke();
  }

  // Draw vertical lines
  for (let i = 1; i < 3; i++) {
    context.beginPath();
    context.moveTo(i * 100, 0);
    context.lineTo(i * 100, canvas.height);
    context.stroke();
  }

  // Draw X and O symbols
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = board[row][col];
      const xPos = col * 100 + 50;
      const yPos = row * 100 + 50;

      context.font = '50px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      if (cell === 'X') {
        context.fillStyle = 'blue';
        context.fillText(cell, xPos, yPos);
      } else if (cell === 'O') {
        context.fillStyle = 'red';
        context.fillText(cell, xPos, yPos);
      }
    }
  }
}

// Handle mouse clicks on the canvas
function handleClick(event) {
  if (isGameOver) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const row = Math.floor(y / 100);
  const col = Math.floor(x / 100);

  if (board[row][col] === '') {
    board[row][col] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    drawBoard();
    checkWinner();
  }
}

// Check if a player has won
function checkWinner() {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] === currentPlayer &&
      board[row][1] === currentPlayer &&
      board[row][2] === currentPlayer
    ) {
      announceWinner(currentPlayer);
      announceLoser(currentPlayer === 'X' ? 'O' : 'X');
      return;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] === currentPlayer &&
      board[1][col] === currentPlayer &&
      board[2][col] === currentPlayer
    ) {
      announceWinner(currentPlayer);
      announceLoser(currentPlayer === 'X' ? 'O' : 'X');
      return;
    }
  }

  // Check diagonals
  if (
    (board[0][0] === currentPlayer &&
      board[1][1] === currentPlayer &&
      board[2][2] === currentPlayer) ||
    (board[0][2] === currentPlayer &&
      board[1][1] === currentPlayer &&
      board[2][0] === currentPlayer)
  ) {
    announceWinner(currentPlayer);
    announceLoser(currentPlayer === 'X' ? 'O' : 'X');
    return;
  }

  // Check for a tie
  if (board.flat().every(cell => cell !== '')) {
    announceTie();
  }
}

// Announce the winner and end the game
function announceWinner(winner) {
  isGameOver = true;
  setTimeout(() => {
    alert(`${winner} wins!`);
    resetGame();
  }, 100);
}

// Announce the loser
function announceLoser(loser) {
  setTimeout(() => {
    alert(`${loser} loses!`);
  }, 200);
}

// Announce a tie and end the game
function announceTie() {
  isGameOver = true;
  setTimeout(() => {
    alert("It's a tie!");
    resetGame();
  }, 100);
}

// Reset the game board
function resetGame() {
  board.forEach(row => row.fill(''));
  currentPlayer = 'X';
  isGameOver = false;
  drawBoard();
}

// Attach event listener to canvas
canvas.addEventListener('click', handleClick);

// Initial board drawing
drawBoard();
