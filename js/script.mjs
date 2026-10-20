import {
  daysOfWeek,
  getCurrentMonthAndYear,
  getDaysInMonth,
  getFirstDayOffset,
  monthNames,
} from "./common.mjs";
import { eventAsDate, getEvents } from "./data.mjs";

function buildCalendar(year, month) {
  // set up
  currentMonth = month;
  currentYear = year;

  populateMonthSelect(monthSelect, month);
  populateYearSelect(yearSelect, year);

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

  let mockObj = getEvents();

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

function populateMonthSelect() {
  monthSelect.replaceChildren();

  let i = 0;
  for (const monthName of monthNames) {
    const option = document.createElement("option");
    option.textContent = monthName;
    option.value = monthNames.indexOf(monthName);

    monthSelect.appendChild(option);

    i++;
  }

  monthSelect.value = currentMonth;
}

function populateYearSelect() {
  yearSelect.replaceChildren();

  for (let year = 2026; year >= 2000; year--) {
    const option = document.createElement("option");
    option.textContent = year;
    option.value = year;

    yearSelect.appendChild(option);
  }

  yearSelect.value = currentYear;
}

// GLOBALS
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");

let currentMonth = null;
let currentYear = null;

function init() {
  // month heading
  const { month, year } = getCurrentMonthAndYear();

  buildCalendar(year, month);
}

// year and month select element
const form = document.getElementById("year-month-submit");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const year = document.getElementById("year-select").value;
  const month = document.getElementById("month-select").value;

  buildCalendar(year, month);
});

const backButton = document.getElementById("back-button");
backButton.addEventListener("click", () => {
  const newMonth = currentMonth - 1;

  buildCalendar(currentYear, newMonth);
});

const forwardButton = document.getElementById("forward-button");
forwardButton.addEventListener("click", () => {
  const newMonth = currentMonth + 1;

  buildCalendar(currentYear, newMonth);
});

init();
