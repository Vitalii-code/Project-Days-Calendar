import { jest } from "@jest/globals";
import { eventAsDate } from "./data.mjs";

test("returns the date for an event", () => {
  const log = jest.spyOn(console, "log").mockImplementation(() => { });

  const result = eventAsDate(
    {
      monthName: "October",
      dayName: "Tuesday",
      occurrence: "second",
    },
    2026,
  );

  expect(result).toEqual(new Date(2026, 9, 13));

  log.mockRestore();
});

test("first occurrence when the 1st is the wanted weekday", () => {
  // 1 Jun 2026 is a Monday
  expect(
    eventAsDate(
      { monthName: "June", dayName: "Monday", occurrence: "first" },
      2026,
    ),
  ).toEqual(new Date(2026, 5, 1));
});

test("first occurrence when the weekday is earlier than the 1st's weekday", () => {
  // 1 Oct 2026 is a Thursday, so the first Tuesday is the 6th
  expect(
    eventAsDate(
      {
        monthName: "October",
        dayName: "Tuesday",
        occurrence: "first",
      },
      2026,
    ),
  ).toEqual(new Date(2026, 9, 6));
});
