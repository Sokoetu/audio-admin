import {postDoc} from "@/utils/api-calls";

// add book
export const createBook = async  (data) => {
    let res = await postDoc("/books?type=admin", data, true); 
    return res.status === "success" || false; 
}