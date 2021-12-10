const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().replace(/\r\n/g, '\n').split('\n');
// const input = fs.readFileSync('testinput.txt').toString().replace(/\r\n/g, '\n').split('\n');

(function () {
    const heightMap = [...input];

    for (let i = 0; i < heightMap.length; i++) {
        heightMap[i] = heightMap[i].split('');
    }

    for (let i = 0; i < heightMap.length; i++) {
        for (let j = 0; j < heightMap[i].length; j++) {
            heightMap[i][j] = parseInt(heightMap[i][j]);
        }
    }

    let lowPoints = [];

    for (let i = 0; i < heightMap.length; i++) {
        for (let j = 0; j < heightMap[i].length; j++) {
            if (i === 0 && j === 0) {
                // top left corner
                if (heightMap[i][j] < heightMap[i + 1][j] &&
                    heightMap[i][j] < heightMap[i][j + 1]) {
                    lowPoints = [...lowPoints, heightMap[i][j]];
                }
                continue;
            }

            if (i === 0 && j == heightMap[i].length - 1) {
                // top right corner
                if (heightMap[i][j] < heightMap[i + 1][j] &&
                    heightMap[i][j] < heightMap[i][j - 1]) {
                    lowPoints = [...lowPoints, heightMap[i][j]];
                }
                continue;
            }

            if (i === heightMap.length - 1 && j === 0) {
                // bottom left corner
                if (heightMap[i][j] < heightMap[i - 1][j] &&
                    heightMap[i][j] < heightMap[i][j + 1]) {
                    lowPoints = [...lowPoints, heightMap[i][j]];
                }
                continue;
            }

            if (i === heightMap.length - 1 && j === heightMap[i].length - 1) {
                // bottom right corner
                if (heightMap[i][j] < heightMap[i - 1][j] &&
                    heightMap[i][j] < heightMap[i][j - 1]) {
                    lowPoints = [...lowPoints, heightMap[i][j]];
                }
                continue;
            }

            if (i === 0) {
                // top row
                if (heightMap[i][j] < heightMap[i + 1][j] &&
                    heightMap[i][j] < heightMap[i][j + 1] &&
                    heightMap[i][j] < heightMap[i][j - 1]) {
                    lowPoints = [...lowPoints, heightMap[i][j]];
                }
                continue;
            }

            if (i === heightMap.length - 1) {
                // bottom row
                if (heightMap[i][j] < heightMap[i - 1][j] &&
                    heightMap[i][j] < heightMap[i][j + 1] &&
                    heightMap[i][j] < heightMap[i][j - 1]) {
                    lowPoints = [...lowPoints, heightMap[i][j]];
                }
                continue;
            }

            if (j === 0) {
                // left col
                if (heightMap[i][j] < heightMap[i + 1][j] &&
                    heightMap[i][j] < heightMap[i - 1][j] &&
                    heightMap[i][j] < heightMap[i][j + 1]) {
                    lowPoints = [...lowPoints, heightMap[i][j]];
                }
                continue;
            }

            if (j === heightMap[i].length - 1) {
                // right col
                if (heightMap[i][j] < heightMap[i + 1][j] &&
                    heightMap[i][j] < heightMap[i - 1][j] &&
                    heightMap[i][j] < heightMap[i][j - 1]) {
                    lowPoints = [...lowPoints, heightMap[i][j]];
                }
                continue;
            }

            if (heightMap[i][j] < heightMap[i + 1][j] &&
                heightMap[i][j] < heightMap[i - 1][j] &&
                heightMap[i][j] < heightMap[i][j + 1] &&
                heightMap[i][j] < heightMap[i][j - 1]) {
                lowPoints = [...lowPoints, heightMap[i][j]];
            }
        }
    }

    const lowPointsTotal = lowPoints.reduce((acc, cur) => acc + cur, 0) + lowPoints.length;
    console.log(lowPointsTotal);

    // TODO: part 2

})();
