const fs = require('fs');
const path = require('path');

function parseRanges(input) {
    const parts = input.split(/\r?\n\r?\n/);
    return parts[0].trim().split(/\r?\n/).map(line => {
        const [lo, hi] = line.trim().split('-').map(Number);
        return [lo, hi];
    });
}

function countFreshIDs(ranges) {
    // Sort by lower bound, then merge overlapping/adjacent ranges
    const sorted = ranges.slice().sort((a, b) => a[0] - b[0]);
    const merged = [];
    for (const [lo, hi] of sorted) {
        if (merged.length === 0 || lo > merged[merged.length - 1][1] + 1) {
            merged.push([lo, hi]);
        } else {
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], hi);
        }
    }
    return merged.reduce((sum, [lo, hi]) => sum + (hi - lo + 1), 0);
}

function countFreshIngredientIDs(input) {
    const ranges = parseRanges(input);
    return countFreshIDs(ranges);
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

    const result = countFreshIngredientIDs(exampleInput);
    const expected = 14;

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

        const answer = countFreshIngredientIDs(input);
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
