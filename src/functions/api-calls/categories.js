import {getDoc, postDoc} from "@/utils/api-calls"; 

// add category
export const addCategory = async (category) => {
    const res = await postDoc (`/books/categories/add?type=admin`, {category}, true);
    return res?.status === "success" || false; 
};

// get  categories
export const getCategories = async () => {
    let res = await getDoc("/books/list/categories?type=admin",  true); 
    return res?.data?.docs || []; 
}