const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().replace(/\r\n/g, '\n').split('\n');
// const input = fs.readFileSync('testinput.txt').toString().replace(/\r\n/g, '\n').split('\n');

(function () {
    let maxY = 0, maxX = 0;

    let lineSegments = input.reduce((acc, cur) => {
        let xAndY = cur.split(' -> ');
        let [x1Str, y1Str] = xAndY[0].split(',');
        let [x2Str, y2Str] = xAndY[1].split(',');

        let x1 = parseInt(x1Str), y1 = parseInt(y1Str), x2 = parseInt(x2Str), y2 = parseInt(y2Str);

        if (x1 > maxX) { maxX = x1; };
        if (x2 > maxX) { maxX = x2; };
        if (y1 > maxY) { maxY = y1; };
        if (y2 > maxY) { maxY = y2; };

        return [...acc, [[x1, y1], [x2, y2]]];
    }, []);

    // console.log(lineSegments);

    // console.log("Max X: " + maxX);
    // console.log("Max Y: " + maxY);

    let matrix = [];
    for (let i = 0; i <= maxX; i++) {
        matrix[i] = [];
        for (let j = 0; j <= maxY; j++) {
            matrix[i][j] = 0;
        }
    }

    for (let coordinates of lineSegments) {
        let [x1, y1] = coordinates[0];
        let [x2, y2] = coordinates[1];

        if (x1 === x2) {
            // vertical line
            let smallY = y1 < y2 ? y1 : y2;
            let bigY = y1 < y2 ? y2 : y1;
            for (let i = smallY; i <= bigY; i++) {
                matrix[i][x1] = matrix[i][x1] + 1;
            }
        } else if (y1 === y2) {
            // horizontal line
            let smallX = x1 < x2 ? x1 : x2;
            let bigX = x1 < x2 ? x2 : x1;
            for (let i = smallX; i <= bigX; i++) {
                matrix[y1][i] = matrix[y1][i] + 1;
            }
        } else {
            // part 2
            // diagonal line
            let smallY = y1 < y2 ? y1 : y2;
            let bigY = y1 < y2 ? y2 : y1;
            let x = y1 < y2 ? x1 : x2; // start point

            for (let i = smallY; i <= bigY; i++) {
                matrix[i][x] = matrix[i][x] + 1;

                x = y1 < y2 ? x1 < x2 ? x + 1 : x - 1 : x1 < x2 ? x - 1 : x + 1;
            }
        }
    }

    // for (let m of matrix) {
    //     console.log(m.toString());
    // }

    let numOverlappingPoints = matrix.reduce((acc, cur) => {
        return acc + cur.reduce((acc, cur) => {
            if (cur >= 2) {
                return acc + 1;
            }

            return acc;
        }, 0);
    }, 0);

    console.log(numOverlappingPoints);
})();
