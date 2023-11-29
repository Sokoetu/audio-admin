// server utils
import { NextResponse } from 'next/server';
import connect from "@/lib/db-connect";

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

export const responseWrapper = async (cb: () => any, protect = false, roles = []) => {
    try {
        let conn = await connect(); 
        if (!conn) throw new Error("Server error")

        return await cb() 
    } catch (err: any) {
        let message = "Server error!"; 
        console.log(err.message)
        if (err.code === 11000)  message = parseDuplicateKeyError(new Error(err.message))
        if (err.message.includes("validation failed")) message = extractErrorMessage(err.message)
        // if (err.code === 400)
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