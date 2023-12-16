import {createToast} from "@/functions/toast";
import {createBook} from "@/functions/api-calls/books";

import { BookFormValues } from "./values";

// submitting form 
export const handleSubmit = async (
    data: BookFormValues, category: string | null, sections: any[], initialData: any, 
    setLoading: React.Dispatch<boolean>, push: (val: string) => void, refresh: () => void
) => {
    if (!category) {
        createToast("error", "A category field is required!"); 
        return; 
    }; 
    if (sections.length === 0) {
        createToast("error", "Sections must not be  zero!"); 
        return; 
    }; 
    setLoading(true)
    if (!initialData) {
        let book = {
            ...data, 
            banner: data.banner[0],
            category, sections
        }

        let res = await createBook(book); 
        if (res) {
            createToast("success", "Book added successfully!");
            window.location.reload(); 
        }
        setLoading(false) 
    }
}