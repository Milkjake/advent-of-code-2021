const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().replace(/\r\n/g, '\n').split('\n');

(function () {
    // part1(input);
    part2(input);
})();

function part1(input) {
    let bingoBoards = [...input];
    const bingoCalls = bingoBoards.shift().split(",");

    let indexOfWinningBoard;
    let lastNumber;

    bingoBoards = bingoBoards.filter(row => row !== '');
    bingoBoards = bingoBoards.reduce((board, item, index) => {
        const chunkIndex = Math.floor(index / 5);

        if (!board[chunkIndex]) {
            board[chunkIndex] = [];
        }

        board[chunkIndex].push(item);

        return board;
    }, [])

    for (let i = 0; i < bingoBoards.length; i++) {
        bingoBoards[i] = bingoBoards[i].map(row => row.split(' ').filter(num => num !== ''));
    }

    for (let bingoNumber of bingoCalls) {
        for (let i = 0; i < bingoBoards.length; i++) {
            for (let j = 0; j < bingoBoards[i].length; j++) {
                let xCount = 0;
                for (let k = 0; k < bingoBoards[i][j].length; k++) {
                    if (bingoBoards[i][j][k] === bingoNumber) {
                        bingoBoards[i][j][k] = 'X';
                    }

                    if (bingoBoards[i][j][k] === 'X') { xCount++ };
                }
                if (xCount === 5) {
                    indexOfWinningBoard = i;
                    lastNumber = bingoNumber;
                }
            }
            if (indexOfWinningBoard && lastNumber) { break; }

            let transposedBoard = bingoBoards[i].reduce((prev, next) => next.map((item, i) =>
                (prev[i] || []).concat(next[i])
            ), []);

            for (let j = 0; j < transposedBoard.length; j++) {
                let yCount = 0;
                for (let k = 0; k < transposedBoard[j].length; k++) {
                    if (transposedBoard[j][k] === 'X') { yCount++ };
                }
                if (yCount === 5) {
                    indexOfWinningBoard = i;
                    lastNumber = bingoNumber;
                }
            }

            if (indexOfWinningBoard && lastNumber) { break; }
        }
        if (indexOfWinningBoard && lastNumber) { break; }
    }

    let winningBoard = [].concat(...bingoBoards[indexOfWinningBoard]);
    winningBoard = winningBoard.filter(val => val !== 'X');

    let sumOfWinningBoard = winningBoard.reduce((acc, cur) => {
        if (cur === 'X') { return acc };

        return acc + parseInt(cur);
    }, 0);

    console.log(sumOfWinningBoard * lastNumber);
}

function part2(input) {
    let bingoBoards = [...input];
    const bingoCalls = bingoBoards.shift().split(",");

    let winningBoards = [];
    let indexOfLastWinningBoard;
    let lastNumber;

    bingoBoards = bingoBoards.filter(row => row !== '');
    bingoBoards = bingoBoards.reduce((board, item, index) => {
        const chunkIndex = Math.floor(index / 5);

        if (!board[chunkIndex]) {
            board[chunkIndex] = [];
        }

        board[chunkIndex].push(item);

        return board;
    }, [])

    for (let i = 0; i < bingoBoards.length; i++) {
        bingoBoards[i] = bingoBoards[i].map(row => row.split(' ').filter(num => num !== ''));
    }

    for (let bingoNumber of bingoCalls) {
        for (let i = 0; i < bingoBoards.length; i++) {
            for (let j = 0; j < bingoBoards[i].length; j++) {
                let xCount = 0;
                for (let k = 0; k < bingoBoards[i][j].length; k++) {
                    if (bingoBoards[i][j][k] === bingoNumber) {
                        bingoBoards[i][j][k] = 'X';
                    }

                    if (bingoBoards[i][j][k] === 'X') { xCount++ };
                }
                if (xCount === 5) {
                    if (!winningBoards.includes(i)) {
                        if (winningBoards.length === bingoBoards.length - 1) {
                            indexOfLastWinningBoard = i;
                            lastNumber = bingoNumber;
                        } else {
                            winningBoards.push(i);
                        }
                    }
                }
            }
            if (indexOfLastWinningBoard && lastNumber) { break; }

            let transposedBoard = bingoBoards[i].reduce((prev, next) => next.map((item, i) =>
                (prev[i] || []).concat(next[i])
            ), []);

            for (let j = 0; j < transposedBoard.length; j++) {
                let yCount = 0;
                for (let k = 0; k < transposedBoard[j].length; k++) {
                    if (transposedBoard[j][k] === 'X') { yCount++ };
                }
                if (yCount === 5) {
                    if (!winningBoards.includes(i)) {
                        if (winningBoards.length === bingoBoards.length - 1) {
                            indexOfLastWinningBoard = i;
                            lastNumber = bingoNumber;
                        } else {
                            winningBoards.push(i);
                        }
                    }
                }
            }

            if (indexOfLastWinningBoard && lastNumber) { break; }
        }
        if (indexOfLastWinningBoard && lastNumber) { break; }
    }

    let winningBoard = [].concat(...bingoBoards[indexOfLastWinningBoard]);
    winningBoard = winningBoard.filter(val => val !== 'X');

    let sumOfWinningBoard = winningBoard.reduce((acc, cur) => {
        if (cur === 'X') { return acc };

        return acc + parseInt(cur);
    }, 0);

    console.log(sumOfWinningBoard * lastNumber);
}