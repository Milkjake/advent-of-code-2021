const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().replace(/\r\n/g, '\n').split('\n');

(function () {
    let horizontalPos = 0;
    let depth = 0;
    let aim = 0;

    for (let i = 0; i < input.length; i++) {
        const [direction, value] = input[i].split(" ");
        const intVal = parseInt(value);

        // part 1
        if (direction === "forward") { horizontalPos += intVal; }

        if (direction === "up") { depth -= intVal; }

        if (direction === "down") { depth += intVal; }

        // part 2
        if (direction === "forward") { horizontalPos += intVal; depth += aim * intVal; }

        if (direction === "up") { aim -= intVal; }

        if (direction === "down") { aim += intVal; }
    }

    console.log(horizontalPos * depth);
})();
