import React from 'react'
import { useRouter } from 'next/navigation'; 

import {Button} from "@/components/ui/button"; 
import { Input } from '@/components/ui/input';

import { Modal } from "./modal";

// import {createCategory} from "@/functions/api-calls/categories"
import { createToast } from '@/functions/toast';

interface AddCategoryProps {
    isOpen: boolean; 
    onClose: () => void; 
}

const AddCategory: React.FC<AddCategoryProps> = ({isOpen, onClose}) => {
    const {refresh} = useRouter(); 

    const [category, setCategory] = React.useState<string>("");
    const [loading, setLoading]  = React.useState<boolean>(false); 

    const handleCreate = async () => {
        if (!category) {
            createToast("error", "Nothing to create!"); 
            return;
        }
        setLoading(false)
        // let res = await createCategory(category); 
        // if (res) {
        //     createToast("success", "Category added!"); 
        //     onClose(); 
        //     refresh()
        // }; 

        setLoading(false)
    }


    return (
        <Modal
            title="Add Category"
            description="You can only add one category at a time!"
            isOpen={isOpen}
            onClose={onClose}
        >
            <Input 
                className='focus:border-active-color focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                disabled={loading}
                placeholder={"Type category name here..."}
                type={"text"}
                value={category}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
            />

            <Button
                disabled={loading}
                variant={`secondary`}
                className='w-full my-2'
                onClick={handleCreate}
            >
                Creat{loading ? `ing...`: `e`}
            </Button>

        </Modal>
    )
}

export default AddCategory; 