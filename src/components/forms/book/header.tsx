import React from 'react'
import { useRouter } from 'next/navigation';

import { PlusCircle, Trash } from 'lucide-react';

import {Button} from '@/components/ui/button';
import Combobox from "../components/combo-box"; 

// import {PostPreview} from '@/components/sheets'; 

import Confirm from "@/components/modals/confirm"; 
import Sections from '@/components/sheets/sections-sheet';
// import {handleDelete} from "./functions";

import AddCategory from '@/components/modals/add-category';
import { useAuthUser } from '@/hooks/authHooks';

// import { BlogItem } from '@/types';

interface HeaderProps {
    categories: {label: string, value: string}[];
    category: string | null; 
    loading: boolean; 
    setLoading: React.Dispatch<boolean>; 
    initialData: any; 
    setCategory: React.Dispatch<string>; 
    sections: any; 
    setSections: React.Dispatch<any[]>;
}

const Header: React.FC<HeaderProps> = ({categories, category, loading, 
    initialData, setCategory, setLoading, setSections, sections}) => {
    
    const {push, refresh} = useRouter();
    const auth = useAuthUser(); 
    const user = auth(); 

    const [deletePostModal, setDeletePostModal] = React.useState<boolean>(false);
    const [addCategoryModal, setAddCategoryModal] = React.useState<boolean>(false); 

    return (
        <>
            <Confirm 
                title="Delete Post" 
                description='This action is irreversible.'
                isOpen={deletePostModal}
                onClose={() => setDeletePostModal(false)}
            >
                <Button 
                    disabled={loading}
                    variant="destructive" 
                    className='w-full'
                    // onClick={() => handleDelete(initialData.id, setLoading, push, refresh)}    
                >
                    Delete
                </Button>
            </Confirm>
            <AddCategory 
                isOpen={addCategoryModal}
                onClose={() => setAddCategoryModal(false)}
            />
            <div className='flex items-center justify-between w-full'>
                <Buttons 
                    loading={loading}
                    initialData={initialData}
                    setDeletePostModal={setDeletePostModal}
                    sections={sections}
                    setSections={setSections}
                    // post={postPreview}
                    // setPost={setPostPreview}
                />
            </div>
            <p className='my-2'>
                <Combobox 
                    title='category'
                    values={categories}
                    value={category} 
                    setValue={setCategory}
                    component={
                        <>
                            {
                                (user?.role === "main" || user?.role === "admin") && (
                                    <Button 
                                        className="flex items-center gap-2 my-1 w-[95%] mx-auto"
                                        variant="ghost"
                                        onClick={() => setAddCategoryModal(true)}
                                    >
                                            <PlusCircle className='w-5 h-5' /> Add Category
                                    </Button>
                                )
                            }
                        </>
                    }
                />
            </p>
        </>
    )
}

const Buttons = ({loading, initialData, setDeletePostModal, sections, setSections}: 
    {loading: boolean, initialData: any, 
        setDeletePostModal: React.Dispatch<boolean>, 
        sections: any[], setSections: React.Dispatch<any[]>
    }
) => {

    return (
        <div className='w-full flex items-center justify-end gap-2 my-2'>
            {/* <Button 
                disabled={loading}
                type='button' 
                variant={'outline'}
            >
                Sections
            </Button> */}
            <Sections 
                sections={sections}
                setSections={setSections}
            /> 
            <Button 
                disabled={loading}
                type='submit' 
                variant={'secondary'}
            >
                {initialData ? "Update": "Post"}
            </Button>
            {
                initialData && (
                    <Button 
                        disabled={loading}
                        variant='destructive' 
                        size={'icon'} 
                        type='button'
                        onClick={() => setDeletePostModal(true)}
                    >
                        <Trash className='w-5 h-5'/>
                    </Button>
                )
            }
        </div>
    )
}; 

 

export default Header; 