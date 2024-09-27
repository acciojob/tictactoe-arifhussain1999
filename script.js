//your JS code here. If required.
document.getElementById('submit').addEventListener('click', function() {
    const player1 = document.getElementById('player-1').value;
    const player2 = document.getElementById('player-2').value;
    
    if (player1 && player2) {
        startGame(player1, player2);
    } else {
        alert('Please enter names for both players');
    }
});

function startGame(player1, player2) {
    document.getElementById('player-setup').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';
    
    let currentPlayer = player1;
    let isGameOver = false;
    const board = Array(9).fill(null);
    
    const messageDiv = document.querySelector('.message');
    messageDiv.textContent = `${currentPlayer}, you're up!`;
    
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            const index = this.id - 1;
            if (!board[index] && !isGameOver) {
                board[index] = currentPlayer === player1 ? 'X' : 'O';
                this.textContent = board[index];
                
                if (checkWinner(board)) {
                    messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
                    isGameOver = true;
                } else if (board.every(cell => cell)) {
                    messageDiv.textContent = 'It\'s a tie!';
                    isGameOver = true;
                } else {
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                    messageDiv.textContent = `${currentPlayer}, you're up!`;
                }
            }
        });
    });
}

function checkWinner(board) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];
    
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}
