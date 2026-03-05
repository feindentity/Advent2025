const fs = require('fs');
const path = require('path');

function solveWorksheet(input) {
    const lines = input.split(/\r?\n/);

    // Remove trailing empty lines
    while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
        lines.pop();
    }

    if (lines.length < 2) return 0;

    const maxWidth = Math.max(...lines.map(l => l.length));
    const paddedLines = lines.map(l => l.padEnd(maxWidth, ' '));

    // The last row is the operator row; the rest contain numbers
    const opRow = paddedLines[paddedLines.length - 1];
    const numRows = paddedLines.slice(0, paddedLines.length - 1);

    // A separator column is one where every row has a space character
    const isSep = new Array(maxWidth).fill(true);
    for (let c = 0; c < maxWidth; c++) {
        for (const line of paddedLines) {
            if (line[c] !== ' ') {
                isSep[c] = false;
                break;
            }
        }
    }

    // Group consecutive non-separator columns into per-problem column ranges [start, end]
    const problems = [];
    let start = -1;
    for (let c = 0; c <= maxWidth; c++) {
        if (c === maxWidth || isSep[c]) {
            if (start !== -1) {
                problems.push([start, c - 1]);
                start = -1;
            }
        } else {
            if (start === -1) start = c;
        }
    }

    let grandTotal = 0;

    for (const [s, e] of problems) {
        const numbers = numRows
            .map(row => row.slice(s, e + 1).trim())
            .filter(t => t !== '')
            .map(Number);

        const op = opRow.slice(s, e + 1).trim();

        if (numbers.length === 0 || (op !== '+' && op !== '*')) continue;

        const result = op === '+'
            ? numbers.reduce((a, b) => a + b, 0)
            : numbers.reduce((a, b) => a * b, 1);

        grandTotal += result;
    }

    return grandTotal;
}

function solveWorksheetPart2(input) {
    const lines = input.split(/\r?\n/);

    while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
        lines.pop();
    }

    if (lines.length < 2) return 0;

    const maxWidth = Math.max(...lines.map(l => l.length));
    const paddedLines = lines.map(l => l.padEnd(maxWidth, ' '));

    const opRow = paddedLines[paddedLines.length - 1];
    const numRows = paddedLines.slice(0, paddedLines.length - 1);

    const isSep = new Array(maxWidth).fill(true);
    for (let c = 0; c < maxWidth; c++) {
        for (const line of paddedLines) {
            if (line[c] !== ' ') {
                isSep[c] = false;
                break;
            }
        }
    }

    const problems = [];
    let start = -1;
    for (let c = 0; c <= maxWidth; c++) {
        if (c === maxWidth || isSep[c]) {
            if (start !== -1) {
                problems.push([start, c - 1]);
                start = -1;
            }
        } else {
            if (start === -1) start = c;
        }
    }

    let grandTotal = 0;

    // Process problems right-to-left
    for (let pi = problems.length - 1; pi >= 0; pi--) {
        const [s, e] = problems[pi];
        const op = opRow.slice(s, e + 1).trim();

        if (op !== '+' && op !== '*') continue;

        const numbers = [];
        // Read character columns right-to-left within the problem
        for (let c = e; c >= s; c--) {
            const digits = numRows
                .map(row => row[c])
                .filter(ch => ch !== ' ')
                .join('');
            if (digits.length > 0) {
                numbers.push(Number(digits));
            }
        }

        if (numbers.length === 0) continue;

        const result = op === '+'
            ? numbers.reduce((a, b) => a + b, 0)
            : numbers.reduce((a, b) => a * b, 1);

        grandTotal += result;
    }

    return grandTotal;
}

// Verify with the example from the puzzle description
function runExample() {
    const exampleInput =
        '123 328  51 64 \n' +
        ' 45 64  387 23 \n' +
        '  6 98  215 314\n' +
        '*   +   *   +  ';

    const result = solveWorksheet(exampleInput);
    const expected = 4277556;

    if (result === expected) {
        console.log(`Part 1 Example: PASS (grand total = ${result})`);
    } else {
        console.log(`Part 1 Example: FAIL (got ${result}, expected ${expected})`);
    }

    const result2 = solveWorksheetPart2(exampleInput);
    const expected2 = 3263827;

    if (result2 === expected2) {
        console.log(`Part 2 Example: PASS (grand total = ${result2})`);
    } else {
        console.log(`Part 2 Example: FAIL (got ${result2}, expected ${expected2})`);
    }
}

function solve() {
    runExample();

    try {
        const inputPath = path.join(__dirname, 'input.txt');
        const input = fs.readFileSync(inputPath, 'utf8');

        if (input.trim().length === 0) {
            console.log('input.txt is empty — add your puzzle input to get the answer.');
            return;
        }

        const answer = solveWorksheet(input);
        console.log(`Part 1 Answer: ${answer}`);

        const answer2 = solveWorksheetPart2(input);
        console.log(`Part 2 Answer: ${answer2}`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('input.txt not found — create Day6/input.txt with your puzzle input.');
        } else {
            console.error('Error reading input:', err.message);
        }
    }
}

solve();
