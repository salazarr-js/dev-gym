---
id: 001
title: Database transactions simulator
source: Codility
level: easy
status: todo
---

# 001. Database transactions simulator

## Statement

Implement a class `DatabaseSimulator` that stores key-value pairs in memory and
supports nested transactions.

Methods:

- `begin()` starts a transaction. Calling it inside an active transaction starts a
  nested one.
- `get(key)` returns the value for `key`, or `null` (`None`) if absent. Lookup order:
  the innermost active transaction, then outer active transactions from innermost to
  outermost, then permanent storage.
- `set(key, value)` stores `value` under `key` in the innermost active transaction.
  Overrides an existing value. Works in nested transactions.
- `count()` returns the number of keys in permanent storage (committed only).
- `commit()` persists the changes of all active transactions, innermost to outermost,
  and ends all of them.
- `rollback()` discards the changes of the innermost active transaction and ends only
  that one.

Rules:

- `begin()`, `get()` and `count()` are the only methods allowed with no active
  transaction. Any other call throws an error with the message `No active transaction`.
- Values set in a nested transaction shadow values of outer transactions and of
  permanent storage until committed or rolled back.

## Examples

Example 1, multiple keys:

```
begin()
get("a")            -> null
set("a", "Hello A")
get("a")            -> "Hello A"
set("b", "Hello B")
count()             -> 0
commit()
get("a")            -> "Hello A"
get("b")            -> "Hello B"
count()             -> 2
```

Example 2, no active transaction:

```
get("b")            -> null
count()             -> 0
set("b", "hello")   -> throws "No active transaction"
commit()            -> throws "No active transaction"
rollback()          -> throws "No active transaction"
```

Example 3, rollback:

```
begin()
set("a", "Hello")
set("a", "Hello world")
get("a")            -> "Hello world"
rollback()
get("a")            -> null
count()             -> 0
```

Example 4, nested commit:

```
begin()
set("a", "Hello")
begin()
set("a", "Hello World")
get("a")            -> "Hello World"
commit()
get("a")            -> "Hello World"
count()             -> 1
```

Example 5, nested rollback then commit:

```
begin()
set("a", "Hello")
begin()
set("a", "Hello World")
set("b", "Hello")
rollback()
get("a")            -> "Hello"
get("b")            -> null
commit()
count()             -> 1
```

## Test spec

The grader runs 18 correctness tests. Names paraphrased:

| # | Behavior | Expected |
|---|---|---|
| 1 | Class exposes begin, get, set, count, commit, rollback | present |
| 2 | set, commit, rollback with no active transaction | throw "No active transaction" |
| 3 | Same methods during an active transaction | no error |
| 4 | get on a missing key | null |
| 5 | count on empty storage | 0 |
| 6 | set then get inside a transaction | returns the value |
| 7 | set twice in the same transaction | latest value |
| 8 | commit ends all active transactions | set after commit throws |
| 9 | rollback ends only the innermost transaction | outer stays active |
| 10 | get traverses active transactions innermost to outermost | shadowing works |
| 11 | value persists after commit | get returns it with no transaction |
| 12 | value discarded after rollback | get returns null |
| 13 | commit overrides a permanently stored value | new value wins |
| 14 | rollback does not touch a permanently stored value | old value stays |
| 15 | count returns number of persisted keys, not writes | overrides counted once |
| 16 | commit persists changes of all nested transactions | all levels saved |
| 17 | rollback discards only the innermost transaction changes | outer changes remain |
| 18 | commit persists changes of transactions that were not rolled back | after a nested rollback, outer changes commit |

Traps seen in practice: commit that marks records as committed but never closes the
transactions (fails 8, 16, 18); count that counts records instead of unique keys
(fails 15); a flat list instead of a stack of maps (fails 17).

## Setup

Data model hint: permanent store as a map, active
transactions as a stack of maps. Nothing else.

Python, `pytest`:

```python
# code/test_solution.py
import pytest
from solution import DatabaseSimulator


def test_no_active_transaction():
    db = DatabaseSimulator()
    assert db.get("b") is None
    assert db.count() == 0
    for call in (lambda: db.set("b", "x"), db.commit, db.rollback):
        with pytest.raises(Exception, match="No active transaction"):
            call()


def test_nested_rollback_then_commit():
    db = DatabaseSimulator()
    db.begin(); db.set("a", "Hello")
    db.begin(); db.set("a", "Hello World"); db.set("b", "Hello")
    db.rollback()
    assert db.get("a") == "Hello" and db.get("b") is None
    db.commit()
    assert db.count() == 1
    with pytest.raises(Exception, match="No active transaction"):
        db.set("c", "x")
```

TypeScript, `vitest`:

```ts
// code/solution.test.ts
import { describe, expect, it } from "vitest";
import { DatabaseSimulator } from "./solution";

describe("DatabaseSimulator", () => {
  it("throws with no active transaction", () => {
    const db = new DatabaseSimulator();
    expect(db.get("b")).toBeNull();
    expect(db.count()).toBe(0);
    expect(() => db.set("b", "x")).toThrow("No active transaction");
    expect(() => db.commit()).toThrow("No active transaction");
    expect(() => db.rollback()).toThrow("No active transaction");
  });

  it("nested rollback then commit", () => {
    const db = new DatabaseSimulator();
    db.begin(); db.set("a", "Hello");
    db.begin(); db.set("a", "Hello World"); db.set("b", "Hello");
    db.rollback();
    expect(db.get("a")).toBe("Hello");
    expect(db.get("b")).toBeNull();
    db.commit();
    expect(db.count()).toBe(1);
    expect(() => db.set("c", "x")).toThrow("No active transaction");
  });
});
```

Write the remaining cases from the test spec table during the attempt; the real test
gives only the five examples.

## Attempt log

| Date | Language | Score | Failed | Lesson |
|---|---|---|---|---|
