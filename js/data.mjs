import data from "../json/days.json" with { type: "json" };
import { daysOfWeek, monthNames } from "./common.mjs";

export function getEvents() {
  return data;
}

const occurrences = ["first", "second", "third", "fourth"];

// return the Date on which the event occurred
export function eventAsDate(obj, year) {
  const monthIndex = monthNames.indexOf(obj.monthName);
  const targetWeekday = daysOfWeek.indexOf(obj.dayName);
  const occurrenceNumber = occurrences.indexOf(obj.occurrence);

  // weekday of the 1st of the month (0 = Sunday, matching getDay())
  const firstWeekday = new Date(year, monthIndex, 1).getDay();

  // days from the 1st to the first matching weekday
  const firstMatch = 1 + ((targetWeekday - firstWeekday + 7) % 7);

  // each further occurrence is 7 days later
  const day = firstMatch + occurrenceNumber * 7;

  return new Date(year, monthIndex, day);
}
