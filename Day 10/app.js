const fs = require('fs');

// const input = fs.readFileSync('input.txt').toString().replace(/\r\n/g, '\n').split('\n');
const input = fs.readFileSync('testinput.txt').toString().replace(/\r\n/g, '\n').split('\n');

(function () {

    const navSubsystem = [...input];

    const matchLookupMap = new Map();
    matchLookupMap.set("(", ")");
    matchLookupMap.set("[", "]");
    matchLookupMap.set("{", "}");
    matchLookupMap.set("<", ">");

    // part 1
    const illegalCharPointMap = new Map();

    illegalCharPointMap.set(")", 3);
    illegalCharPointMap.set("]", 57);
    illegalCharPointMap.set("}", 1197);
    illegalCharPointMap.set(">", 25137);

    let illegalChars = [], corruptedLines = [];

    for (let i = 0; i < navSubsystem.length; i++) {
        let stack = [];
        let current;

        for (let j = 0; j < navSubsystem[i].length; j++) {
            current = navSubsystem[i][j];

            if (current === '(' || current === '[' || current === "{" || current === "<") {
                stack.push(current);

            } else if (current === ')' || current === ']' || current === "}" || current === ">") {
                const lastBracket = stack.pop();

                if (matchLookupMap.get(lastBracket) !== current) {
                    illegalChars.push(current);
                    corruptedLines.push(i);
                }
            }
        }
    }

    const illegalCharsGrouped = illegalChars.reduce((total, value) => {
        total[value] = (total[value] || 0) + 1;
        return total;
    }, {});

    const totalSyntaxErrorScore = Object.entries(illegalCharsGrouped)
        .reduce((acc, [key, val]) => acc + illegalCharPointMap.get(key) * val, 0);

    console.log(totalSyntaxErrorScore);

    // part 2
    const incompleteCharPointMap = new Map();

    incompleteCharPointMap.set(")", 1);
    incompleteCharPointMap.set("]", 2);
    incompleteCharPointMap.set("}", 3);
    incompleteCharPointMap.set(">", 4);

    const incompleteNavSubsystem = navSubsystem.filter((_, idx) => corruptedLines.includes(idx));

    let totalLineCompletionScores = [];

    for (const ins of incompleteNavSubsystem) {
        let totalScore = 0;
    }

    totalLineCompletionScores = totalLineCompletionScores.sort((a, b) => a - b);
    console.log(totalLineCompletionScores[totalLineCompletionScores.length / 2]);
})();
