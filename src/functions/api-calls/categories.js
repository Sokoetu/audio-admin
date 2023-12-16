import {getDoc, postDoc} from "@/utils/api-calls"; 

// add category
export const addCategory = async (category) => {
    const res = await postDoc (`/books/categories/add`, {category}, true);
    return res?.status === "success" || false; 
};

// get  categories
export const getCategories = async () => {
    let res = await getDoc("/books/list/categories",  true); 
    return res?.data?.docs || []; 
}