# Testing

This file explains how each rubric point was tested.

To run the unit tests:

```bash
npm install
npm test
```

To run the website locally, serve the project folder over HTTP:

```bash
npx http-server
```

Then open the local URL shown in the terminal.

To generate the iCalendar file:

```bash
node js/generate-ical.mjs
```

## Rubric points

| Rubric point                                                    | How it was tested                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| The calendar opens showing the current month                    | Manual test: opened the website and checked that the current month and year were displayed.                                                                                                                                                                        |
| October 2024 displays the correct layout                        | Manual test: opened October 2024 and checked that the calendar contains 5 rows and 7 columns. Checked that the first row starts on Tuesday 1 October and the last row ends on Thursday 31 October, with blank or neighbouring-month cells where appropriate.       |
| Ada Lovelace Day appears on 8 October 2024                      | Manual test: opened October 2024 and checked that Ada Lovelace Day appears on 8 October.                                                                                                                                                                           |
| World Lemur Day appears on 25 October 2024                      | Manual test: opened October 2024 and checked that World Lemur Day appears on 25 October.                                                                                                                                                                           |
| October 2020 shows the correct commemorative days               | Manual test: opened October 2020 and checked that Ada Lovelace Day appears on 13 October and World Lemur Day appears on 30 October.                                                                                                                                |
| May 2030 shows International Binturong Day                      | Manual test: opened May 2030 and checked that International Binturong Day appears on 11 May.                                                                                                                                                                       |
| December 2024 has correct padding                               | Manual test: checked that the month starts on Sunday, with no empty boxes before the first day and 4 empty boxes after the last day.                                                                                                                               |
| February 2025 has correct padding                               | Manual test: checked that the month starts on Saturday, with 6 empty boxes before the first day and 1 empty box after the last day.                                                                                                                                |
| May 2025 has correct padding                                    | Manual test: checked that the month starts on Thursday, with 4 empty boxes before the first day and no empty boxes after the last day.                                                                                                                             |
| February 2026 has correct padding                               | Manual test: checked that the month starts on Sunday, with no empty boxes before or after the month.                                                                                                                                                               |
| Previous and next buttons work correctly                        | Manual test: clicked the previous and next buttons and checked that the displayed month, year and calendar days update correctly, including when moving between December and January.                                                                              |
| Users can jump to a chosen month and year                       | Manual test: selected a month and year using the drop-down menus and submitted the form. Checked that the correct calendar appeared.                                                                                                                               |
| The calendar is generated dynamically                           | Code review: checked that JavaScript creates the calendar days using DOM manipulation and calculates the number of days for each month rather than relying on a fixed list of dates.                                                                               |
| Additional commemorative days can be added to the data          | Code review and manual test: checked that the calendar reads event data from `json/days.json` and generates displayed events from that data.                                                                                                                       |
| The website scores 100% for accessibility in Lighthouse Desktop | Lighthouse test: ran an accessibility audit in Desktop mode and checked the score. Fixed the missing main landmark by placing the calendar content inside a `<main>` element. Re-run the audit to confirm 100% for all relevant views.                             |
| Unit tests cover a non-trivial function                         | Unit tests: `js/common.test.mjs` tests `getFirstDayOffset()` for different months. `js/data.test.mjs` tests `eventAsDate()` for different event-date patterns. Ran `npm test` and confirmed the tests passed after correcting the weekday offset and padding loop. |
| No dead code remains                                            | Code review: reviewed the JavaScript, CSS and HTML files to identify unused functions, styles, imports and placeholder code. Remove any unused code before submission.                                                                                             |
| The iCalendar generator creates `days.ics`                      | Terminal test: ran `node js/generate-ical.mjs` and confirmed that the file was generated with events for 2020–2030.                                                                                                                                                |
| The iCalendar events match the website                          | Manual test: imported `days.ics` into Google Calendar and checked that the event dates matched the website.                                                                                                                                                        |
| iCalendar events are whole-day events                           | Manual test: inspected the imported events in Google Calendar and confirmed that they appear as all-day events without a start or end time.                                                                                                                        |
| The web calendar and iCalendar generator share date logic       | Code review: checked that both use `eventAsDate()` from `js/data.mjs` to calculate commemorative-day dates.                                                                                                                                                        |
