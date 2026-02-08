# Day 3 Solution Walkthrough

## Part 1: Max 2-Digit Number

### Goal
Find the maximum 2-digit number from each battery bank (line) preserving digit order. Sum them up.

### Logic
- Iterate possible first digits $X$ from 9 to 0.
- Find the **first** occurrence of $X$.
- Search the remaining string for the largest digit $Y$.
- Since we start with largest $X$, the first valid pair is the maximum.

### Result
- **Part 1 Sum**: `17311`

## Part 2: Max 12-Digit Number

### Goal
Find the maximum 12-digit number from each battery bank preserving digit order. Sum them up.

### Logic
Greedy Algorithm for finding maximum subsequence of length $K$:
1. We need to pick $K=12$ digits.
2. Maintain `currentIndex` (index of last picked digit).
3. For each of the 12 positions:
    - Determine the valid search window.
    - Start: `currentIndex + 1`.
    - End: `line.length - (digits_remaining)`.
    - Find the **largest digit** in this window. If allowed, pick the first occurrence of that digit to maximize the remaining window size for future digits.
    - Append digit to result and update `currentIndex`.

### Code Snippet (Part 2) using Greedy Strategy
```javascript
for (let i = 0; i < k; i++) {
    const digitsNeededAfter = k - 1 - i;
    const endSearch = line.length - digitsNeededAfter;
    
    let bestDigit = -1;
    for (let j = currentIdx + 1; j < endSearch; j++) {
        const digit = parseInt(line[j], 10);
        if (digit > bestDigit) {
            bestDigit = digit;
            bestDigitIdx = j;
            if (digit === 9) break; // Optimization
        }
    }
    result += bestDigit;
    currentIdx = bestDigitIdx;
}
```

### Execution Results
- **Example Sum**: `3121910778619` (matches prompt)
- **Part 2 Total Output Joltage**: `171419245422055`

## Final Answers
- Part 1: **17311**
- Part 2: **171419245422055**
