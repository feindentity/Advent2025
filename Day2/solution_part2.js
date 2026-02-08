const fs = require('fs');
const path = require('path');

// Helper function: Check if numString is made of a sub-sequence repeated >= 2 times
function isInvalidID_Part2(numString) {
    const len = numString.length;
    // The pattern length `L` must be at least 1 and at most half the length of the string
    // (because it must repeat at least twice).
    // Also, the total length must be divisible by `L`.

    for (let L = 1; L <= len / 2; L++) {
        if (len % L === 0) {
            const pattern = numString.substring(0, L);
            const repeatCount = len / L;

            // Check if repeating this pattern reconstruction leads to original string
            // An efficient way is using string repeat:
            if (pattern.repeat(repeatCount) === numString) {
                return true;
            }
        }
    }
    return false;
}

function solve() {
    try {
        const inputPath = path.join(__dirname, 'input.txt');
        const input = fs.readFileSync(inputPath, 'utf8').trim();
        const ranges = input.split(',');

        let totalSum = 0n;
        const invalidIDs = [];

        // --- Verification Block ---
        const testCases = [
            { id: "12341234", expected: true },
            { id: "123123123", expected: true },
            { id: "1212121212", expected: true },
            { id: "1111111", expected: true },
            { id: "565656", expected: true },
            { id: "12345", expected: false },
        ];
        console.log("Running self-tests...");
        for (const t of testCases) {
            const result = isInvalidID_Part2(t.id);
            if (result !== t.expected) {
                console.error(`FAILED test for ${t.id}. Expected ${t.expected}, got ${result}`);
            }
        }
        console.log("Self-tests complete.\n");
        // --------------------------

        console.log(`Processing ${ranges.length} ranges for Part 2...`);

        for (const range of ranges) {
            const parts = range.split('-');
            const start = parseInt(parts[0], 10);
            const end = parseInt(parts[1], 10);

            for (let i = start; i <= end; i++) {
                const str = i.toString();
                if (isInvalidID_Part2(str)) {
                    invalidIDs.push(i);
                    totalSum += BigInt(i);
                }
            }
        }

        console.log(`Found ${invalidIDs.length} invalid IDs (Part 2).`);
        if (invalidIDs.length > 0) {
            console.log('First 5 examples:', invalidIDs.slice(0, 5));
        }
        console.log('Sum of all invalid IDs (Part 2):', totalSum.toString());

    } catch (err) {
        console.error("Error:", err);
    }
}

solve();
