export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const firstSelectableYear = 1900;
export const lastSelectableYear = 2026;

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
  // Return the number of empty boxes before the first day (Sunday = 0)
  return new Date(year, month, 1).getDay();
}
