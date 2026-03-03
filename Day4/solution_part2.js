const fs = require('fs');
const path = require('path');

const DIRECTIONS = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],          [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1]
];

function countNeighborRolls(grid, r, c) {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    for (const [dr, dc] of DIRECTIONS) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '@') {
            count++;
        }
    }
    return count;
}

function totalRemovableRolls(grid) {
    let totalRemoved = 0;

    while (true) {
        const toRemove = [];
        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < grid[r].length; c++) {
                if (grid[r][c] === '@' && countNeighborRolls(grid, r, c) < 4) {
                    toRemove.push([r, c]);
                }
            }
        }

        if (toRemove.length === 0) break;

        for (const [r, c] of toRemove) {
            grid[r][c] = '.';
        }
        totalRemoved += toRemove.length;
    }

    return totalRemoved;
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
    const result = totalRemovableRolls(grid);
    const expected = 43;

    if (result === expected) {
        console.log(`Example: PASS (${result} total rolls removed)`);
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
        const answer = totalRemovableRolls(grid);
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
