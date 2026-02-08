# Day 2 Solution Walkthrough

## Part 1: Sequence Repeated Twice

### Goal
Find the sum of all invalid IDs where an ID is invalid if it consists of a sequence of digits repeated exactly twice (e.g., `123123`).

### Logic
1.  **Check Length**: Must be even.
2.  **Split and Compare**: `firstHalf === secondHalf`.

### Result
- **Sum**: `19386344315`

## Part 2: Sequence Repeated At Least Twice

### Goal
Find the sum of invalid IDs where an ID is invalid if it consists of a sequence repeated **2 or more times** (e.g., `123123123` or `111111`).

### Logic
The condition "repeated at least twice" means the string $S$ is composed of some pattern $P$ repeated $k$ times ($k \ge 2$).

```javascript
function isInvalidID_Part2(numString) {
    const len = numString.length;
    // Iterate through all possible pattern lengths L
    // L can range from 1 up to len / 2
    for (let L = 1; L <= len / 2; L++) {
        // The total length must be divisible by the pattern length
        if (len % L === 0) {
            const pattern = numString.substring(0, L);
            const repeatCount = len / L; // This will be >= 2
            
            // Check if repeating this pattern reconstructs the original string
            if (pattern.repeat(repeatCount) === numString) {
                return true;
            }
        }
    }
    return false;
}
```

### Execution and Verification
- **Verified Examples**:
    - `12341234` (valid, 2x)
    - `123123123` (valid, 3x)
    - `1212121212` (valid, 5x)
    - `565656` (valid, 3x)
- **Part 2 Result**:
    - **Total Invalid IDs Found**: 753
    - **Sum**: `34421651192`

## Final Answer
- Part 1 Sum: **19386344315**
- Part 2 Sum: **34421651192**
