const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().replace(/\r\n/g, '\n').split('\n');

(function () {
    part1(input);
    part2(input);
})();

function part1(input) {
    let gammaRate = "", epsilonRate = "";

    const numberLength = input[0].length;

    // i keeps track of number index
    for (let i = 0; i < numberLength; i++) {
        let ones = 0, zeros = 0;

        // iterate through each number
        input.forEach(element => {
            if (element.charAt(i) === "1") { ones++ } else { zeros++ }
        });

        // calculate most common/least common bits
        if (ones > zeros) { gammaRate += "1"; epsilonRate += "0" } else { gammaRate += "0"; epsilonRate += "1" }
    }

    // calculate power consumption of the submarine
    console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));
};

function part2(input) {
    let oxygenGeneratorRating = "", cO2ScrubberRating = "";

    const numberLength = input[0].length;

    let oxygenGeneratorRatingList = [...input];
    let cO2ScrubberRatingList = [...input];

    for (let i = 0; i < numberLength; i++) {
        if (oxygenGeneratorRatingList.length > 1) {
            let ones = 0, zeros = 0, mostCommonBit = "";

            oxygenGeneratorRatingList.forEach(element => {
                if (element.charAt(i) === "1") { ones++ } else { zeros++ }
            });

            if (ones > zeros || ones === zeros) { mostCommonBit = "1"; } else { mostCommonBit = "0"; };

            oxygenGeneratorRatingList = oxygenGeneratorRatingList.filter(element => {
                return element.charAt(i) === mostCommonBit;
            });
        }
    }

    for (let i = 0; i < numberLength; i++) {
        if (cO2ScrubberRatingList.length > 1) {
            let ones = 0, zeros = 0, leastCommonBit = "";

            cO2ScrubberRatingList.forEach(element => {
                if (element.charAt(i) === "1") { ones++ } else { zeros++ }
            });

            if (ones > zeros || ones === zeros) { leastCommonBit = "0"; } else { leastCommonBit = "1"; };

            cO2ScrubberRatingList = cO2ScrubberRatingList.filter(element => {
                return element.charAt(i) === leastCommonBit;
            });
        }
    }

    oxygenGeneratorRating = oxygenGeneratorRatingList[0];
    cO2ScrubberRating = cO2ScrubberRatingList[0];

    // calculate life support rating
    console.log(parseInt(oxygenGeneratorRating, 2) * parseInt(cO2ScrubberRating, 2));
};
