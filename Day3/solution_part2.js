const fs = require('fs');
const path = require('path');

function findMaxSubsequence(line, k) {
    if (line.length < k) {
        return 0n; // Should not happen based on problem description
    }

    let currentIdx = -1; // The index of the last selected digit
    let result = "";

    // We need to pick 'k' digits.
    for (let i = 0; i < k; i++) {
        const digitsNeededAfter = k - 1 - i;

        // Search window:
        // Start: currentIdx + 1 (next available char)
        // End: line.length - digitsNeededAfter (must leave enough chars)
        // The slice end in substring is exclusive, so we use line.length - digitsNeededAfter

        const startSearch = currentIdx + 1;
        const endSearch = line.length - digitsNeededAfter;

        if (startSearch >= endSearch) {
            // Should not happen if length check passed
            break;
        }

        // Find max digit in this window
        let bestDigit = -1;
        let bestDigitIdx = -1;

        // Iterate through the valid window
        // We want the largest digit. If tie, take the earliest one to maximize future options.
        for (let j = startSearch; j < endSearch; j++) {
            const digit = parseInt(line[j], 10);
            if (digit > bestDigit) {
                bestDigit = digit;
                bestDigitIdx = j;
                if (digit === 9) break; // Optimization: 9 is max possible
            }
        }

        // Append to result
        result += bestDigit.toString();
        currentIdx = bestDigitIdx;
    }

    return BigInt(result);
}

function solve() {
    try {
        const inputPath = path.join(__dirname, 'input.txt');
        const input = fs.readFileSync(inputPath, 'utf8').trim();
        const lines = input.split(/\r?\n/);

        let totalSum = 0n;

        // Example check
        const examples = [
            { line: "987654321111111", expected: 987654321111n },
            { line: "811111111111119", expected: 811111111119n },
            { line: "234234234234278", expected: 434234234278n },
            { line: "818181911112111", expected: 888911112111n }
        ];

        console.log("Running examples...");
        let exampleSum = 0n;
        for (const ex of examples) {
            const val = findMaxSubsequence(ex.line, 12);
            if (val !== ex.expected) {
                console.error(`Mismatch for ${ex.line}. Got ${val}, Expected ${ex.expected}`);
            } else {
                console.log(`${ex.line} -> ${val}`);
            }
            exampleSum += val;
        }
        const expectedExampleSum = 3121910778619n;
        console.log(`Example Sum: ${exampleSum} (Expected ${expectedExampleSum})`);

        if (exampleSum !== expectedExampleSum) {
            console.error("Example sum mismatch! Aborting.");
            return;
        }

        console.log("\nProcessing input...");
        for (const line of lines) {
            if (line.trim().length === 0) continue;
            // The input lines might be shorter than 12? 
            // The prompt says "batteries are each labeled...". 
            // "Now, you need to make the largest joltage by turning on exactly twelve batteries".
            // If a line has < 12 batteries, it's impossible. But we assume input is valid.
            const val = findMaxSubsequence(line.trim(), 12);
            totalSum += val;
        }

        console.log(`Total Output Joltage (Part 2): ${totalSum.toString()}`);

    } catch (err) {
        console.error("Error:", err);
    }
}

solve();
