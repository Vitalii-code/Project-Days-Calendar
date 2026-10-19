export function getCurrentMonthAndYear() {
  const today = new Date();

  const month = today.getMonth();
  const year = today.getFullYear();

  return { month, year };
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
