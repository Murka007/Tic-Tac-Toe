export function isSolved(board) {
    board = board.join("-").replace(/,/g, "");
    if (/222|2..2..2|2...2...2|2....2....2/.test(board)) return 2
    if (/111|1..1..1|1...1...1|1....1....1/.test(board)) return 1;
    if (/0/.test(board)) return 0;
    return -1;
}

export function getEmptyCells(board) {
    const cells = [];
    for (let i=0;i<board.length;i++) {
        for (let b=0;b<board[i].length;b++) {
            if (board[i][b] === 0) {
                cells.push([i, b]);
            }
        }
    }
    return cells;
}


function getRow(row) {
    return [[row, 0], [row, 1], [row, 2]];
}
function getColumn(column) {
    return [[0, column], [1, column], [2, column]];
}
export function getWinIndexes(board) {
    const winIndexes = [];

    // Find vertical and horizontal winner cells
    for (let i=0;i<board.length;i++) {
        if (board[i].every(a => a !== 0 && a === board[i][0])) {
            winIndexes.push(...getRow(i));
            break;
        } else if (board.every(a => a[i] !== 0 && a[i] === board[0][i])) {
            winIndexes.push(...getColumn(i));
            break;
        }
    }

    // Find diagonal winner cells
    if (!winIndexes.length) {
        if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
            winIndexes.push(...[[0, 0], [1, 1], [2, 2]]);
        } else if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
            winIndexes.push(...[[0, 2], [1, 1], [2, 0]]);
        }
    }

    return winIndexes;
}