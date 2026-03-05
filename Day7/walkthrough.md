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
