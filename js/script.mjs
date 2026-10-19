import {
  daysOfWeek,
  getCurrentMonthAndYear,
  getDaysInMonth,
  getFirstDayOffset,
} from "./common.mjs";
import { eventAsDate, getEvents } from "./data.mjs";

function buildCalendar(year, month) {
  const dayTemplate = document.querySelector("#day-template");
  const calendar = document.querySelector("#calendar");
  const monthHeading = document.querySelector("#month-heading");

  // reset calendar
  calendar.replaceChildren();

  const monthName = new Date(year, month).toLocaleString("en-GB", {
    month: "long",
  });
  monthHeading.innerText = `${monthName} ${year}`;

  // add days of the week, starting from Sunday
  for (let i = 6; i < 13; i++) {
    const clone = dayTemplate.content.cloneNode(true);
    clone.querySelector(".day-title").classList.add("top-row");
    clone.querySelector(".day-title").textContent = daysOfWeek[i % 7];
    calendar.appendChild(clone);
  }

  // what day of the week is the first of this month?
  const firstDayOffset = getFirstDayOffset(year, month);
  if (firstDayOffset != 0) {
    // pad the first few days with empty cells
    for (let i = 0; i < firstDayOffset + 1; i++) {
      const clone = dayTemplate.content.cloneNode(true);
      calendar.appendChild(clone);
    }
  }

  let mockObj = getEvents()[0];

  console.log(eventAsDate(mockObj, year));

  const numberOfDays = getDaysInMonth(year, month);
  // add days of the month
  for (let day = 1; day <= numberOfDays; day++) {
    const clone = dayTemplate.content.cloneNode(true);
    clone.querySelector(".day-number").textContent = day;

    if (day === 1) {
      clone.querySelector(".day-title").textContent = "Important day";
    }

    calendar.appendChild(clone);
  }
}

function init() {
  // month heading
  const { month, year } = getCurrentMonthAndYear();

  buildCalendar(year, month);
}

init();
