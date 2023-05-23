var board = [['', '', ''], ['', '', ''], ['', '', '']];
var currentPlayer = 'X';

var cells = document.querySelectorAll('.tic-tac-toe-cell');
function makeMove() {
  for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
          if (board[i][j] === '') {
              board[i][j] = 'O';
              var cellIndex = i * 3 + j;
              cells[cellIndex].textContent = 'O';
              return;
          }
      }
  }
}

cells.forEach(function (cell, index) {
  cell.addEventListener('click', function () {
      if (this.textContent !== '') return;
      var row = Math.floor(index / 3);
      var col = index % 3;
      this.textContent = 'X';
      board[row][col] = 'X';
      checkWin();
      makeMove();
      checkWin();
  });
});

document.querySelector('#reset-button').addEventListener('click', function () {
    board = [['', '', ''], ['', '', ''], ['', '', '']];
    currentPlayer = 'X';
    cells.forEach(function (cell) {
        cell.textContent = '';
    });
});

function checkWin() {
    for (var i = 0; i < 3; i++) {
        // Check rows
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
            alert(board[i][0] + ' wins!');
        }
        // Check columns
        if (board[0][i] !== '' && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
            alert(board[0][i] + ' wins!');
        }
    }
    // Check diagonals
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        alert(board[0][0] + ' wins!');
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        alert(board[0][2] + ' wins!');
    }
}
