const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const playButton = document.getElementById("playButton");
const resetButton = document.getElementById("resetButton");
const container = document.getElementById("container");

const boardSize = 3;
const cellSize = canvas.width / boardSize;
let board = [];
let currentPlayer;
let gameOver;

playButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);
canvas.addEventListener("click", makeMove);

drawBoard();

function startGame() {
  resetGame();
  playButton.style.display = "none";
  resetButton.disabled = false;
  currentPlayer = Math.random() < 0.5 ? "player" : "bot";
  gameOver = false;
  drawBoard();
  if (currentPlayer === "bot") {
    setTimeout(makeBotMove, 500);
  }
}

function resetGame() {
  board = [];
  for (let row = 0; row < boardSize; row++) {
    board[row] = Array(boardSize).fill(null);
  }
  currentPlayer = null;
  gameOver = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
  playButton.style.display = "block";
  resetButton.disabled = true;
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  for (let i = 1; i < boardSize; i++) {
    ctx.moveTo(i * cellSize, 0);
    ctx.lineTo(i * cellSize, canvas.height);
    ctx.moveTo(0, i * cellSize);
    ctx.lineTo(canvas.width, i * cellSize);
  }
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = board[row][col];
      if (cell === "X") {
        ctx.font = "48px Arial";
        ctx.fillText(
          cell,
          col * cellSize + cellSize / 2 - 18,
          row * cellSize + cellSize / 2 + 18
        );
      } else if (cell === "O") {
        ctx.font = "48px Arial";
        ctx.fillText(
          cell,
          col * cellSize + cellSize / 2 - 20,
          row * cellSize + cellSize / 2 + 18
        );
      }
    }
  }
}

function makeMove(event) {
  if (!gameOver && currentPlayer === "player") {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (board[row][col] === null) {
      board[row][col] = "X";
      drawBoard();
      checkGameStatus();
      currentPlayer = "bot";
      if (!gameOver) {
        setTimeout(makeBotMove, 500);
      }
    }
  }
}

function makeBotMove() {
  if (currentPlayer === "bot") {
    let row, col;

    do {
      row = Math.floor(Math.random() * boardSize);
      col = Math.floor(Math.random() * boardSize);
    } while (board[row][col] !== null);

    if (row !== undefined && col !== undefined) {
      board[row][col] = "O";
      drawBoard();
      checkGameStatus();
      currentPlayer = "player";
    }
  }
}

function checkGameStatus() {
  const winningCombinations = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [[rowA, colA], [rowB, colB], [rowC, colC]] = winningCombinations[i];
    if (
      board[rowA][colA] &&
      board[rowA][colA] === board[rowB][colB] &&
      board[rowA][colA] === board[rowC][colC]
    ) {
      gameOver = true;
      if (board[rowA][colA] === "X") {
        Swal.fire({
          title: 'You Win!',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
      } else if (board[rowA][colA] === "O") {
        Swal.fire({
          title: 'You Lose!',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
      return;
    }
  }

  let isBoardFull = true;
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board[row][col] === null) {
        isBoardFull = false;
        break;
      }
    }
  }

  if (isBoardFull) {
    gameOver = true;
    Swal.fire({
      title: `It's a tie!`,
      confirmButtonText: 'Cool'
    })
  }
}

function minimax(board, depth, isMaximizing) {
  const scores = {
    X: -1,
    O: 1,
    tie: 0,
  };

  const result = checkGameStatus();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        if (board[row][col] === null) {
          board[row][col] = "O";
          const score = minimax(board, depth + 1, false);
          board[row][col] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        if (board[row][col] === null) {
          board[row][col] = "X";
          const score = minimax(board, depth + 1, true);
          board[row][col] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
