/* get, patch, post, and delete functions to use anywhere
 no need to keep calling axios on each api request 
 They also handle the error and can be customized to your own liking
 error notification uses the toast function from sonner package to notify the user on client components only
 in server components it will throw an error, which is caught in the try catch
*/

import {createToast} from "@/functions/toast"; 
import Instance from '@/helpers/axios-interceptor';
import { removeCookie } from "@/helpers/cookie-helpers";
 

export const postDoc = async (url: string, form: any, log: boolean = false) => {
  try {
    let res = await Instance.post (url, form);
    let {data} = res; 
    return data; 
  } catch (err) {
   return handleAuthErr(err, log)
  }
};

export const patchDoc = async (url: string, form: any, log: boolean = false) => {
   try {
     let res = await Instance.patch (url, form);
     let {data} = res; 
     return data; 
   } catch (err) {
    return handleAuthErr(err, log)
   }
 };
 
 export const deleteDoc = async (url: string, log: boolean = false) => {
   try {
    
     let res = await Instance.delete (url);
     let {data} = res; 
     return data; 
   } catch (err) {
      return handleAuthErr(err, log)
   }
 };

export const getDoc = async (url: string, log: boolean = false) => {
   try {
      let res = await Instance.get(url); 
      let {data} = res; 
      return data; 
   } catch (err) {
      return handleAuthErr(err, log) 
   }
}

 
// handling errors

const handleAuthErr = (err: any, log: boolean = false) => {
    let {response} = err;
    let data = response?.data;
    let message = data?.message || data?.errorMessage || "Server Error!"; 
    let code = response?.status || 400; 
    if (log) createToast("error", message);

    // handle 403 - forbidden and 401 unauthorized errors
    // by removing the user details and prompting for login
    if (code === 403 || code === 401) {
      let currentUrl = window.location.href; 
      if (!currentUrl.includes("/register")) {
        window.location.assign("/login")
        
        removeCookie("_auth"); 
        removeCookie("_auth_state")
        removeCookie("_auth_storage")
        removeCookie("_auth_type")
      }
    }

    return {
      status: "fail",
      statusCode: code, 
      message
    }; 
}
