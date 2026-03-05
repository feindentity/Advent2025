function solveWorksheet(input) {
    const lines = input.split(/\r?\n/);

    while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
        lines.pop();
    }

    if (lines.length < 2) return 0;

    const maxWidth = Math.max(...lines.map(l => l.length));
    const paddedLines = lines.map(l => l.padEnd(maxWidth, ' '));

    const opRow = paddedLines[paddedLines.length - 1];
    const numRows = paddedLines.slice(0, paddedLines.length - 1);

    const isSep = new Array(maxWidth).fill(true);
    for (let c = 0; c < maxWidth; c++) {
        for (const line of paddedLines) {
            if (line[c] !== ' ') {
                isSep[c] = false;
                break;
            }
        }
    }

    const problems = [];
    let start = -1;
    for (let c = 0; c <= maxWidth; c++) {
        if (c === maxWidth || isSep[c]) {
            if (start !== -1) {
                problems.push([start, c - 1]);
                start = -1;
            }
        } else {
            if (start === -1) start = c;
        }
    }

    let grandTotal = 0;

    for (const [s, e] of problems) {
        const numbers = numRows
            .map(row => row.slice(s, e + 1).trim())
            .filter(t => t !== '')
            .map(Number);

        const op = opRow.slice(s, e + 1).trim();

        if (numbers.length === 0 || (op !== '+' && op !== '*')) continue;

        const result = op === '+'
            ? numbers.reduce((a, b) => a + b, 0)
            : numbers.reduce((a, b) => a * b, 1);

        grandTotal += result;
    }

    return grandTotal;
}

function solveWorksheetPart2(input) {
    const lines = input.split(/\r?\n/);

    while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
        lines.pop();
    }

    if (lines.length < 2) return 0;

    const maxWidth = Math.max(...lines.map(l => l.length));
    const paddedLines = lines.map(l => l.padEnd(maxWidth, ' '));

    const opRow = paddedLines[paddedLines.length - 1];
    const numRows = paddedLines.slice(0, paddedLines.length - 1);

    const isSep = new Array(maxWidth).fill(true);
    for (let c = 0; c < maxWidth; c++) {
        for (const line of paddedLines) {
            if (line[c] !== ' ') {
                isSep[c] = false;
                break;
            }
        }
    }

    const problems = [];
    let start = -1;
    for (let c = 0; c <= maxWidth; c++) {
        if (c === maxWidth || isSep[c]) {
            if (start !== -1) {
                problems.push([start, c - 1]);
                start = -1;
            }
        } else {
            if (start === -1) start = c;
        }
    }

    let grandTotal = 0;

    for (let pi = problems.length - 1; pi >= 0; pi--) {
        const [s, e] = problems[pi];
        const op = opRow.slice(s, e + 1).trim();

        if (op !== '+' && op !== '*') continue;

        const numbers = [];
        for (let c = e; c >= s; c--) {
            const digits = numRows
                .map(row => row[c])
                .filter(ch => ch !== ' ')
                .join('');
            if (digits.length > 0) {
                numbers.push(Number(digits));
            }
        }

        if (numbers.length === 0) continue;

        const result = op === '+'
            ? numbers.reduce((a, b) => a + b, 0)
            : numbers.reduce((a, b) => a * b, 1);

        grandTotal += result;
    }

    return grandTotal;
}

const testCases = [
    {
        description: 'example from puzzle (four problems)',
        input:
            '123 328  51 64 \n' +
            ' 45 64  387 23 \n' +
            '  6 98  215 314\n' +
            '*   +   *   +  ',
        expected: 4277556,
    },
    {
        description: 'single multiplication problem (two numbers)',
        input: '3\n4\n*',
        expected: 12,
    },
    {
        description: 'single addition problem (two numbers)',
        input: '3\n4\n+',
        expected: 7,
    },
    {
        description: 'single multiplication problem (three numbers)',
        input: ' 3\n 4\n 5\n *',
        expected: 60,
    },
    {
        description: 'two problems: multiply then add',
        input: '2 3\n4 5\n* +',
        expected: 16, // 2*4=8, 3+5=8 → 16
    },
    {
        description: 'right-aligned numbers within problem columns',
        input: '  9 100\n100   9\n*   +  ',
        expected: 900 + 109, // 9*100=900, 100+9=109 → 1009
    },
    {
        description: 'single addition with one number',
        input: '42\n+',
        expected: 42,
    },
    {
        description: 'three problems mixed operators',
        input: '10 20 30\n 5  5  5\n*  +  * ',
        expected: 50 + 25 + 150, // 10*5=50, 20+5=25, 30*5=150 → 225
    },
];

const part2TestCases = [
    {
        description: 'Part 2 example from puzzle (four problems, right-to-left)',
        input:
            '123 328  51 64 \n' +
            ' 45 64  387 23 \n' +
            '  6 98  215 314\n' +
            '*   +   *   +  ',
        expected: 3263827, // 1058 + 3253600 + 625 + 8544
    },
    {
        description: 'Part 2 single column problem (digits stacked top-to-bottom)',
        input: '3\n4\n*',
        expected: 34, // single-col problem: col 0 → digits '3','4' → 34; only one number → 34
    },
];

console.log('Running Day 6 Tests...');
let passed = 0;
for (const t of testCases) {
    const result = solveWorksheet(t.input);
    if (result === t.expected) {
        console.log(`PASS: ${t.description} -> ${result}`);
        passed++;
    } else {
        console.error(`FAIL: ${t.description} -> Expected ${t.expected}, got ${result}`);
    }
}

console.log('\nRunning Day 6 Part 2 Tests...');
let passed2 = 0;
for (const t of part2TestCases) {
    const result = solveWorksheetPart2(t.input);
    if (result === t.expected) {
        console.log(`PASS: ${t.description} -> ${result}`);
        passed2++;
    } else {
        console.error(`FAIL: ${t.description} -> Expected ${t.expected}, got ${result}`);
    }
}

const totalPassed = passed + passed2;
const totalTests = testCases.length + part2TestCases.length;
if (totalPassed === totalTests) {
    console.log(`\nAll ${totalPassed} tests passed!`);
} else {
    console.error(`\n${totalPassed}/${totalTests} tests passed.`);
}
