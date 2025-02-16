//your JS code here. If required.
let player1, player2;
let currentPlayer = 'player1';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Grab HTML elements
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const submitButton = document.getElementById('submit');
const gameBoardElement = document.getElementById('gameBoard');
const messageElement = document.getElementById('message');
const cells = document.querySelectorAll('.cell');

// Event listener to start the game when player names are entered
submitButton.addEventListener('click', () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (player1 && player2) {
    // Show the game board
    document.getElementById('playerInput').style.display = 'none';
    gameBoardElement.classList.remove('hidden');
    
    // Update the message to Player 1's turn
    messageElement.textContent = `${player1}, you're up!`;

    // Initialize the game
    resetGame();
  } else {
    alert('Please enter names for both players.');
  }
});

// Handle a cell click
cells.forEach(cell => {
  cell.addEventListener('click', (event) => {
    const cellIndex = event.target.id - 1;
    
    // Only allow the cell to be clicked if it's empty
    if (gameBoard[cellIndex] === '' && gameActive) {
      gameBoard[cellIndex] = currentPlayer === 'player1' ? 'X' : 'O';
      event.target.textContent = currentPlayer === 'player1' ? 'X' : 'O';
      
      // Check for a winner
      if (checkWinner()) {
        messageElement.textContent = `${currentPlayer === 'player1' ? player1 : player2} congratulations you won!`;
        gameActive = false;
      } else {
        // Switch to the other player
        currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
        messageElement.textContent = `${currentPlayer === 'player1' ? player1 : player2}, you're up!`;
      }
    }
  });
});

// Reset the game
function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'player1';
  messageElement.textContent = `${player1}, you're up!`;
}

// Check if there is a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

