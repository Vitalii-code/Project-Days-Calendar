import {
  daysOfWeek,
  getCurrentMonthAndYear,
  getDaysInMonth,
} from "./common.mjs";

function buildCalendar(month, year) {
  const dayTemplate = document.querySelector("#day-template");
  const calendar = document.querySelector("#calendar");

  const numberOfDays = getDaysInMonth(year, month);

  // add days of the week, starting from Sunday
  for (let i = 6; i < 13; i++) {
    const clone = dayTemplate.content.cloneNode(true);
    clone.querySelector(".day-title").classList.add("top-row");
    clone.querySelector(".day-title").textContent = daysOfWeek[i % 7];
    calendar.appendChild(clone);
  }

  // what day is the first of this month?
  // offset by one to match 1-indexing in the loop below

  const fistOfTheMonth = new Date(year, month + 1, 0).getDay() - 1;
  let offset = 0;
  // add days of the month
  for (let day = 1; day <= numberOfDays + offset; day++) {
    const clone = dayTemplate.content.cloneNode(true);
    clone.querySelector(".day-number").textContent = day - offset;

    // calculate the offset somehow? and then add a bunch of empty days
    if (day < fistOfTheMonth) {
      clone.querySelector(".day-number").textContent = "";
      offset += 1;

      // clone.querySelector(".day-title").textContent = "Important day";
    }

    calendar.appendChild(clone);
  }
}

function init() {
  const monthHeading = document.querySelector("#month-heading");

  // month heading
  const { month, year } = getCurrentMonthAndYear();
  const monthName = new Date().toLocaleString("en-GB", {
    month: "long",
  });
  monthHeading.innerText = `${monthName} ${year}`;

  buildCalendar(month, year);
}

init();
