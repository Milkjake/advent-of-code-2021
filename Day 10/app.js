const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().replace(/\r\n/g, '\n').split('\n');
// const input = fs.readFileSync('testinput.txt').toString().replace(/\r\n/g, '\n').split('\n');

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
    const completionCharPointMap = new Map();

    completionCharPointMap.set(")", 1);
    completionCharPointMap.set("]", 2);
    completionCharPointMap.set("}", 3);
    completionCharPointMap.set(">", 4);

    const incompleteNavSubsystem = navSubsystem.filter((_, idx) => !corruptedLines.includes(idx));

    let totalLineCompletionScores = [];

    for (let i = 0; i < incompleteNavSubsystem.length; i++) {
        let stack = [];
        let current;
        let score = 0;

        for (let j = 0; j < incompleteNavSubsystem[i].length; j++) {
            current = incompleteNavSubsystem[i][j];

            if (current === '(' || current === '[' || current === "{" || current === "<") {
                stack.push(current);

            } else if (current === ')' || current === ']' || current === "}" || current === ">") {
                stack.pop();
            }
        }

        let autoCompleteString = "";
        for (const s of stack.reverse()) {
            autoCompleteString += matchLookupMap.get(s);
        }

        for (const closingChar of autoCompleteString) {
            score *= 5;
            score += completionCharPointMap.get(closingChar);
        }

        totalLineCompletionScores.push(score);
    }

    totalLineCompletionScores = totalLineCompletionScores.sort((a, b) => a - b);
    console.log(totalLineCompletionScores[Math.floor(totalLineCompletionScores.length / 2)]);

})();
