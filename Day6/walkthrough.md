# Day 6 Solution Walkthrough

## Problem: Trash Compactor — Math Worksheet

### Goal
Parse a vertically-formatted math worksheet where problems are arranged side-by-side in columns. Each problem has a list of numbers stacked vertically, with the operation symbol (`+` or `*`) at the bottom. Problems are separated by full columns of only spaces. Compute the result of each problem and return the grand total (sum of all results).

### Input Format
- Multiple rows of numbers (right- or left-aligned within each problem's column width).
- A final row containing the operator for each problem (`+` or `*`).
- Problems are laid out side-by-side; a "separator" is any character column that contains only spaces across every row.

### Example
```
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  
```
Separator columns divide this into four problems:

| Problem | Numbers        | Op | Result   |
|---------|----------------|----|----------|
| 1       | 123, 45, 6     | *  | 33 210   |
| 2       | 328, 64, 98    | +  | 490      |
| 3       | 51, 387, 215   | *  | 4 243 455|
| 4       | 64, 23, 314    | +  | 401      |

Grand total = 33210 + 490 + 4243455 + 401 = **4 277 556**

### Algorithm

1. **Split** input into lines; strip trailing blank lines.
2. **Pad** every line to the same width (using spaces) so all column indices are valid.
3. **Find separator columns**: a column index `c` is a separator if `line[c] === ' '` for every line (including the operator row).
4. **Group** consecutive non-separator columns into problem ranges `[start, end]`.
5. **For each problem range**:
   - Extract each number row's substring, trim, and parse as `Number` (skip empty strings for rows with no digit in that range).
   - Extract the operator from the operator row substring.
   - Compute the result: `reduce` with `+` or `*`.
6. **Sum** all problem results → grand total.

### Code Snippet
```javascript
// Find separator columns (all spaces in every row)
const isSep = new Array(maxWidth).fill(true);
for (let c = 0; c < maxWidth; c++) {
    for (const line of paddedLines) {
        if (line[c] !== ' ') { isSep[c] = false; break; }
    }
}

// Group consecutive non-separator columns into problem ranges
const problems = [];
let start = -1;
for (let c = 0; c <= maxWidth; c++) {
    if (c === maxWidth || isSep[c]) {
        if (start !== -1) { problems.push([start, c - 1]); start = -1; }
    } else {
        if (start === -1) start = c;
    }
}
```

### Answer
**7229350537438**
