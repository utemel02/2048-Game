function initializeBoard() {
  const board = [];
  for (let i = 0; i < 4; i++) {
      board[i] = [];
      for (let j = 0; j < 4; j++) {
          board[i][j] = 0;
      }
  }
  return board;
}

function renderBoard(board) {
  const boardElement = document.querySelector('.board');
  boardElement.innerHTML = '';

  for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
          const cell = document.createElement('div');
          cell.className = board[i][j] === 0 ? 'cell empty' : 'cell';
          cell.textContent = board[i][j] === 0 ? '' : board[i][j].toString();
          cell.style.backgroundColor = getCellBackgroundColor(board[i][j]);
          boardElement.appendChild(cell);
      }
  }
}

function addNumber(board) {
  const emptyCells = [];
  for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
          if (board[i][j] === 0) {
              emptyCells.push({ row: i, col: j });
          }
      }
  }
  if (emptyCells.length > 0) {
      const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[row][col] = Math.random() < 0.9 ? 2 : 4;
  }
}



function renderBoard(board) {
  const boardElement = document.querySelector('.board');
  boardElement.innerHTML = '';

  for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          cell.textContent = board[i][j] === 0 ? '' : board[i][j].toString();
          cell.style.backgroundColor = getCellBackgroundColor(board[i][j]);
          boardElement.appendChild(cell);
      }
  }
}

function getCellBackgroundColor(value) {
  switch (value) {
      case 0:
          return '#eee';
      case 2:
          return '#eee4da';
      case 4:
          return '#ede0c8';
      case 8:
          return '#f2b179';
      case 16:
          return '#f59563';
      case 32:
          return '#f67c5f';
      case 64:
          return '#f65e3b';
      case 128:
          return '#edcf72';
      case 256:
          return '#edcc61';
      case 512:
          return '#edc850';
      case 1024:
          return '#edc53f';
      case 2048:
          return '#edc22e';
      default:
          return '#3c3a32';
  }
}

function updateScore(score) {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = score;
}

function isGameOver(board) {
  for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
          if (board[i][j] === 2048) {
              return true;
          }
      }
  }

  for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
          if (board[i][j] === 0 ||
              (i > 0 && board[i][j] === board[i - 1][j]) ||
              (i < 3 && board[i][j] === board[i + 1][j]) ||
              (j > 0 && board[i][j] === board[i][j - 1]) ||
              (j < 3 && board[i][j] === board[i][j + 1])) {
              return false;
          }
      }
  }

  return true;
}

function moveLeft(board) {
  for (let i = 0; i < 4; i++) {
      let emptyIndex = 0;
      for (let j = 0; j < 4; j++) {
          if (board[i][j] !== 0) {
              if (emptyIndex !== j) {
                  board[i][emptyIndex] = board[i][j];
                  board[i][j] = 0;
              }
              emptyIndex++;
          }
      }

      for (let j = 0; j < 3; j++) {
          if (board[i][j] === board[i][j + 1]) {
              board[i][j] *= 2;
              board[i][j + 1] = 0;
          }
      }

      emptyIndex = 0;
      for (let j = 0; j < 4; j++) {
          if (board[i][j] !== 0) {
              if (emptyIndex !== j) {
                  board[i][emptyIndex] = board[i][j];
                  board[i][j] = 0;
              }
              emptyIndex++;
          }
      }
  }
}

function moveRight(board) {
  for (let i = 0; i < 4; i++) {
      let emptyIndex = 3;
      for (let j = 3; j >= 0; j--) {
          if (board[i][j] !== 0) {
              if (emptyIndex !== j) {
                  board[i][emptyIndex] = board[i][j];
                  board[i][j] = 0;
              }
              emptyIndex--;
          }
      }

      for (let j = 3; j > 0; j--) {
          if (board[i][j] === board[i][j - 1]) {
              board[i][j] *= 2;
              board[i][j - 1] = 0;
          }
      }

      emptyIndex = 3;
      for (let j = 3; j >= 0; j--) {
          if (board[i][j] !== 0) {
              if (emptyIndex !== j) {
                  board[i][emptyIndex] = board[i][j];
                  board[i][j] = 0;
              }
              emptyIndex--;
          }
      }
  }
}

function moveUp(board) {
  for (let j = 0; j < 4; j++) {
      let emptyIndex = 0;
      for (let i = 0; i < 4; i++) {
          if (board[i][j] !== 0) {
              if (emptyIndex !== i) {
                  board[emptyIndex][j] = board[i][j];
                  board[i][j] = 0;
              }
              emptyIndex++;
          }
      }

      for (let i = 0; i < 3; i++) {
          if (board[i][j] === board[i + 1][j]) {
              board[i][j] *= 2;
              board[i + 1][j] = 0;
          }
      }

      emptyIndex = 0;
      for (let i = 0; i < 4; i++) {
          if (board[i][j] !== 0) {
              if (emptyIndex !== i) {
                  board[emptyIndex][j] = board[i][j];
                  board[i][j] = 0;
              }
              emptyIndex++;
          }
      }
  }
}


function moveDown(board) {
  for (let j = 0; j < 4; j++) {
      let emptyIndex = 3;
      for (let i = 3; i >= 0; i--) {
          if (board[i][j] !== 0) {
              if (emptyIndex !== i) {
                  board[emptyIndex][j] = board[i][j];
                  board[i][j] = 0;
              }
              emptyIndex--;
          }
      }

      for (let i = 3; i > 0; i--) {
          if (board[i][j] === board[i - 1][j]) {
              board[i][j] *= 2;
              board[i - 1][j] = 0;
          }
      }

      emptyIndex = 3;
      for (let i = 3; i >= 0; i--) {
          if (board[i][j] !== 0) {
              if (emptyIndex !== i) {
                  board[emptyIndex][j] = board[i][j];
                  board[i][j] = 0;
              }
              emptyIndex--;
          }
      }
  }
}

function handleKeyPress(event) {
  let moved = false;
  switch (event.key) {
      case 'ArrowLeft':
          moveLeft(board);
          moved = true;
          break;
      case 'ArrowRight':
          moveRight(board);
          moved = true;
          break;
      case 'ArrowUp':
          moveUp(board);
          moved = true;
          break;
      case 'ArrowDown':
          moveDown(board);
          moved = true;
          break;
  }

  if (moved) {
      addNumber(board);
      renderBoard(board);
      updateScore(calculateScore(board));

      if (isGameOver(board)) {
          alert('Game over!');
      }
  }
}

function calculateScore(board) {
  let score = 0;
  for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
          score += board[i][j];
      }
  }
  return score;
}

function newGame() {
  board = initializeBoard();
  addNumber(board);
  addNumber(board);
  renderBoard(board);
  updateScore(0);
}

let board = initializeBoard();
addNumber(board);
addNumber(board);
renderBoard(board);

updateScore(0);

document.addEventListener('keydown', handleKeyPress);

const newGameButton = document.getElementById('newGameButton');
newGameButton.addEventListener('click', newGame);

document.addEventListener('touchstart', handleTouchStart, false);  
document.addEventListener('touchmove', handleTouchMove, false);

let startX;
let startY;

function handleTouchStart(evt) {
    evt.preventDefault();

  startX = evt.touches[0].clientX;
  startY = evt.touches[0].clientY;
}

function handleTouchMove(evt) {

    evt.preventDefault();
  
    let key;
    if (deltaX < 0) {
      key = 'ArrowLeft';
    } else if (deltaX > 0) {
      key = 'ArrowRight';
    } else if (deltaY < 0) {
      key = 'ArrowUp';
    } else if (deltaY > 0) {
      key = 'ArrowDown';
    }
  
    handleKeyPress({key: key});
  }



