/*
  Group of functions that handle util functions
  1. numberWithCommas - generates a comma based number based on the number of zeros 
  2. getDaysInMonth - gets the days in a given month in a given year
  3. months - an array that returns formatted months
  4. getCurrentMonth - returns the current month formatted according nto the months array 
  5. get currentMonthDays - returns number of days in current month
   
*/

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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
