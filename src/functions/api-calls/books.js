import {postDoc} from "@/utils/api-calls";

// add book
export const createBook = async  (data) => {
    let res = await postDoc("/books", data, true); 
    return res.status === "success" || false; 
}