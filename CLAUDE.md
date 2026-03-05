# CLAUDE.md — Advent of Code 2025

This file provides guidance for AI assistants working in this repository.

## Project Overview

This repository contains JavaScript (Node.js) solutions to **Advent of Code 2025** puzzles, Days 2–7. Each day is self-contained in its own directory.

## Repository Structure

```
Advent2025/
├── Day2/
│   ├── input.txt            # Puzzle input
│   ├── solution.js          # Part 1 solution
│   ├── solution_part2.js    # Part 2 solution
│   ├── test_part2.js        # Tests for Part 2
│   └── walkthrough.md       # Problem explanation & algorithm notes
├── Day3/
│   ├── input.txt
│   ├── solution.js
│   ├── solution_part2.js
│   ├── test.js
│   └── walkthrough.md
├── Day4/
│   ├── input.txt
│   ├── solution.js
│   └── solution_part2.js
├── Day5/
│   ├── input.txt
│   ├── solution.js
│   ├── solution_part2.js
│   ├── test.js
│   ├── test_part2.js
│   └── walkthrough.md
├── Day6/
│   ├── input.txt
│   ├── solution.js          # Contains both Part 1 and Part 2
│   ├── test.js
│   └── walkthrough.md
└── Day7/
    ├── input.txt
    ├── solution.js          # Contains both Part 1 and Part 2
    ├── test.js
    └── walkthrough.md
```

## Running Solutions and Tests

There is no build step. All scripts run directly with Node.js:

```bash
# Run a solution
node DayX/solution.js
node DayX/solution_part2.js

# Run tests
node DayX/test.js
node DayX/test_part2.js
```

Node.js is the only runtime required. There are no external npm dependencies and no `package.json`.

## Code Conventions

### File I/O

Every solution reads its input using this exact pattern:

```javascript
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
```

Always use `__dirname` so scripts work from any working directory.

### Input Parsing

- Split lines with `/\r?\n/` to handle both Unix and Windows line endings.
- Trim aggressively — `line.trim()` before parsing.
- Parse ranges as `split('-')`, pairs as `split(',')`.

### Large Numbers

Use `BigInt` whenever results may exceed `Number.MAX_SAFE_INTEGER` (2^53 - 1). Days 2, 3, and 7 all use BigInt. Convert carefully: `BigInt(someNumber)` and back with `Number(someBigInt)` only when safe.

### Functional Style

Prefer `map`, `filter`, and `reduce` over imperative loops where it improves clarity. Helper functions should be named and extracted rather than inlined.

### Testing

There is no test framework. Tests are plain Node.js scripts that print pass/fail to stdout via `console.log`. Follow the existing pattern in `Day6/test.js` (the most comprehensive test file) for new tests:

```javascript
// Example test structure
let passed = 0;
let failed = 0;

function test(description, actual, expected) {
  if (actual === expected) {
    console.log(`PASS: ${description}`);
    passed++;
  } else {
    console.log(`FAIL: ${description}`);
    console.log(`  Expected: ${expected}`);
    console.log(`  Actual:   ${actual}`);
    failed++;
  }
}

// ... tests ...

console.log(`\n${passed} passed, ${failed} failed`);
```

### Inline Verification

Solutions commonly include a small embedded example near the top to verify the algorithm before processing the real input. Keep this pattern — it serves as a quick sanity check.

## Day Summaries

| Day | Part 1 Topic | Part 2 Topic | Answer P1 | Answer P2 |
|-----|-------------|-------------|-----------|-----------|
| 2 | IDs with sequences repeated exactly 2× | IDs with sequences repeated ≥ 2× | 19386344315 | 34421651192 |
| 3 | Max 2-digit greedy selection | Max 12-digit greedy selection | 17311 | 171419245422055 |
| 4 | Paper roll accessibility | (see solution) | — | — |
| 5 | Count fresh ingredient IDs in ranges | Count unique IDs covered by ranges | — | 348548952146313 |
| 6 | Vertical worksheet math (L→R) | Vertical worksheet math (R→L) | 7229350537438 | 11479269003550 |
| 7 | Unique beam splits (BFS) | Timeline branches (BigInt, memoized recursion) | 1638 | 7759107121385 |

## Walkthrough Documents

Each `walkthrough.md` contains:
1. Problem statement and goal
2. Input format description with examples
3. Step-by-step algorithm explanation
4. Pseudocode or annotated examples
5. Final verified answers

When adding a new day, create a `walkthrough.md` following this structure.

## Adding a New Day (DayN)

1. Create `DayN/` directory.
2. Place puzzle input in `DayN/input.txt`.
3. Create `DayN/solution.js` (Part 1) and `DayN/solution_part2.js` (Part 2).
4. Create `DayN/test.js` with hand-written test cases.
5. Create `DayN/walkthrough.md` documenting the approach.

## Git Workflow

The default development branch is `master`. Feature work happens on branches named `claude/<description>-<id>`. Commit messages should be clear and describe what changed (e.g., `Add Day8 Part 1 solution`).

## Key Algorithms Used

- **Greedy digit selection** (Day 3): scan left-to-right, pick max digit at each position within a window.
- **Range merging** (Day 5): sort by start, merge overlapping intervals, then count unique coverage.
- **BFS beam simulation** (Day 7 Part 1): queue-based traversal tracking `(position, direction)` pairs; use a `Set` to deduplicate visited states.
- **Memoized recursion** (Day 7 Part 2): cache results keyed on beam state to avoid exponential recomputation; results are BigInt.
- **Column-based parsing** (Day 6): read input transposed (column by column) to extract vertically-written numbers and operators.
