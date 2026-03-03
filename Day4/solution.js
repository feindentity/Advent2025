const fs = require('fs');
const path = require('path');

const DIRECTIONS = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],          [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1]
];

function countAccessibleRolls(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let accessibleCount = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] !== '@') continue;

            let neighborRolls = 0;
            for (const [dr, dc] of DIRECTIONS) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '@') {
                    neighborRolls++;
                }
            }

            if (neighborRolls < 4) {
                accessibleCount++;
            }
        }
    }

    return accessibleCount;
}

function parseGrid(input) {
    return input.split(/\r?\n/).filter(line => line.trim().length > 0).map(line => line.split(''));
}

// Verify with the example from the puzzle
function runExample() {
    const exampleInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

    const grid = parseGrid(exampleInput);
    const result = countAccessibleRolls(grid);
    const expected = 13;

    if (result === expected) {
        console.log(`Example: PASS (${result} accessible rolls)`);
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

        const grid = parseGrid(input);
        const answer = countAccessibleRolls(grid);
        console.log(`Answer: ${answer}`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('input.txt not found — create Day4/input.txt with your puzzle input.');
        } else {
            console.error('Error reading input:', err.message);
        }
    }
}

solve();
