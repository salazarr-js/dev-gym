# Exercises

Exercises for local practice, grouped by topic folder:

- `general/`: logic and design problems in TypeScript or Python.
- `sql/`: SQL queries.
- `react/`: React components.

001 to 004 come from free-access practice platforms, so they can be done offline. 005 was
reconstructed from memory after a live coding round. 006 to 013 are
[Midu Dev](https://midu.dev/retos) challenges: only a link and a short summary are kept
here, because the site's terms allow personal use only.

## Index

| Id | Exercise | Topic | Source | Level | Status |
|---|---|---|---|---|---|
| 001 | [Database transactions simulator](general/001-database-transactions-simulator/README.md) | general | Codility | easy | todo |
| 002 | [Integer reduction count](general/002-integer-reduction-count/README.md) | general | Codility | medium | todo |
| 003 | [Date and time extractor](general/003-date-time-extractor/README.md) | general | HackerRank | medium | todo |
| 004 | [React telephone directory](react/004-react-telephone-directory/README.md) | react | HackerRank | medium | todo |
| 005 | [Feature flag system](general/005-feature-flag-system/README.md) | general | Live interview (reconstructed) | medium | attempted |
| 006 | [Archivos comprometidos](general/006-compromised-files/README.md) | general | Midu Dev | easy | solved |
| 007 | [Conflictos de edición en tiempo real](general/007-realtime-edit-conflicts/README.md) | general | Midu Dev | medium | todo |
| 008 | [El códice de Arkanus](general/008-arkanus-codex/README.md) | general | Midu Dev | easy | solved |
| 009 | [Contraseñas segmentadas](general/009-segmented-passwords/README.md) | general | Midu Dev | hard | todo |
| 010 | [Desfile de los Pájaros Cantores](general/010-songbird-parade/README.md) | general | Midu Dev | medium | todo |
| 011 | [Concurso de Superhéroes](sql/011-superhero-contest/README.md) | sql | Midu Dev | easy | todo |
| 012 | [El Club de Lectura](sql/012-book-club/README.md) | sql | Midu Dev | easy | todo |
| 013 | [El Gran Pizzero](sql/013-pizza-master/README.md) | sql | Midu Dev | medium | todo |

Status: `todo`, `attempted`, `passed` (all tests pass, no AI),
`solved` (solved, tests not written yet).

## Adding an exercise

1. Pick the topic folder (`general/`, `sql/`, `react/`) and copy `_template/` to
   `<topic>/NNN-<slug>/`. Numbers are global (next free number); folder names are in
   English.
2. Free-access platforms: paste or paraphrase the statement, keeping the examples and the
   observable behavior exact. Sites with restrictive terms: link and summary only.
3. List what the grader checks as a table: that is the test spec.
4. Add the row above.

## Code

Each exercise folder can have a `code/` folder with one solution per language:
`solution.ts` and `solution.test.ts`, `solution.py` and `test_solution.py`, or
`solution.sql` for SQL. A new language is a new file in `code/`. A retry overwrites the
file; git keeps the old one.

The result of each attempt goes in the attempt log table at the end of the exercise
`README.md`: date, language, score, what failed, one lesson.
