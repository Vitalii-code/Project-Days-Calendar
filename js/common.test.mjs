import {
  daysOfWeek,
  getCurrentMonthAndYear,
  getDaysInMonth,
  getFirstDayOffset,
  monthNames,
} from "./common.mjs";

test("days and month names are in calendar order", () => {
  expect(daysOfWeek).toEqual([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);
  expect(monthNames[0]).toBe("January");
  expect(monthNames[11]).toBe("December");
});

test("returns the current month and year", () => {
  const now = new Date();

  expect(getCurrentMonthAndYear()).toEqual({
    month: now.getMonth(),
    year: now.getFullYear(),
  });
});

test("returns the number of days in a month", () => {
  expect(getDaysInMonth(2024, 1)).toBe(29);
  expect(getDaysInMonth(2025, 1)).toBe(28);
  expect(getDaysInMonth(2025, 3)).toBe(30);
  expect(getDaysInMonth(2025, 6)).toBe(31);
});

test("returns the offset for the first day of a month", () => {
  expect(getFirstDayOffset(2026, 1)).toBe(0);
  expect(getFirstDayOffset(2025, 1)).toBe(5);
  expect(getFirstDayOffset(2025, 4)).toBe(3);
  expect(getFirstDayOffset(2024, 11)).toBe(0);
});
