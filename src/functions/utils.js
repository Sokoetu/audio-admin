/*
  Group of functions that handle util functions
  1. numberWithCommas - generates a comma based number based on the number of zeros 
  2. formatLargeNumber - formats large numbers to human readable
  3. getDaysInMonth - gets the days in a given month in a given year
  4. months - an array that returns formatted months
  5. getCurrentMonth - returns the current month formatted according nto the months array 
  6. get currentMonthDays - returns number of days in current month
   
*/

import {format} from 'date-fns'; 

export const formatDateToString = (date) => {
  return format(new Date(date), "MMM dd, yyyy")
}

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function formatLargeNumber(number = 0) {
  if (number >= 1e9) {
      return (number / 1e9).toFixed(1) + 'B';
  } else if (number >= 1e6) {
      return (number / 1e6).toFixed(1) + 'M';
  } else if (number >= 1e3) {
      return (number / 1e3).toFixed(1) + 'K';
  } else {
      return number.toString();
  }
}

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const getCurrentMonth = (num) => {
  if (num > 12) return null;
  return months[num];
};
let today = new Date();
export const currentMonthDays = getDaysInMonth(
  today.getFullYear(),
  today.getMonth()
);

export function getTimeOfDay() {
  // Get the current hour
  var currentHour = new Date().getHours();

  // Define the time ranges for morning, afternoon, and evening
  var morningStart = 6;
  var afternoonStart = 12;
  var eveningStart = 18;

  // Check the current hour and determine the time of day
  if (currentHour >= morningStart && currentHour < afternoonStart) {
    return "morning";
  } else if (currentHour >= afternoonStart && currentHour < eveningStart) {
    return "afternoon";
  } else {
    return "evening";
  }
}

/*
  For parsing the query parameters 
  You might want to adjust based on your routing 
*/
// get current query items
// just examples 
export const getQueryItems = (query) => {
  /*
    Takes in the query string, and filters out the page, q, and category, to get the other query items
  */
  if (!query) return [];
  let arr = [];
  for (const [key] of query.entries()) {
    arr.push(key);
  }
  if (arr.indexOf("page") !== -1) arr = arr.filter((itm) => itm !== "page");
  if (arr.indexOf("q") !== -1) arr = arr.filter((itm) => itm !== "q");
  if (arr.indexOf("category") !== -1)
    arr = arr.filter((itm) => itm !== "category");
  return arr;
};

// generate url query
export const generateQueryString = (fields, entries, list) => {
  /* 
    Takes in the fields, current entries in the query, and a list of what is expected to generate a query string
    Again, just an example, you can customize it based on how you want
  */
  let queryString = "?";
  let currQueryArr = [];

  for (const [key, value] of entries) {
    currQueryArr.push(`${key}=${value}`);
    if (fields.includes(key) && !list.includes(key))
      currQueryArr = currQueryArr.filter((item) => item !== `${key}=${value}`);
  }

  for (let i = 0; i < list.length; i++) {
    let curr = `${list[i]}=1`;
    if (!currQueryArr.includes(curr)) currQueryArr.push(curr);
  }
  queryString += currQueryArr.join("&");

  return queryString;
};

export const generateServerQueryString = (searchParams) => {
  // query string to send to server
  let queryString = "?";
  let keys = Object.keys(searchParams);

  for (let i = 0; i < keys.length; i++) {
    let curr = keys[i];
    queryString += `${curr}=${searchParams[curr]}&`;
  }

  if (queryString.endsWith("&"))
    queryString = queryString.slice(0, queryString.length - 1);
  return queryString;
};

// custom close on click outside of popover or modal
export const clickOutsideRef = (content_ref, setOpen) => {
  document?.addEventListener("mousedown", (e) => {
    if (content_ref?.current && !content_ref.current.contains(e.target)) {
      setOpen(false);
    }
  });
};


