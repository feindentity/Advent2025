const fs = require('fs');
const path = require('path');

function parseInput(input) {
    const parts = input.split(/\r?\n\r?\n/);
    const ranges = parts[0].trim().split(/\r?\n/).map(line => {
        const [lo, hi] = line.trim().split('-').map(Number);
        return [lo, hi];
    });
    const ids = parts[1].trim().split(/\r?\n/).map(line => Number(line.trim()));
    return { ranges, ids };
}

function isFresh(id, ranges) {
    return ranges.some(([lo, hi]) => id >= lo && id <= hi);
}

function countFreshIngredients(input) {
    const { ranges, ids } = parseInput(input);
    return ids.filter(id => isFresh(id, ranges)).length;
}

// Verify with the example from the puzzle
function runExample() {
    const exampleInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

    const result = countFreshIngredients(exampleInput);
    const expected = 3;

    if (result === expected) {
        console.log(`Example: PASS (${result} fresh ingredient IDs)`);
    } else {
        console.log(`Example: FAIL (got ${result}, expected ${expected})`);
    }
}

function solve() {
    runExample();

    try {
        const inputPath = path.join(__dirname, 'input.txt');
        const input = fs.readFileSync(inputPath, 'utf8').trim();

        if (input.length === 0) {
            console.log('input.txt is empty — add your puzzle input to get the answer.');
            return;
        }

        const answer = countFreshIngredients(input);
        console.log(`Answer: ${answer}`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('input.txt not found — create Day5/input.txt with your puzzle input.');
        } else {
            console.error('Error reading input:', err.message);
        }
    }
}

solve();
