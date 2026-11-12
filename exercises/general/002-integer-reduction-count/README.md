---
id: 002
title: Integer reduction count
source: Codility
level: medium
status: todo
---

# 002. Integer reduction count

## Statement

A string `S` of length `N` holds a non-negative integer `V` in binary, big-endian,
possibly with leading zeros. Two operations reduce `V`:

- if `V` is odd, subtract 1;
- if `V` is even, divide by 2.

Return the number of operations until `V` becomes 0.

Constraints: `S` contains only `0` and `1`; `N` is between 1 and 1,000,000. The value
does not fit in a native integer: do not convert the whole string.

## Examples

| S | V | Operations | Result |
|---|---|---|---|
| `"011100"` | 28 | 28, 14, 7, 6, 3, 2, 1, 0 | 7 |
| `"111"` | 7 | 7, 6, 3, 2, 1, 0 | 5 |
| `"1111010101111"` | | | 22 |
| `"1"` repeated 400,000 times | | | 799,999 |

## Test spec

| # | Group | Behavior | Expected |
|---|---|---|---|
| 1-4 | examples | the four examples above | exact counts |
| 5-8 | simple | short strings, `"0"`, `"1"`, leading zeros | `"0"` gives 0, `"1"` gives 1, `"0001"` gives 1 |
| 9 | extreme | all zeros, length 1,000,000 | 0 |
| 10-11 | medium | random strings of a few thousand bits | exact counts |
| 12-15 | performance | length 1,000,000: random, all ones, big values | finishes in time, O(N) |

Expected reasoning: after stripping leading zeros, every `1` bit except the leading
one costs two operations (subtract, then divide), the leading `1` costs one, every `0`
bit costs one. So the answer is `ones + (N - 1)` over the stripped string, or
`2 * ones + zeros - 1`.

## Setup

Python, `pytest`:

```python
# code/test_solution.py
import pytest
from solution import solution

CASES = [("011100", 7), ("111", 5), ("1111010101111", 22), ("0", 0), ("1", 1),
         ("0001", 1), ("0" * 1_000_000, 0), ("1" * 400_000, 799_999)]


@pytest.mark.parametrize("s, expected", CASES)
def test_examples(s, expected):
    assert solution(s) == expected


def test_matches_brute_force():
    import random
    for _ in range(200):
        s = "".join(random.choice("01") for _ in range(random.randint(1, 40)))
        v, ops = int(s, 2), 0
        while v:
            v, ops = (v - 1, ops + 1) if v % 2 else (v // 2, ops + 1)
        assert solution(s) == ops
```

TypeScript, `vitest`:

```ts
// code/solution.test.ts
import { expect, it } from "vitest";
import { solution } from "./solution";

it.each([
  ["011100", 7], ["111", 5], ["1111010101111", 22], ["0", 0], ["1", 1],
  ["0001", 1], ["0".repeat(1_000_000), 0], ["1".repeat(400_000), 799_999],
])("solution(%s) = %i", (s, expected) => {
  expect(solution(s)).toBe(expected);
});
```

## Attempt log

| Date | Language | Score | Failed | Lesson |
|---|---|---|---|---|
