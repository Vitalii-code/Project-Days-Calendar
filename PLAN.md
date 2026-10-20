# Days calendar project plan

Status markers: `[x]` complete, `[~]` started but incomplete, `[ ]` not started.

The repository currently has the supplied data, a basic browser entry point, a
date helper for first-to-fourth weekday occurrences, and initial Jest tests.
The calendar UI is still a partial implementation: it renders a heading and
day cells, but does not yet render a correct Sunday-first calendar or the
commemorative events.

## 1. Setup and delivery

- [x] Keep the supplied `days.json` data and project scaffolding in the repo
- [ ] Add automatic deployment on merge (for example, GitHub Pages via Actions)
- [ ] Document or add a local HTTP serving command for ES modules

## 2. Date logic and tests

- [x] Read the month, weekday, and occurrence fields from `days.json`
- [~] Resolve an event pattern to an exact date without hard-coded event names
- [ ] Support the `last` weekday occurrence as well as first through fourth
- [ ] Make date calculations timezone/DST-safe (use UTC or a stable
  construction strategy)
- [~] Keep shared date-logic tests, expanding them to cover:
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
- [~] Render the calendar cells through DOM manipulation rather than
  hand-written day cells
- [ ] Render weekday headers and month days in the correct Sunday-first grid
- [ ] Generate and display every applicable commemorative day from the JSON
- [x] Default to the current month on initial load
- [ ] Remove placeholder output, including the hard-coded first-day label and
  debug logging

## 4. Navigation and date selection

- [ ] Add previous and next buttons with unlimited month/year rollover
- [ ] Add month and year controls for jumping directly to a month
- [ ] Keep controls, heading, and grid synchronized after every navigation
- [ ] Ensure the UI never displays `undefined`, `null`, or `NaN`
- [ ] Verify years such as 1900 and 2050

## 5. Accessibility and cleanup

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

- [ ] Confirm the deployed site works after the latest merge
- [ ] Submit the GitHub repository link and deployed site link
- [ ] Check the project submission requirements
- [ ] Complete a final pass against the rubric
