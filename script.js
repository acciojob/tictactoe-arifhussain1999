// Get references to HTML elements
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const submitButton = document.getElementById('submit');
const gameBoard = document.getElementById('game-board');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let currentPlayer = 'X';
let players = { player1: '', player2: '' };
let board = Array(9).fill(null);

// Show the Tic Tac Toe board and update player names
submitButton.addEventListener('click', () => {
    const player1 = player1Input.value.trim();
    const player2 = player2Input.value.trim();

    if (player1 && player2) {
        players.player1 = player1;
        players.player2 = player2;
        document.getElementById('player-setup').style.display = 'none';
        gameBoard.style.display = 'block';
        messageDiv.textContent = `${players.player1}, you're up!`;
    } else {
        alert('Please enter names for both players.');
    }
});

// Handle cell click events for making moves
cells.forEach(cell => {
    cell.addEventListener('click', function () {
        const index = this.id - 1; // Cell IDs are 1-9, index is 0-8
        if (!board[index]) { // Ensure cell is empty before placing a mark
            board[index] = currentPlayer;
            this.textContent = currentPlayer === 'X' ? 'x' : 'o'; // Set cell content

            // Check for winner
            if (checkWinner()) {
                messageDiv.textContent = `${currentPlayer === 'X' ? players.player1 : players.player2} congratulations you won!`; // Updated winner message format
                disableBoard(); // Disable the board after a win
            } else {
                // Switch player
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                messageDiv.textContent = `${currentPlayer === 'X' ? players.player1 : players.player2}, you're up!`;
            }
        }
    });
});

// Check if a player has won
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Disable the board after a player wins
function disableBoard() {
    cells.forEach(cell => {
        cell.removeEventListener('click', arguments.callee);
    });
}
