document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const miniBoard = document.getElementById('miniBoard');
    const drawButton = document.getElementById('drawButton');
    const resetTablesButton = document.getElementById('resetTablesButton'); 
    let drawnNumbers = new Set();
    let miniBoardNumbers = new Set();

    function createBoard() {
        board.innerHTML = ''; 
        drawnNumbers.clear(); 

        for (let i = 1; i <= 76; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = i;
            cell.id = `cell-${i}`;
            board.appendChild(cell);
        }
    }

    function createMiniBoard() {
        miniBoard.innerHTML = ''; 
        miniBoardNumbers.clear(); 

        while (miniBoardNumbers.size < 24) {
            let number = Math.floor(Math.random() * 76) + 1;
            if (!miniBoardNumbers.has(number)) {
                miniBoardNumbers.add(number);
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.textContent = number;
                cell.id = `mini-cell-${number}`;
                miniBoard.appendChild(cell);
            }
        }
    }

    function resetTables() {
        createBoard(); 
        createMiniBoard(); 
    }

    resetTablesButton.addEventListener('click', resetTables);

    createBoard();
    createMiniBoard();

    drawButton.addEventListener('click', () => {
        if (drawnNumbers.size === 76) {
            alert("Tutti i numeri sono stati estratti!");
            return;
        }

        let number;
        do {
            number = Math.floor(Math.random() * 76) + 1;
        } while (drawnNumbers.has(number));

        drawnNumbers.add(number);
        const mainCell = document.getElementById(`cell-${number}`);
        const miniCell = document.getElementById(`mini-cell-${number}`);
        if (mainCell) mainCell.classList.add('highlighted');
        if (miniCell) miniCell.classList.add('highlighted');
    });
});