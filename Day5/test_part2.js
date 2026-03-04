function parseRanges(input) {
    const parts = input.split(/\r?\n\r?\n/);
    return parts[0].trim().split(/\r?\n/).map(line => {
        const [lo, hi] = line.trim().split('-').map(Number);
        return [lo, hi];
    });
}

function countFreshIDs(ranges) {
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

const testCases = [
    {
        description: 'example from puzzle (14 unique IDs)',
        input: `3-5\n10-14\n16-20\n12-18\n\n1\n5\n8\n11\n17\n32`,
        expected: 14,
    },
    {
        description: 'single range',
        input: `1-10\n\n999`,
        expected: 10,
    },
    {
        description: 'two non-overlapping ranges',
        input: `1-5\n10-15\n\n999`,
        expected: 11,
    },
    {
        description: 'two overlapping ranges',
        input: `1-10\n5-15\n\n999`,
        expected: 15,
    },
    {
        description: 'adjacent ranges merge',
        input: `1-5\n6-10\n\n999`,
        expected: 10,
    },
    {
        description: 'one range fully inside another',
        input: `1-20\n5-10\n\n999`,
        expected: 20,
    },
];

console.log('Running Day 5 Part 2 Tests...');
let passed = 0;
for (const t of testCases) {
    const result = countFreshIngredientIDs(t.input);
    if (result === t.expected) {
        console.log(`PASS: ${t.description} -> ${result}`);
        passed++;
    } else {
        console.error(`FAIL: ${t.description} -> Expected ${t.expected}, got ${result}`);
    }
}

if (passed === testCases.length) {
    console.log(`\nAll ${passed} tests passed!`);
} else {
    console.error(`\n${passed}/${testCases.length} tests passed.`);
}
