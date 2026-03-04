function parseInput(input) {
    const parts = input.split(/\r?\n\r?\n/);
    const ranges = parts[0].trim().split(/\r?\n/).map(line => {
        const [lo, hi] = line.trim().split('-').map(Number);
        return [lo, hi];
    });
    const ids = parts[1].trim().split(/\r?\n/).map(line => Number(line.trim()));
    return { ranges, ids };
}

function isFresh(id, ranges) {
    return ranges.some(([lo, hi]) => id >= lo && id <= hi);
}

function countFreshIngredients(input) {
    const { ranges, ids } = parseInput(input);
    return ids.filter(id => isFresh(id, ranges)).length;
}

const testCases = [
    {
        description: 'example from puzzle',
        input: `3-5\n10-14\n16-20\n12-18\n\n1\n5\n8\n11\n17\n32`,
        expected: 3,
    },
    {
        description: 'single range, all fresh',
        input: `1-10\n\n1\n5\n10`,
        expected: 3,
    },
    {
        description: 'no fresh IDs',
        input: `1-5\n\n6\n7\n8`,
        expected: 0,
    },
    {
        description: 'overlapping ranges',
        input: `1-10\n5-15\n\n3\n10\n15\n20`,
        expected: 3,
    },
    {
        description: 'boundary values',
        input: `3-5\n\n2\n3\n5\n6`,
        expected: 2,
    },
];

console.log('Running Day 5 Tests...');
let passed = 0;
for (const t of testCases) {
    const result = countFreshIngredients(t.input);
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
