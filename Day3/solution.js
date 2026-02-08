const fs = require('fs');
const path = require('path');

function findMaxJoltage(line) {
    // We want to maximize the 2-digit number XY.
    // The digits are constrained: X must appear before Y in the line.

    // Strategy: 
    // Iterate possible first digits (X) from 9 down to 0.
    // If X exists in the line, find the maximum possible second digit (Y) that appears *after* any occurrence of X.
    // Wait, the rule is "turn on exactly two batteries". Their order in the line matters.
    // "digits on the batteries you've turned on".
    // "number formed by the digits on the batteries you've turned on." 
    // This implies if you pick battery at index i and battery at index j (i < j), the number is line[i]line[j].

    // So for a fixed X (value 9..0), we want to find if there is an occurrence of X at index i such that
    // there exists a Y at index j > i. To maximize XY, we want the largest possible Y.

    for (let x = 9; x >= 0; x--) {
        const xStr = x.toString();
        // Check if X is in the line at all
        // We need to check ALL occurrences of X to see the best possible Y following it.
        // Actually, we only need the *first* X to maximize the "range" of available Ys?
        // No, if the line is "191", and we check X=1.
        // First '1' is at index 0. Followers: '9', '1'. Max Y is '9'. Result 19.
        // Second '1' is at index 2. Followers: none.
        // Best is 19.

        // Wait, if line is "919", and we check X=9.
        // X=9 at index 0. Follower '1', '9'. Max Y=9. Result 99.
        // So yes, finding the *first* occurrence of X gives us the most remaining string,
        // and thus the best chance to find the largest Y?
        // YES. Any Y available to a later X is also available to an earlier X (because j > i_later > i_earlier).
        // So we only need to find the FIRST index of X.

        const firstIdx = line.indexOf(xStr);
        if (firstIdx !== -1) {
            // X is found. Now find the max digit in the substring after it.
            const remaining = line.substring(firstIdx + 1);
            if (remaining.length === 0) {
                // X is at the end, can't be the first digit.
                continue;
            }

            // Find max digit in remaining
            let maxY = -1;
            for (let y = 9; y >= 0; y--) {
                if (remaining.includes(y.toString())) {
                    maxY = y;
                    break;
                }
            }

            if (maxY !== -1) {
                // Found the best Y for this X.
                // Since we iterate X from 9 down, this is globally optimal.
                return parseInt(xStr + maxY.toString(), 10);
            }
        }
    }
    return 0; // Should not happen given problem constraints
}

function solve() {
    try {
        const inputPath = path.join(__dirname, 'input.txt');
        const input = fs.readFileSync(inputPath, 'utf8').trim();
        const lines = input.split(/\r?\n/);

        let totalSum = 0;

        // Example check
        const examples = [
            "987654321111111", // -> 98 (X=9, Y=8)
            "811111111111119", // -> 89 (X=8, Y=9)
            "234234234234278", // -> 78 (X=7, Y=8)
            "818181911112111"  // -> 92 (X=9, Y=2)
        ];

        console.log("Running examples...");
        let exampleSum = 0;
        for (const line of examples) {
            const val = findMaxJoltage(line);
            console.log(`${line} -> ${val}`);
            exampleSum += val;
        }
        console.log(`Example Sum: ${exampleSum} (Expected 357)`);

        console.log("\nProcessing input...");
        for (const line of lines) {
            if (line.trim().length === 0) continue;
            const val = findMaxJoltage(line.trim());
            totalSum += val;
        }

        console.log(`Total Output Joltage: ${totalSum}`);

    } catch (err) {
        console.error("Error:", err);
    }
}

solve();
