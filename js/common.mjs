export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function getCurrentMonthAndYear() {
  const today = new Date();

  const month = today.getMonth();
  const year = today.getFullYear();

  return { month, year };
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOffset(year, month) {
  const result = (new Date(year, month, 1).getDay() + 6) % 7;

  // we don't need to offset by 6 because it just wastes space
  if (result >= 6) {
    return 0;
  }

  return result; // Monday = 0
}
