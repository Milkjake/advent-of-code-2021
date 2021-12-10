const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().replace(/\r\n/g, '\n').split('\n');
// const input = fs.readFileSync('testinput.txt').toString().replace(/\r\n/g, '\n').split('\n');

class Point {
    constructor(x, y, val) {
        this.x = x;
        this.y = y;
        this.val = val;
    }
}

(function () {

    const heightMap = [...input];

    const lowPoints = getLowPoints(heightMap);

    // part 1
    const lowPointsTotal = lowPoints.reduce((acc, cur) => acc + cur.val, 0) + lowPoints.length;
    console.log(lowPointsTotal);

    // part 2
    const basins = getBasins(lowPoints, heightMap);

    let basinSizes = basins.map(basin => basin.length);
    basinSizes = basinSizes.sort((a, b) => b - a);
    console.log(basinSizes[0] * basinSizes[1] * basinSizes[2]);
})();

function getBasins(lowPoints, heightMap) {
    let basins = [];

    for (const lowPoint of lowPoints) {
        const { x, y } = lowPoint;

        const points = [{ xPos: x, yPos: y }];

        let basin = [];

        while (points.length > 0) {
            const { xPos, yPos } = points.shift();

            if (yPos < 0 || yPos > heightMap.length - 1) {
                continue;
            }

            if (xPos < 0 || xPos > heightMap[yPos].length - 1) {
                continue;
            }

            if (basin.some(b => b.x === xPos && b.y === yPos && b.val === heightMap[yPos][xPos])) {
                continue;
            }

            if (heightMap[yPos][xPos] === 9) {
                continue;
            }

            basin = [...basin, new Point(xPos, yPos, heightMap[yPos][xPos])];

            points.push({ xPos: xPos + 1, yPos });
            points.push({ xPos: xPos - 1, yPos });
            points.push({ xPos, yPos: yPos + 1 });
            points.push({ xPos, yPos: yPos - 1 });
        }

        basins = [...basins, basin];
    }

    return basins;
}

function getLowPoints(heightMap) {
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
            const point = new Point(j, i, heightMap[i][j]);

            if (i === 0 && j === 0) {
                // top left corner
                if (heightMap[i][j] < heightMap[i + 1][j] &&
                    heightMap[i][j] < heightMap[i][j + 1]) {
                    lowPoints = [...lowPoints, point];
                }
                continue;
            }

            if (i === 0 && j == heightMap[i].length - 1) {
                // top right corner
                if (heightMap[i][j] < heightMap[i + 1][j] &&
                    heightMap[i][j] < heightMap[i][j - 1]) {
                    lowPoints = [...lowPoints, point];
                }
                continue;
            }

            if (i === heightMap.length - 1 && j === 0) {
                // bottom left corner
                if (heightMap[i][j] < heightMap[i - 1][j] &&
                    heightMap[i][j] < heightMap[i][j + 1]) {
                    lowPoints = [...lowPoints, point];
                }
                continue;
            }

            if (i === heightMap.length - 1 && j === heightMap[i].length - 1) {
                // bottom right corner
                if (heightMap[i][j] < heightMap[i - 1][j] &&
                    heightMap[i][j] < heightMap[i][j - 1]) {
                    lowPoints = [...lowPoints, point];
                }
                continue;
            }

            if (i === 0) {
                // top row
                if (heightMap[i][j] < heightMap[i + 1][j] &&
                    heightMap[i][j] < heightMap[i][j + 1] &&
                    heightMap[i][j] < heightMap[i][j - 1]) {
                    lowPoints = [...lowPoints, point];
                }
                continue;
            }

            if (i === heightMap.length - 1) {
                // bottom row
                if (heightMap[i][j] < heightMap[i - 1][j] &&
                    heightMap[i][j] < heightMap[i][j + 1] &&
                    heightMap[i][j] < heightMap[i][j - 1]) {
                    lowPoints = [...lowPoints, point];
                }
                continue;
            }

            if (j === 0) {
                // left col
                if (heightMap[i][j] < heightMap[i + 1][j] &&
                    heightMap[i][j] < heightMap[i - 1][j] &&
                    heightMap[i][j] < heightMap[i][j + 1]) {
                    lowPoints = [...lowPoints, point];
                }
                continue;
            }

            if (j === heightMap[i].length - 1) {
                // right col
                if (heightMap[i][j] < heightMap[i + 1][j] &&
                    heightMap[i][j] < heightMap[i - 1][j] &&
                    heightMap[i][j] < heightMap[i][j - 1]) {
                    lowPoints = [...lowPoints, point];
                }
                continue;
            }

            if (heightMap[i][j] < heightMap[i + 1][j] &&
                heightMap[i][j] < heightMap[i - 1][j] &&
                heightMap[i][j] < heightMap[i][j + 1] &&
                heightMap[i][j] < heightMap[i][j - 1]) {
                lowPoints = [...lowPoints, point];
            }
        }
    }

    return lowPoints;
}
