const $ = document;

const formElem = $.querySelector("form");
const dayInputElem = $.querySelector("#input-day");
const monthInputElem = $.querySelector("#input-month");
const yearInputElem = $.querySelector("#input-year");
const errResponsElems = $.querySelectorAll(".err-res");

let date;

formElem.addEventListener("submit", (e) => {
  e.preventDefault();
  date = new Date();

  let dayInputVal = dayInputElem.value;
  let monthInputVal = monthInputElem.value;
  let yearInputVal = yearInputElem.value;

  if (dayInputVal && monthInputVal && yearInputVal) {
    validation(dayInputVal, monthInputVal, yearInputVal);
  } else {
    setErrors(1, dayInputVal, monthInputVal, yearInputVal);
  }
});

function validation(day, month, year) {
  let validDay = null;
  let validMonth = null;
  let validYear = null;

  /////////// validation day /////////////////
  if (
    +day > 31 ||
    +day < 1 ||
    (+month === 2 && +day > 28) ||
    (year % 4 == 0 && +month == 2 && +day > 29) ||
    day.length > 2
  ) {
    setErrors(2, day);
  } else {
    validDay = day;
  }
  //////////// validation month ///////////////
  if (month.length > 2 || +month < 1 || +month > 12) {
    setErrors(2, null, month);
  } else {
    validMonth = month;
  }
  //////////// validation year ///////////////
  if (
    year.length > 4 ||
    +year > date.getFullYear() - 1 ||
    +year < date.getFullYear() - 300
  ) {
    setErrors(2, null, null, year);
  } else {
    validYear = year;
  }

  ////////send valid value///////////////
  if (validDay && validMonth && validYear) {
    setAge(validDay, validMonth, validYear);
  }
}

function clac(year, month, day) {
  let years = date.getFullYear() - year;
  let months = date.getMonth() - month;
  let days = date.getDate() - day;

  if (months < 0) {
    years--;
    months = 12 + months;
  }
  if (days < 0) {
    months--
    if (months == 4 || months == 6 || months == 9 || months == 11) {
      days = 30 + days;
    } else if (months == 2) {
      if (year % 4 === 0) {
        days = 29 + days;
      } else {
        days = 28 + days;
      }
    } else days = 31 + days;
    if (months < 0 && days > day){
      months = 12;
    }
  }

  return {year: years, month: months, day: days}
}

function setAge(day, month, year) {
  let yearPlaceElem = $.querySelector("#year")
  let monthPlaceElem = $.querySelector("#month")
  let dayPlaceElem = $.querySelector("#day")

  let age = clac(+year, +month, +day);
  
  yearPlaceElem.innerHTML = age.year
  monthPlaceElem.innerHTML = age.month
  dayPlaceElem.innerHTML = age.day
}

function setErrors(errType, dayVal, monVal, yearVal) {
  formElem.className = "error";
  ///////////////////////////Set Required Warning//////////////////////////////
  if (errType === 1) {
    if (!dayVal) {
      errResponsElems[0].innerHTML = "This field is required";
    }
    if (!monVal) {
      errResponsElems[1].innerHTML = "This field is required";
    }
    if (!yearVal) {
      errResponsElems[2].innerHTML = "This field is required";
    }
  }
  ///////////////////////////Set Not Valid Warning//////////////////////////////
  else {
    if (dayVal) {
      errResponsElems[0].innerHTML = "Must be a valid date";
    }
    if (monVal) {
      errResponsElems[1].innerHTML = "Must be a valid date";
    }
    if (yearVal) {
      errResponsElems[2].innerHTML = "Must be a valid date";
    }
  }
  /////////////////////Clear Warning And Input Value//////////////////////////////
  setTimeout(() => {
    formElem.classList.remove("error");

    errResponsElems.forEach((elem) => {
      elem.innerHTML = "";
    });
    resetForm();
  }, 3e3);
}

function resetForm() {
  dayInputElem.value = "";
  monthInputElem.value = "";
  yearInputElem.value = "";
}
