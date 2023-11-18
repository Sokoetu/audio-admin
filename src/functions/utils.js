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
export let currentMonthDays = getDaysInMonth(
  today.getFullYear(),
  today.getMonth()
);
export let currentMonth = getCurrentMonth(today.getMonth());

// get current query items
export const getQueryItems = (query) => {
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

// custom close on click outside of popover - specifically for search
export const clickOutsideRef = (content_ref, setOpen) => {
  document?.addEventListener("mousedown", (e) => {
    if (content_ref?.current && !content_ref.current.contains(e.target)) {
      setOpen(false);
    }
  });
};
