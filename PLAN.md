# Days calendar project plan

Status markers: `[x]` complete, `[~]` started but incomplete, `[ ]` not
started.

Current status: the project has a basic styled calendar page, a local
`serve` script, month/year selectors, shared date helpers, and seven passing
unit tests. The browser implementation still contains placeholder rendering,
does not show commemorative events, and does not yet have working navigation.

## 1. Setup and delivery

- [x] Keep the supplied `days.json` data and project scaffolding in the repo
- [x] Add a local HTTP command for ES modules: `pnpm serve`
- [x] Add automatic deployment on merge (for example, GitHub Pages via Actions)
- [x] Confirm the deployed site works after the latest merge

## 2. Date logic and tests

- [x] Read month, weekday, and occurrence fields from `days.json`
- [~] Resolve an event pattern to an exact date without hard-coded event names
- [ ] Support the `last` weekday occurrence as well as first through fourth
- [ ] Make date calculations timezone/DST-safe using UTC or another stable
      construction strategy
- [~] Expand tests to cover:
  - Ada Lovelace Day on 2024-10-08, 2025-10-14, and 2020-10-13
  - World Lemur Day on 2024-10-25 and 2020-10-30
  - International Binturong Day on 2030-05-11
  - an event pattern not present in the JSON, such as first Sunday of May
- [ ] Validate invalid or out-of-range patterns explicitly

## 3. Calendar grid and event rendering

- [ ] Add a pure helper that returns the weeks for a month, Sunday first, with
      no unnecessary padding rows
- [ ] Verify the required month shapes:
  - 2024-10 has 5 rows
  - 2024-12 starts on Sunday
  - 2025-02 has 6 leading days
  - 2025-05 starts on Thursday and ends on Saturday
  - 2026-02 is exactly 4 weeks
- [~] Render the calendar cells through DOM manipulation; the current page
  renders headers and day cells but still has incorrect padding behavior
- [ ] Render a correct Sunday-first grid for every month
- [ ] Generate and display every applicable commemorative day from the JSON
- [x] Default to the current month on initial load
- [ ] Remove placeholder code, including the hard-coded first-day label and
      unused event variable
- [ ] Ensure the heading and selectors update whenever the displayed month
      changes

## 4. Navigation and date selection

- [~] Add month/year selectors; the current selectors jump only within the
  initial year range and are not synchronized after rendering
- [ ] Add previous and next buttons with unlimited month/year rollover
- [ ] Make selector submission update the calendar state consistently
- [ ] Ensure the UI never displays `undefined`, `null`, or `NaN`
- [ ] Verify years such as 1900 and 2050, including navigation beyond selector
      limits

## 5. Accessibility and cleanup

- [ ] Add labels and accessible names to the month/year controls and buttons
- [ ] Use semantic, labelled controls and suitable table or grid markup
- [ ] Ensure every month view has sufficient colour contrast and accessible
      names/states
- [ ] Run Lighthouse Desktop Snapshot checks on several month views and reach
      100% accessibility
- [ ] Remove all dead JavaScript and CSS
- [ ] Make sure every remaining line can be explained by the team

## 6. Groups of 2+ only: iCalendar export

- [~] Replace the placeholder `generate-ical.mjs` with a runnable Node script
- [ ] Import the same date-logic module used by the web page
- [ ] Generate `days.ics` with one non-recurring event per JSON day for every
      year from 2020 through 2030 inclusive
- [ ] Use all-day `DTSTART;VALUE=DATE` entries with no start or end times
- [ ] Import the file into a new Google Calendar and compare dates with the UI

## 7. Groups of 3+ only: descriptions

- [ ] Fetch each day's description from its JSON URL
- [ ] Show the description when a commemorative day is clicked, with an
      accessible close mechanism and focus handling
- [ ] Put the fetched description in each iCal `DESCRIPTION` field
- [ ] Verify the Ada Lovelace Day text in both the web page and Google Calendar

## 8. Submission

- [ ] Submit the GitHub repository link and deployed site link
- [ ] Check the project submission requirements
- [ ] Complete a final pass against the rubric
