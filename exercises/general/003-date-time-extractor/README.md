---
id: 003
title: Date and time extractor
source: HackerRank
level: medium (tags: regex)
status: todo
---

# 003. Date and time extractor

## Statement

Write `extract_datetime(dateTimeString: str) -> str` that parses one of three formats
and returns the components as a string. Month is numeric (1 to 12) or a full month
name, case-insensitive.

Accepted formats:

- `YYYY-MM-DD HH:mm:ss`
- `YYYY/MM/DD HH:mm:ss`
- `DD Month YYYY HH:mm:ss`

Return format, month always numeric without leading zero:

```
Year: <year>, Month: <month>, Day: <day>, Hour: <hour>, Minute: <minute>, Second: <second>
```

Errors, as exceptions with these exact messages:

| Condition | Exception | Message |
|---|---|---|
| String matches none of the formats | `InvalidDateFormat` | `Invalid date and time format` |
| Date or time values out of range | `InvalidDateFormat` | `Invalid date or time values` |
| Month name not a real month | `InvalidMonthName` | `Invalid month name` |

Constraints: year four digits; day, hour, minute, second two digits; hour 00 to 23;
minute and second 00 to 59. The harness prints `str(exception)` on error.

## Examples

| Input | Output |
|---|---|
| `2024/02/21 12:30:45` | `Year: 2024, Month: 2, Day: 21, Hour: 12, Minute: 30, Second: 45` |
| `2024/02/41 25:70:90` | `Invalid date or time values` |

## Test spec

15 hidden cases: 3 sample, 2 easy, 5 medium, 5 hard (hard cases weigh 7 to 9 points
each). Cover at least:

| # | Behavior | Expected |
|---|---|---|
| 1 | Numeric format with `-` | components |
| 2 | Numeric format with `/` | components |
| 3 | Named month, mixed case (`21 FEBRUARY 2024 12:30:45`) | `Month: 2` |
| 4 | Mixed separators (`2024-02/21 12:30:45`) | `Invalid date and time format` |
| 5 | Wrong separator in time or missing seconds | `Invalid date and time format` |
| 6 | Day 31 in a 30-day month, Feb 29 in a non-leap year | `Invalid date or time values` |
| 7 | Feb 29 in a leap year | components |
| 8 | Hour 24, minute 60, second 60 | `Invalid date or time values` |
| 9 | Month 00 or 13 in numeric format | `Invalid date or time values` |
| 10 | Month name misspelled (`Febuary`) | `Invalid month name` |
| 11 | Month name abbreviated (`Feb`) | `Invalid month name` |
| 12 | Leading or trailing whitespace | decide and be consistent; strip is the safe choice |
| 13 | Single-digit day or month in numeric format | `Invalid date and time format` |
| 14 | Year with 3 or 5 digits | `Invalid date and time format` |
| 15 | Extra text after the time | `Invalid date and time format` |

Order of checks matters: shape first (format error), then month name, then range
validation. Range validation is cheapest and safest through `datetime(...)`: it knows
leap years and days per month.

## Setup

Python, `pytest`:

```python
# code/test_solution.py
import pytest
from solution import extract_datetime, InvalidDateFormat, InvalidMonthName

OK = "Year: 2024, Month: 2, Day: 21, Hour: 12, Minute: 30, Second: 45"


@pytest.mark.parametrize("s", ["2024-02-21 12:30:45", "2024/02/21 12:30:45",
                               "21 February 2024 12:30:45", "21 FEBRUARY 2024 12:30:45"])
def test_valid(s):
    assert extract_datetime(s) == OK


@pytest.mark.parametrize("s", ["2024-02/21 12:30:45", "2024-2-21 12:30:45",
                               "2024-02-21 12:30", "2024-02-21 12:30:45 extra"])
def test_format_error(s):
    with pytest.raises(InvalidDateFormat, match="Invalid date and time format"):
        extract_datetime(s)


@pytest.mark.parametrize("s", ["2024/02/41 25:70:90", "2023-02-29 00:00:00",
                               "2024-13-01 00:00:00", "2024-04-31 00:00:00"])
def test_value_error(s):
    with pytest.raises(InvalidDateFormat, match="Invalid date or time values"):
        extract_datetime(s)


@pytest.mark.parametrize("s", ["21 Febuary 2024 12:30:45", "21 Feb 2024 12:30:45"])
def test_month_name(s):
    with pytest.raises(InvalidMonthName, match="Invalid month name"):
        extract_datetime(s)


def test_leap_year():
    assert "Day: 29" in extract_datetime("2024-02-29 00:00:00")
```

## Attempt log

| Date | Language | Score | Failed | Lesson |
|---|---|---|---|---|
