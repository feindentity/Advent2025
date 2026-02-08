// Helper function: Check if numString is made of a sub-sequence repeated >= 2 times
function isInvalidID_Part2(numString) {
    const len = numString.length;
    for (let L = 1; L <= len / 2; L++) {
        if (len % L === 0) {
            const pattern = numString.substring(0, L);
            const repeatCount = len / L;
            if (pattern.repeat(repeatCount) === numString) {
                return true;
            }
        }
    }
    return false;
}

const testCases = [
    { id: "12341234", expected: true },
    { id: "123123123", expected: true },
    { id: "1212121212", expected: true },
    { id: "1111111", expected: true },
    { id: "565656", expected: true },
    { id: "12345", expected: false },
    { id: "11", expected: true },
    { id: "99", expected: true },
];

console.log("Running Day 2 Part 2 Test Cases...");
let passed = 0;
for (const t of testCases) {
    const result = isInvalidID_Part2(t.id);
    if (result === t.expected) {
        console.log(`PASS: ${t.id} -> ${result}`);
        passed++;
    } else {
        console.error(`FAIL: ${t.id} -> Expected ${t.expected}, got ${result}`);
    }
}

if (passed === testCases.length) {
    console.log(`\nAll ${passed} tests passed!`);
} else {
    console.error(`\n${testCases.length - passed} tests failed.`);
}
