const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().replace(/\r\n/g, '\n').split('\n');
// const input = fs.readFileSync('testinput.txt').toString().replace(/\r\n/g, '\n').split('\n');

(function () {
    // part1(input);
    part2(input);
})();

function part1(input) {
    let totalDigitCount = 0;

    for (let entry of input) {
        const [_, outputValue] = entry.split(' | ');

        for (let digit of outputValue.split(' ')) {
            if (digit.length === 2 || digit.length === 4 || digit.length === 3 || digit.length === 7)
                totalDigitCount++
        }
    }

    console.log(totalDigitCount);
}

function part2(input) {
    let grandTotal = 0;

    for (let entry of input) {
        let [signalPatterns, outputValue] = entry.split(' | ');
        let decipheredSegments = {};

        signalPatterns = signalPatterns.split(' ');
        outputValue = outputValue.split(' ');

        // find 1, 4, 7 and 8
        for (let signalPattern of signalPatterns) {
            const signalPatternLength = signalPattern.length;

            if (signalPatternLength === 2) {
                decipheredSegments = { ...decipheredSegments, [signalPattern]: 1 }
            }

            if (signalPatternLength === 4) {
                decipheredSegments = { ...decipheredSegments, [signalPattern]: 4 }
            }

            if (signalPatternLength === 3) {
                decipheredSegments = { ...decipheredSegments, [signalPattern]: 7 }
            }

            if (signalPatternLength === 7) {
                decipheredSegments = { ...decipheredSegments, [signalPattern]: 8 }
            }
        }

        // find 0, 6 and 9
        for (let signalPattern of signalPatterns) {
            const signalPatternLength = signalPattern.length;

            if (signalPatternLength === 6) {
                const fourSegment = getKeyByValue(decipheredSegments, 4);
                const sevenSegment = getKeyByValue(decipheredSegments, 7);

                if ([...fourSegment].every(sg => [...signalPattern].includes(sg)) && [...sevenSegment].every(sg => [...signalPattern].includes(sg))) {
                    decipheredSegments = { ...decipheredSegments, [signalPattern]: 9 };
                } else {
                    if ([...sevenSegment].every(sg => [...signalPattern].includes(sg))) {
                        decipheredSegments = { ...decipheredSegments, [signalPattern]: 0 };
                    } else {
                        decipheredSegments = { ...decipheredSegments, [signalPattern]: 6 };
                    }
                }
            }
        }

        // find 5
        for (let signalPattern of signalPatterns) {
            const signalPatternLength = signalPattern.length;

            if (signalPatternLength === 5) {
                const sixSegment = getKeyByValue(decipheredSegments, 6);

                if ([...signalPattern].every(sg => [...sixSegment].includes(sg))) {
                    decipheredSegments = { ...decipheredSegments, [signalPattern]: 5 };
                }
            }
        }

        // find 3
        for (let signalPattern of signalPatterns) {
            const signalPatternLength = signalPattern.length;

            if (signalPatternLength === 5) {
                const sevenSegment = getKeyByValue(decipheredSegments, 7);

                if ([...sevenSegment].every(sg => [...signalPattern].includes(sg))) {
                    decipheredSegments = { ...decipheredSegments, [signalPattern]: 3 };
                }
            }
        }

        // find 2
        for (let signalPattern of signalPatterns) {
            const signalPatternLength = signalPattern.length;

            if (signalPatternLength === 5 && !decipheredSegments[signalPattern]) {
                decipheredSegments = { ...decipheredSegments, [signalPattern]: 2 };
            }
        }

        let totalStr = "";

        for (let digit of outputValue) {
            for (const [key, value] of Object.entries(decipheredSegments)) {
                if (digit.length === key.length) {
                    if ([...digit].every(d => [...key].includes(d))) {
                        totalStr += value;
                    }
                }
            }
        }

        grandTotal += parseInt(totalStr);
    }

    console.log(grandTotal);
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}