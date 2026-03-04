# Day 5 Solution Walkthrough

## Part 1: Count Fresh Ingredient IDs

### Goal
Given a list of fresh ID ranges and a list of available ingredient IDs, count how many of the available IDs fall within at least one fresh range (inclusive).

### Input Format
- **Section 1** (before the blank line): Fresh ID ranges, one per line, in the format `lo-hi`.
- **Section 2** (after the blank line): Available ingredient IDs, one per line.

### Logic
1. Parse the two sections by splitting on the blank line.
2. For each available ID, check whether it falls within any of the fresh ranges (`lo <= id <= hi`).
3. Count IDs that match at least one range.

### Example
```
3-5
10-14
16-20
12-18

1
5
8
11
17
32
```

| ID | Fresh? | Reason |
|----|--------|--------|
| 1  | No     | Outside all ranges |
| 5  | Yes    | In range 3-5 |
| 8  | No     | Outside all ranges |
| 11 | Yes    | In range 10-14 |
| 17 | Yes    | In ranges 16-20 and 12-18 |
| 32 | No     | Outside all ranges |

**Answer: 3**

### Code Snippet
```javascript
function isFresh(id, ranges) {
    return ranges.some(([lo, hi]) => id >= lo && id <= hi);
}

function countFreshIngredients(input) {
    const { ranges, ids } = parseInput(input);
    return ids.filter(id => isFresh(id, ranges)).length;
}
```

---

## Part 2: Count All Fresh Ingredient IDs from Ranges

### Goal
Ignore the available ingredient IDs section. Count how many **unique** ingredient IDs are covered by the fresh ID ranges combined.

### Logic
1. Parse only the ranges section.
2. Sort ranges by lower bound, then merge overlapping or adjacent ranges.
3. For each merged range `[lo, hi]`, the count of covered IDs is `hi - lo + 1`.
4. Sum counts across all merged ranges.

### Example
Ranges: `3-5`, `10-14`, `16-20`, `12-18`

After merging: `3-5` (3 IDs), `10-20` (11 IDs) → **14 total**

### Answer: 348548952146313

### Code Snippet
```javascript
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
```
