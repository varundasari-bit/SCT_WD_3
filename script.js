
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    let cells = [];
    let currentPlayer = 'X';
    let gameActive = true;

    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    function createBoard() {
      board.innerHTML = '';
      cells = [];
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
        cells.push(cell);
      }
    }

    function handleClick(e) {
      const index = e.target.dataset.index;
      if (!gameActive || cells[index].textContent) return;

      cells[index].textContent = 'X';
      if (checkWin('X')) {
        status.textContent = 'You win!';
        gameActive = false;
        return;
      }
      if (isDraw()) {
        status.textContent = "It's a draw!";
        gameActive = false;
        return;
      }

      status.textContent = "Computer's turn...";
      setTimeout(computerMove, 500);
    }

    function computerMove() {
      if (!gameActive) return;

      const empty = cells.map((c, i) => c.textContent === '' ? i : null).filter(i => i !== null);

      
      for (let i of empty) {
        cells[i].textContent = 'O';
        if (checkWin('O')) {
          status.textContent = 'Computer wins!';
          gameActive = false;
          return;
        }
        cells[i].textContent = '';
      }

      
      for (let i of empty) {
        cells[i].textContent = 'X';
        if (checkWin('X')) {
          cells[i].textContent = 'O';
          if (checkWin('O')) {
            status.textContent = 'Computer wins!';
            gameActive = false;
            return;
          }
          if (isDraw()) {
            status.textContent = "It's a draw!";
            gameActive = false;
            return;
          }
          status.textContent = "Your turn (X)";
          return;
        }
        cells[i].textContent = '';
      }

     
      const random = empty[Math.floor(Math.random() * empty.length)];
      cells[random].textContent = 'O';

      if (checkWin('O')) {
        status.textContent = 'Computer wins!';
        gameActive = false;
      } else if (isDraw()) {
        status.textContent = "It's a draw!";
        gameActive = false;
      } else {
        status.textContent = "Your turn (X)";
      }
    }

    function checkWin(player) {
      return winPatterns.some(pattern =>
        pattern.every(index => cells[index].textContent === player)
      );
    }

    function isDraw() {
      return cells.every(cell => cell.textContent);
    }

    function resetGame() {
      currentPlayer = 'X';
      gameActive = true;
      status.textContent = "Your turn (X)";
      createBoard();
    }

    createBoard();
        
