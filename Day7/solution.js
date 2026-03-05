const fs = require('fs');
const path = require('path');

function solveManifold(input) {
    const lines = input.split(/\r?\n/);

    // Remove trailing empty lines
    while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
        lines.pop();
    }

    const rows = lines.length;
    const cols = lines[0].length;

    // Find S position
    let sRow = -1, sCol = -1;
    outer:
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (lines[r][c] === 'S') {
                sRow = r;
                sCol = c;
                break outer;
            }
        }
    }

    // BFS simulation: each beam is represented by its (startRow, col)
    // All beams move downward from their starting position.
    // Two beams at the same starting position are identical — track visited starts.
    // Track which splitters have been hit (each counts once regardless of how many beams reach it).

    const visitedStarts = new Set();
    const hitSplitters = new Set();
    const queue = [[sRow, sCol]];

    while (queue.length > 0) {
        const [r, c] = queue.shift();

        const key = `${r},${c}`;
        if (visitedStarts.has(key)) continue;
        if (c < 0 || c >= cols) continue;
        visitedStarts.add(key);

        // Move beam downward from row r, column c
        for (let nr = r; nr < rows; nr++) {
            const cell = lines[nr][c];
            if (cell === '^') {
                const splitterKey = `${nr},${c}`;
                hitSplitters.add(splitterKey);

                // Spawn new beams to the left and right of the splitter
                const leftKey = `${nr},${c - 1}`;
                const rightKey = `${nr},${c + 1}`;
                if (c - 1 >= 0 && !visitedStarts.has(leftKey)) {
                    queue.push([nr, c - 1]);
                }
                if (c + 1 < cols && !visitedStarts.has(rightKey)) {
                    queue.push([nr, c + 1]);
                }
                break;
            }
            // '.' and 'S' are passable — continue downward
        }
    }

    return hitSplitters.size;
}

if (require.main === module) {
    const inputPath = path.join(__dirname, 'input.txt');
    const input = fs.readFileSync(inputPath, 'utf8');
    console.log(solveManifold(input));
}

module.exports = { solveManifold };
