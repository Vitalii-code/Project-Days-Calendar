import {
  daysOfWeek,
  firstSelectableYear,
  getCurrentMonthAndYear,
  getDaysInMonth,
  getFirstDayOffset,
  lastSelectableYear,
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

  const appendRow = (cells) => {
    const row = document.createElement("div");
    row.className = "calendar-row";
    row.setAttribute("role", "row");
    for (const cell of cells) {
      row.appendChild(cell);
    }
    calendar.appendChild(row);
  };

  // add days of the week, starting from Sunday
  const dayHeaders = [];
  for (let i = 6; i < 13; i++) {
    const clone = dayTemplate.content.cloneNode(true);
    const day = clone.querySelector(".day");
    day.setAttribute("role", "columnheader");
    day.setAttribute("aria-label", daysOfWeek[i % 7]);
    clone.querySelector(".day-title").classList.add("top-row");
    clone.querySelector(".day-title").textContent = daysOfWeek[i % 7];
    dayHeaders.push(clone);
  }
  appendRow(dayHeaders);

  // what day of the week is the first of this month?
  const firstDayOffset = getFirstDayOffset(year, month);
  const days = [];
  if (firstDayOffset != 0) {
    // pad the first few days with empty cells
    for (let i = 0; i < firstDayOffset; i++) {
      const clone = dayTemplate.content.cloneNode(true);
      const day = clone.querySelector(".day");
      day.removeAttribute("role");
      day.setAttribute("aria-hidden", "true");
      days.push(clone);
    }
  }

  const numberOfDays = getDaysInMonth(year, month);
  // add days of the month
  for (let day = 1; day <= numberOfDays; day++) {
    const clone = dayTemplate.content.cloneNode(true);
    const dayCell = clone.querySelector(".day");
    clone.querySelector(".day-number").textContent = day;
    dayCell.setAttribute("aria-label", `${monthNames[month]} ${day}, ${year}`);

    // check if the month of an event is current month
    for (const event of getEvents()) {
      const date = eventAsDate(event, year);

      if (date.getDate() === day && date.getMonth() === month) {
        clone.querySelector(".day-title").textContent = event.name;
        dayCell.setAttribute(
          "aria-label",
          `${event.name}, ${monthNames[month]} ${day}, ${year}`,
        );
      }
    }

    days.push(clone);
  }

  for (let i = 0; i < days.length; i += 7) {
    appendRow(days.slice(i, i + 7));
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

  for (let year = lastSelectableYear; year >= firstSelectableYear; year--) {
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

  buildCalendar(Number(year), Number(month));
});

const backButton = document.getElementById("back-button");
backButton.addEventListener("click", () => {
  if (currentMonth > 0) {
    const newMonth = Number(currentMonth) - 1;
    buildCalendar(currentYear, newMonth);
  }
});

const forwardButton = document.getElementById("forward-button");
forwardButton.addEventListener("click", () => {
  if (currentMonth < 11) {
    const newMonth = Number(currentMonth) + 1;

    buildCalendar(currentYear, newMonth);
  }
});

init();
