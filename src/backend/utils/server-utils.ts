// server utils
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'
import connect from "@/lib/db-connect";

// protecting and restricting roots
import {protect, restrictTo} from "./auth"; 

const response = (code: number, status: string, 
        data?: any, message?: string, count?: number) => {
    let res: any = {
        status, 
    }
    if (message) res.message = message; 
    if (data) res.data = data; 
    if (data && count) res.data.count = count; 
 
    return NextResponse.json(res, {status: code})
}

export const responseWrapper = async (request: NextRequest, cb: (user?: any) => any, authenticate = false, roles = []) => {
    try {
        let conn = await connect(); 
        if (!conn) throw new Error("Server error");

        let user; 
        // check if the user is logged in
        if (authenticate) {
            let res: any = await protect(request); 
            if (res.status === "failed") {
                return response(res.code, "error", null, res.message)
            } else user = res.user; 
        } 
        // check to see if the user can access the resource
        if (roles.length > 0) {
            let res: any = await restrictTo(roles, user); 
            if (res.status === "failed") {
                return response(res.code, "error", null, res.message)
            }
        }

        return await cb(user) 
    } catch (err: any) {
        let message = "Server error!"; 
         
        if (err.code === 11000)  message = parseDuplicateKeyError(new Error(err.message))
        if (err.message.includes("validation failed")) message = extractErrorMessage(err.message)
        return response(400, "error", null, message)
    }
}

export default response; 

// error handling
function parseDuplicateKeyError(error: any) {
    const duplicateKeyErrorRegex = /duplicate key error collection: (\w+)\.(\w+) index: (\w+)_\d+ dup key: { (\w+): "([^"]+)" }/;
  
    const match = error.message.match(duplicateKeyErrorRegex);
  
    if (match) {
        const [, database, collection, index, key, value] = match;
        return `The ${key} '${value}' already exists.`;
    }
  
    return 'An error occurred.';
  }

  function extractErrorMessage(error: string) {
    const arr = error.split(':');
    return arr[arr.length - 1].trim();
  }