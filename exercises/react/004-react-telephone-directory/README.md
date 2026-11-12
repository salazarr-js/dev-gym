---
id: 004
title: React telephone directory
source: HackerRank
level: medium (tags: state management, functional components, hooks)
status: todo
---

# 004. React telephone directory

## Statement

A project skeleton has three components. Add the behavior; do not change the
`data-testid` attributes, classes or ids, and edit only `App`, `AddPerson` and
`ListPeople`.

Layout: a form card on the left (Person Name, Phone Number, Email, "Add Person"
button) and a "Contact List" table on the right with columns ID, Name, Phone Number,
Email.

Requirements:

1. `AddPerson`
   - Name input of type `text`.
   - Phone input of type `number`, exactly 10 digits.
   - Email input of type `email`.
   - No field may be blank.
   - On a valid submission, show an alert with the text `Successfully Added`.
   - On invalid input, show an alert with the text `Enter Valid Data`.
2. `ListPeople`
   - Receives the contacts as a prop named `contacts` (array of objects).
   - Renders one row per contact with this exact structure:

   ```html
   <tr data-testid="person">
     <td data-testid="person-id">1</td>
     <td data-testid="person-name">Replace Me</td>
     <td data-testid="person-number">1234567890</td>
     <td data-testid="person-email">example@email.com</td>
   </tr>
   ```

3. `App` owns the state and passes it down as props.

Contacts render in real time after each successful addition. IDs are sequential from 1.

## Test spec

| # | Group | Behavior | Expected |
|---|---|---|---|
| 1 | Input fields | Name input has type text | `type="text"` |
| 2 | Input fields | Phone input has type number | `type="number"` |
| 3 | Input fields | Email input has type email | `type="email"` |
| 4 | Content load | Initially no contacts rendered | zero `person` rows |
| 5 | Content load | Loads contacts | rows match the state |
| 6 | Validation | Correct input adds a contact to the list | row appears, alert `Successfully Added` |
| 7 | Validation | Invalid input (phone not 10 digits, bad email) | alert `Enter Valid Data`, no row |
| 8 | Validation | Blank input | alert `Enter Valid Data`, no row |

The grader mocks `window.alert`; do not use `confirm` or custom modals. HTML5
validation on the inputs is not enough: the tests submit programmatically, so validate
in the handler too.

## Setup

```sh
npm create vite@latest telephone-directory -- --template react-ts
cd telephone-directory
npm i -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

`vite.config.ts`: add `test: { environment: "jsdom", setupFiles: "./src/setup.ts" }`
and in `src/setup.ts` import `@testing-library/jest-dom/vitest`.

Start from this skeleton: `src/components/App.tsx`,
`src/components/AddPerson/AddPerson.tsx`, `src/components/ListPeople/ListPeople.tsx`
with the markup and test ids, no logic. Only the logic is yours to write.

```tsx
// src/App.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import App from "./components/App";

beforeEach(() => { vi.spyOn(window, "alert").mockImplementation(() => {}); });

const fill = (name: string, phone: string, email: string) => {
  fireEvent.change(screen.getByPlaceholderText(/person name/i), { target: { value: name } });
  fireEvent.change(screen.getByPlaceholderText(/phone/i), { target: { value: phone } });
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: email } });
  fireEvent.click(screen.getByRole("button", { name: /add person/i }));
};

it("has typed inputs and no contacts at start", () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/person name/i)).toHaveAttribute("type", "text");
  expect(screen.getByPlaceholderText(/phone/i)).toHaveAttribute("type", "number");
  expect(screen.getByPlaceholderText(/email/i)).toHaveAttribute("type", "email");
  expect(screen.queryAllByTestId("person")).toHaveLength(0);
});

it("adds a valid contact", () => {
  render(<App />);
  fill("Ana", "1234567890", "ana@example.com");
  expect(window.alert).toHaveBeenCalledWith("Successfully Added");
  expect(screen.getAllByTestId("person")).toHaveLength(1);
  expect(screen.getByTestId("person-id")).toHaveTextContent("1");
});

it.each([["Ana", "12345", "ana@example.com"], ["", "", ""], ["Ana", "1234567890", "nope"]])(
  "rejects invalid input %s %s %s", (n, p, e) => {
    render(<App />);
    fill(n, p, e);
    expect(window.alert).toHaveBeenCalledWith("Enter Valid Data");
    expect(screen.queryAllByTestId("person")).toHaveLength(0);
  });
```

## Attempt log

| Date | Language | Score | Failed | Lesson |
|---|---|---|---|---|
