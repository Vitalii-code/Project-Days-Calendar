import { writeFileSync } from "node:fs";
import { getEvents, eventAsDate } from "./data.mjs";

// Set the first and last years to include
const startYear = 2020;
const endYear = 2030;

// Format a date as YYYYMMDD for iCalendar
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

// Escape special characters in event names
function escapeICalText(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

// Start building the iCalendar file
const lines = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Days Calendar//EN",
  "CALSCALE:GREGORIAN",
];

// Get all commemorative days from the JSON data
const events = getEvents();

// Create a separate event for every year and commemorative day
for (let year = startYear; year <= endYear; year++) {
  for (let i = 0; i < events.length; i++) {
    const event = events[i];

    // Calculate the event date using shared project logic
    const date = eventAsDate(event, year);

    // All-day events end on the following date
    const nextDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1,
    );

    // Create the timestamp for when this file is generated
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");

    // Add the event details to the iCalendar file
    lines.push(
      "BEGIN:VEVENT",
      `UID:days-calendar-${year}-${i}@days-calendar.local`,
      `DTSTAMP:${timestamp}`,
      `DTSTART;VALUE=DATE:${formatDate(date)}`,
      `DTEND;VALUE=DATE:${formatDate(nextDay)}`,
      `SUMMARY:${escapeICalText(event.name)}`,
      "END:VEVENT",
    );
  }
}

// Finish the iCalendar file
lines.push("END:VCALENDAR");

// Save days.ics in the main project folder
const output = new URL("../days.ics", import.meta.url);

writeFileSync(output, lines.join("\r\n") + "\r\n", "utf8");

// Confirm how many events were created
console.log(
  `Created days.ics with ${events.length * (endYear - startYear + 1)} events.`,
);
