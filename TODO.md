# TODO

Goal: write the code, run one command, see which tests pass. Nothing more.

## 1. Playground setup (TypeScript first)

- [ ] Root `package.json` with `typescript`, `vitest` and `tsx` as dev dependencies.
- [ ] `tsconfig.json` (strict) and a `vitest` config that finds `exercises/*/*/code/*.test.ts`.
- [ ] `npm test` runs every exercise; `npm test -- 005` runs one (filter by folder name).
- [ ] Smoke check with 001 and 002: a stub fails, a correct solution passes.

## 2. Tests per exercise

- [ ] One `code/solution.test.ts` per exercise, built from its "Test spec" table.
- [ ] One empty `code/solution.ts` stub per exercise, so tests fail until solved.
- [ ] Order: 001, 002, 005 in TypeScript.

## 3. Python

- [ ] `pytest` as the only dependency (`requirements.txt`).
- [ ] `code/test_solution.py` and a stub for 003, then 001 and 002 in Python.

## 4. One verify command

- [ ] A single script (for example `npm run verify`) that runs the TypeScript and Python
      tests and prints pass or fail per exercise.
- [ ] Update the "Setup" section of each exercise README to point to that command.
- [ ] Update the README "Practice" section with the real setup steps.

## 5. React exercises

- [ ] Add `@testing-library/react`, `jsdom` and a React-capable `vitest` environment.
- [ ] Add React exercises to practice (004 is the first).

## 6. SQL exercises (`exercises/sql/`, 011 to 013)

- [ ] A local database (for example SQLite) with the tables from each statement, and a
      command that runs `code/solution.sql` and compares the output.

## 7. Revisit the organization

- [ ] After the React exercises exist, decide if the topic folders still work
      (`general/`, `sql/`, `react/`) and how numbering behaves.
- [ ] Link-only exercises (006 to 013): your own tests live in `code/`; confirm this is
      enough without the statement copied.
- [ ] 006 and 008 have a first solution in `code/solution.ts` and no tests yet; 007 is a stub.

## Ideas (later, not planned)

- In-browser runner: https://github.com/salazarr-js/code-sandbox
- StackBlitz integration.
- Doc site for the exercises. Candidates: https://vitepress.dev/ , https://docusaurus.io/ ,
  https://nextra.site/ , https://rspress.rs/ , https://docus.dev/en ,
  https://starlight.astro.build/es/ , https://undocs.pages.dev/