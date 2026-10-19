import { getCurrentMonthAndYear, getDaysInMonth } from "./common.mjs";

window.onload = function () {
  const { month, year } = getCurrentMonthAndYear();

  const monthName = new Date(year, month).toLocaleString("en-GB", {
    month: "long",
  });

  const numberOfDays = getDaysInMonth(year, month);
  const calendar = document.querySelector("#calendar");

  for (let day = 1; day <= numberOfDays; day++) {
    const dayElement = document.createElement("div");
    dayElement.innerText = day;
    calendar.appendChild(dayElement);
  }
  document.querySelector("#month-heading").innerText = `${monthName} ${year}`;
};
