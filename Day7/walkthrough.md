# Day 7 Solution Walkthrough

## Problem: Tachyon Manifold — Beam Splitting

### Goal
Simulate a tachyon beam entering a manifold grid at position `S` and traveling downward. When the beam strikes a splitter (`^`), it stops and two new beams are emitted from the cells immediately to the left and right of the splitter, each continuing downward. Count the total number of unique splits (i.e. how many distinct splitters are struck by at least one beam).

### Input Format
- A rectangular grid of characters: `.` (empty space), `S` (beam entry point, top row), `^` (splitter).
- Odd-numbered rows are always empty (`.`), giving a visual gap between splitter rows.
- The beam enters at `S` and always travels downward.

### Example
```
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............
```

Tracing the first few splits:

| Step | Beam origin | Hits splitter | Spawns beams at |
|------|-------------|---------------|-----------------|
| 1    | (0, 7) — S  | (2, 7)        | (2, 6) and (2, 8) |
| 2    | (2, 6)      | (4, 6)        | (4, 5) and (4, 7) |
| 3    | (2, 8)      | (4, 8)        | (4, 7) and (4, 9) |
| …    | …           | …             | …               |

Beams (4, 7) from steps 2 and 3 **merge** — only one beam proceeds from that origin.

The beam in column 8 (starting from row 6) finds no splitters below it and exits without splitting.

**Total splits in example: 21** (22 splitters exist, but the one at row 14, col 9 is never reached).

### Algorithm

1. **Parse** the grid; locate `S`.
2. **BFS** over beam origins, where each beam is identified by `(startRow, col)`.
3. **Simulate** each beam traveling straight down from its origin until it hits a `^` or exits the grid.
4. When a `^` is hit:
   - Add `(row, col)` to a `hitSplitters` set (deduplication: two beams hitting the same splitter count as one split).
   - Spawn new beam origins at `(row, col-1)` and `(row, col+1)`.
5. Track `visitedStarts` to avoid reprocessing a beam origin already handled (handles merging).
6. **Answer** = `hitSplitters.size`.

### Why deduplication matters

Two beams can converge on the same column — for example, when a splitter emits a right-child and another splitter emits a left-child that land in the same cell. Physically they merge into a single beam. Tracking `visitedStarts` prevents simulating the same path twice, and `hitSplitters` ensures a splitter that two separate beam lineages both reach is still counted only once.

### Code Snippet
```javascript
while (queue.length > 0) {
    const [r, c] = queue.shift();
    const key = `${r},${c}`;
    if (visitedStarts.has(key)) continue;
    visitedStarts.add(key);

    for (let nr = r; nr < rows; nr++) {
        if (lines[nr][c] === '^') {
            hitSplitters.add(`${nr},${c}`);
            if (c - 1 >= 0) queue.push([nr, c - 1]);
            if (c + 1 < cols) queue.push([nr, c + 1]);
            break;
        }
    }
}
return hitSplitters.size;
```

### Answer
**1638**

---

## Part 2: Quantum Tachyon Manifold — Timeline Count

### Goal
Under the many-worlds interpretation, every time the particle hits a splitter, time itself splits: one timeline where it went left, one where it went right. Count the **total number of timelines** that exist after the particle completes all possible journeys through the manifold.

### Key Difference from Part 1

| | Part 1 | Part 2 |
|---|---|---|
| Two beams converge on same origin | **Merge** — process once | **Independent** — each contributes its own timelines |
| Splitter hit by two paths | Count once | Each path multiplies timelines separately |
| Technique | BFS with `visitedStarts` deduplication | Memoised recursion |

### Recursive Definition

Let `f(r, c)` = number of timelines produced by a beam starting at `(r, c)` moving downward.

- **No splitter below**: the particle exits the manifold. → `f = 1`
- **Splitter at `(nr, c)`**: → `f(r, c) = f(nr, c−1) + f(nr, c+1)`
- **Out of bounds** (`c < 0` or `c ≥ cols`): particle exits sideways. → `f = 1`

Memoisation is valid because `f(r, c)` is a pure function of the beam origin; it's called from multiple parents, and each parent correctly sums the cached value into its own total.

### Example Trace (bottom-up)

Using the 15×15 example grid:

```
f(14, 0..14 exits) = 1 each
f(12, 1) = f(14,0)+f(14,2) = 2    f(12, 3) = 2    f(12, 5) = 2
f(12, 7) = f(14,6)+f(14,8) = 2    f(12,11) = 1    f(12,13) = 2
f(10, 2) = f(12,1)+f(12,3) = 4    f(10, 6) = 4    f(10,12) = 3
f(10, 4) = 1  f(10, 8) = 1  f(10,10) = 1
f(8, 3) = f(10,2)+f(10,4) = 5     f(8, 5) = 5     f(8, 7) = 2
f(8, 9) = f(10,8)+f(10,10) = 2    f(8,11) = f(10,10)+f(10,12) = 4
f(6, 4) = f(8,3)+f(8,5) = 10      f(6, 6) = f(8,5)+f(8,7) = 7
f(6, 8) = 1  (no splitter in col 8)
f(6,10) = f(8,9)+f(8,11) = 6
f(4, 5) = f(6,4)+f(6,6) = 17      f(4, 7) = f(6,6)+f(6,8) = 8
f(4, 9) = f(6,8)+f(6,10) = 7
f(2, 6) = f(4,5)+f(4,7) = 25      f(2, 8) = f(4,7)+f(4,9) = 15
f(0, 7) = f(2,6)+f(2,8) = 40  ✓
```

Note that `f(4, 7) = 8` is **memoised** — computed once, then reused by both `f(2, 6)` and `f(2, 8)` to correctly count those timelines twice (once per branch).

### Code Snippet
```javascript
const memo = new Map();

function timelines(r, c) {
    if (c < 0 || c >= cols) return 1n;  // exits manifold sideways
    const key = `${r},${c}`;
    if (memo.has(key)) return memo.get(key);

    let result = 1n;  // exits bottom without hitting a splitter
    for (let nr = r; nr < rows; nr++) {
        if (lines[nr][c] === '^') {
            result = timelines(nr, c - 1) + timelines(nr, c + 1);
            break;
        }
    }

    memo.set(key, result);
    return result;
}
```

BigInt is used because timeline counts can exceed JavaScript's safe integer range for large inputs.

### Answer
**7759107121385**
