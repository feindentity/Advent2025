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
