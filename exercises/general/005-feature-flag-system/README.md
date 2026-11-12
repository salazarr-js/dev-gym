---
id: 005
title: Feature flag system
source: Live coding interview (reconstructed)
level: medium
status: todo
---

# 005. Feature flag system

Source: a live coding round, reconstructed from memory.

## Statement

> Reconstructed from memory after the interview. The original wording was lost. The
> intent and the constraints are accurate.

Design a feature flag system from scratch in TypeScript.

1. An application needs to know whether a feature is enabled for a specific user.
2. The decision depends on user attributes, for example: whether the user is an
   admin, their country, and their age.
3. The system receives the flag's conditions and the user's data, and answers
   whether the feature is enabled.
4. A condition can be of several kinds: equality, membership in a list, and numeric
   comparison (for example, minimum age 18).
5. A feature is enabled only if all the flag's conditions are met.
6. The system must be easy to extend: adding a new attribute or a new kind of
   condition must not require modifying the existing code.
7. The design must be typed and prevent common mistakes, such as using an attribute
   that does not exist.
8. You define the public interface, the data structures, and how you handle edge
   cases (empty flag, missing data, unexpected values).

Bonus: combine conditions with OR and NOT, enable a flag for a percentage of users,
and write tests.

Original example shape, as remembered (optional hint):
`FeatureFlagSystem.isEnabled({ flags: ... })`.

## Examples

None. The original gave no input and output table; the interface is yours to design.

## Test spec

The interface is open, so these tests cannot be written before the attempt. Write
them right after you choose the API. They check behavior, not signatures.

| # | Behavior | Expected |
|---|---|---|
| 1 | All conditions of a flag are met | enabled |
| 2 | One condition fails (for example age 17 with minimum 18) | disabled |
| 3 | Flag with no conditions | enabled |
| 4 | Unknown flag name | disabled |
| 5 | User is missing an attribute the flag needs | disabled |
| 6 | Country in a list (`AR`, `US`) | enabled for `AR`, disabled for `BR` |
| 7 | New attribute or new condition kind | added without editing existing code |
| 8 | Condition on an attribute that does not exist | compile error |
| 9 | Bonus: OR, NOT, percentage rollout stable per user | as described |

## Setup

TypeScript with `vitest`. Put the code in `code/`: `solution.ts` and
`solution.test.ts` (or `solution.py` and `test_solution.py` for another language).

```bash
npm init -y && npm i -D typescript vitest
npx vitest run
```

## Attempt log

| Date | Language | Score | Failed | Lesson |
|---|---|---|---|---|
