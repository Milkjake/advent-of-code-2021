const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().replace(/\r\n/g, '\n').split('\n');
// const input = fs.readFileSync('testinput.txt').toString().replace(/\r\n/g, '\n').split('\n');

(function () {
    let crabSubs = input[0].split(",").map(cs => parseInt(cs));
    let maxHorizontalPos = Math.max(...crabSubs);

    let lowestFuelCost = Infinity;

    for (let i = 0; i < maxHorizontalPos; i++) {
        let totalFuelCost = 0;
        for (let j = 0; j < crabSubs.length; j++) {
            // part 1
            totalFuelCost += Math.abs(i - crabSubs[j]);
            // part 2
            totalFuelCost += termialFunction(Math.abs(i - crabSubs[j]));
        }

        if (totalFuelCost < lowestFuelCost) { lowestFuelCost = totalFuelCost; };
    }

    console.log("The lowest fuel cost is: " + lowestFuelCost);
})();

function termialFunction(n) {
    let total = 0;

    for (let i = 1; i <= n; i++) {
        total += i;
    }

    return total;
}
