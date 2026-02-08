const fs = require('fs');
const path = require('path');

// Helper function to check if a number is "invalid" (repeated sequence)
function isInvalidID(numString) {
    // If the length is odd, it CANNOT be a sequence repeated twice.
    // Explanation: A repeated sequence (like "123" repeated to "123123") 
    // always has a length equal to 2 * length_of_sequence. 
    // Any number multiplied by 2 is even. 
    // Therefore, any string with odd length cannot be a repeated sequence.
    if (numString.length % 2 !== 0) {
        return false;
    }
    
    const halfLen = numString.length / 2;
    const firstHalf = numString.substring(0, halfLen);
    const secondHalf = numString.substring(halfLen);
    
    return firstHalf === secondHalf;
}

function solve() {
    try {
        const inputPath = path.join(__dirname, 'input.txt');
        const input = fs.readFileSync(inputPath, 'utf8').trim();

        // The input is a list of ranges separated by commas
        // Example: 18623-26004,226779-293422,...
        const ranges = input.split(',');
        
        let totalSum = 0n; // Using BigInt for safety with large numbers
        const invalidIDs = []; 

        console.log(`Processing ${ranges.length} ranges...`);

        for (const range of ranges) {
            const parts = range.split('-');
            const start = parseInt(parts[0], 10);
            const end = parseInt(parts[1], 10);
            
            for (let i = start; i <= end; i++) {
                // Convert to string once
                const str = i.toString();
                if (isInvalidID(str)) {
                    invalidIDs.push(i);
                    totalSum += BigInt(i);
                }
            }
        }

        console.log(`Found ${invalidIDs.length} invalid IDs.`);
        if (invalidIDs.length > 0) {
            console.log('First 5 examples:', invalidIDs.slice(0, 5));
        }
        console.log('Sum of all invalid IDs:', totalSum.toString());

    } catch (err) {
        console.error("Error:", err);
    }
}

solve();
