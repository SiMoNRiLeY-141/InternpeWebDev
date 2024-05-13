const board = document.getElementById('board');
let currentPlayer = 1;
let gameEnded = false;
const playerColors = {
  1: 'Red',
  2: 'Yellow'
};
function createCell(row, col) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.row = row;
  cell.dataset.col = col;
  cell.addEventListener('click', () => dropPiece(col));
  return cell;
}
function createBoard() {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      board.appendChild(createCell(row, col));
    }
  }
}
function dropPiece(col) {
  if (gameEnded) return;
  const cells = document.querySelectorAll(`.cell[data-col='${col}']`);
  for (let i = cells.length - 1; i >= 0; i--) {
    const cell = cells[i];
    if (!cell.classList.contains('player1') && !cell.classList.contains('player2')) {
      cell.classList.add(`player${currentPlayer}`);
      if (checkWin(cell.dataset.row, col)) {
        gameEnded = true;
        setTimeout(() => alert(`Player ${playerColors[currentPlayer]} wins!`), 100);
        return;
      }
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      return;
    }
  }
}
function checkWin(row, col) {
  const directions = [[1, 0], [0, 1], [1, 1], [-1, 1]];
  for (const [dx, dy] of directions) {
    let count = 1;
    for (let i = 1; i < 4; i++) {
      const newRow = parseInt(row) + i * dx;
      const newCol = parseInt(col) + i * dy;
      const cell = document.querySelector(`.cell[data-row='${newRow}'][data-col='${newCol}']`);
      if (cell && cell.classList.contains(`player${currentPlayer}`)) {
        count++;
      } else {
        break;
      }
    }
    for (let i = 1; i < 4; i++) {
      const newRow = parseInt(row) - i * dx;
      const newCol = parseInt(col) - i * dy;
      const cell = document.querySelector(`.cell[data-row='${newRow}'][data-col='${newCol}']`);
      if (cell && cell.classList.contains(`player${currentPlayer}`)) {
        count++;
      } else {
        break;
      }
    }
    if (count >= 4) {
      markWin(row, col, dx, dy, playerColors[currentPlayer]);
      return true;
    }
  }
  return false;
}
function markWin(row, col, dx, dy, color) {
}
function resetGame() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.classList.remove('player1', 'player2', 'win');
  });
  currentPlayer = 1;
  gameEnded = false;
}
createBoard();
const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', resetGame);
