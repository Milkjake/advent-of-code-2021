const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().replace(/\r\n/g, '\n').split('\n');

(function () {
    let numIncreased = 0;

    // part 1
    for (let i = 0; i < input.length - 1; i++) {
        if (parseInt(input[i]) < parseInt(input[i + 1])) {
            numIncreased++;
        }
    }

    // part 2
    for (let i = 0; i < input.length; i++) {
        if (i + 3 < input.length) {
            const group1 = parseInt(input[i]) + parseInt(input[i + 1]) + parseInt(input[i + 2]);
            const group2 = parseInt(input[i + 1]) + parseInt(input[i + 2]) + parseInt(input[i + 3]);


            if (group1 < group2) {
                numIncreased++;
            }
        }
    }

    console.log(numIncreased);
})();
