function findMaxJoltage(line) {
    for (let x = 9; x >= 0; x--) {
        const xStr = x.toString();
        const firstIdx = line.indexOf(xStr);
        if (firstIdx !== -1) {
            const remaining = line.substring(firstIdx + 1);
            for (let y = 9; y >= 0; y--) {
                if (remaining.includes(y.toString())) {
                    return parseInt(xStr + y.toString(), 10);
                }
            }
        }
    }
    return 0;
}

const testCases = [
    { input: "987654321111111", expected: 98 },
    { input: "811111111111119", expected: 89 },
    { input: "234234234234278", expected: 78 },
    { input: "818181911112111", expected: 92 },
];

console.log("Running Day 3 Tests...");
let passed = 0;
for (const t of testCases) {
    const result = findMaxJoltage(t.input);
    if (result === t.expected) {
        console.log(`PASS: ${t.input} -> ${result}`);
        passed++;
    } else {
        console.error(`FAIL: ${t.input} -> Expected ${t.expected}, got ${result}`);
    }
}

const expectedSum = 357;
// Sum check
const totalSum = testCases.reduce((acc, curr) => acc + findMaxJoltage(curr.input), 0);
if (totalSum === expectedSum) {
    console.log(`PASS: Total Sum -> ${totalSum}`);
    passed++;
} else {
    console.error(`FAIL: Total Sum -> Expected ${expectedSum}, got ${totalSum}`);
}

if (passed === testCases.length + 1) {
    console.log(`\nAll tests passed!`);
}
