// for handling cookies, setting, getting, and removing

import * as CookieHandlers from 'cookies-next'; 

const setCookie = (title: string, value: string | number, options: any) => {
    CookieHandlers.setCookie(title, value, options); 
 }

 const getCookie = (title: string) => {
    if (CookieHandlers.hasCookie(title)) {
       return CookieHandlers.getCookie(title);
    } else {
       return null
    }
 }
 const removeCookie = (title: string, options: any) => {
    if (CookieHandlers.hasCookie(title, options)) {
        CookieHandlers.deleteCookie(title, options); 
    }
 }

 export {
    setCookie, getCookie, removeCookie
 }