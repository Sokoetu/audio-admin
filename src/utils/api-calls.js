/* get, patch, post, and delete functions to use anywhere
 no need to keep calling axios on each api request 
 They also handle the error and can be customized to your own liking
 error notification uses the toast function from sonner package to notify the user on client components only
 in server components it will throw an error, which is caught in the try catch
*/

import {createToast} from "@/functions/toast"; 
import Instance from './axiosInterceptor';
 

export const postDoc = async (url, form, log) => {
  try {
    let res = await Instance.post (url, form);
    let {data} = res; 
    return data; 
  } catch (err) {
   return handleAuthErr(err, log)
  }
};

export const patchDoc = async (url, form, log) => {
   try {
     let res = await Instance.patch (url, form);
     let {data} = res; 
     return data; 
   } catch (err) {
    return handleAuthErr(err, log)
   }
 };
 
 export const deleteDoc = async (url, log) => {
   try {
    
     let res = await Instance.delete (url);
     let {data} = res; 
     return data; 
   } catch (err) {
      return handleAuthErr(err, log)
   }
 };

export const getDoc = async (url, log) => {
   try {
      let res = await Instance.get(url); 
      let {data} = res; 
      return data; 
   } catch (err) {
      return handleAuthErr(err, log) 
   }
}

 
// handling errors

const handleAuthErr = (err, log) => {
    let {response} = err;
    let data = response?.data;
    let message = data?.message || data?.errorMessage || "Server Error!"
    if (log) createToast("error", message);
    return {
      status: "fail",
      statusCode: response?.status, 
      message
    }; 
}
