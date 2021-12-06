const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().replace(/\r\n/g, '\n').split('\n');
// const input = fs.readFileSync('testinput.txt').toString().replace(/\r\n/g, '\n').split('\n');

(function () {
    let firstLanternFish = input[0].split(',').map(lf => parseInt(lf));

    // part 1
    // const numDays = 80;
    // part 2
    const numDays = 256;

    const lanternFishGrowth = new Array(numDays + 1).fill(0);

    for (let flf of firstLanternFish) {
        let lf = flf;
        for (let i = 1; i < lanternFishGrowth.length; i++) {
            if (lf === 0) {
                lf = 6;
                // add new fish on day
                lanternFishGrowth[i] = lanternFishGrowth[i] + 1;
            } else {
                lf--;
            }
        }
    }

    // add first fish to total
    let totalFish = firstLanternFish.length;

    for (let i = 1; i < lanternFishGrowth.length; i++) {
        const numNewFishOnDay = lanternFishGrowth[i];

        if (numNewFishOnDay > 0) {
            // calculate how many additional fish will be added in future
            let newFishValue = 8;
            for (let j = i + 1; j < lanternFishGrowth.length; j++) {
                if (newFishValue === 0) {
                    newFishValue = 6;
                    // add new fish on day
                    lanternFishGrowth[j] = lanternFishGrowth[j] + numNewFishOnDay;
                } else {
                    newFishValue--;
                }
            }
        }
    }

    totalFish += lanternFishGrowth.reduce((acc, cur) => acc + cur, 0);

    console.log("Total fish after " + numDays + (numDays > 1 ? " days: " : " day: ") + totalFish);
})();
