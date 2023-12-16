"use client"; 
import React from 'react'; 
import { useParams, useRouter } from 'next/navigation';

import FormContainer from "../components/container"; 

// form fields
import values, {formSchema,  BookFormValues} from "./values";
import Header from './header';

import { createToast } from '@/functions/toast';
import { getCategories } from '@/functions/api-calls/categories';
import {handleSubmit} from "./functions"; 

import { useCustomEffect } from '@/hooks';

const BookForm = ({initialData}: {initialData: any}) => {
    const {push, refresh} = useRouter();
    const {postId} = useParams(); 

    const [loading, setLoading] = React.useState<boolean>(false); 

    const [categories, setCategories] = React.useState<{label: string, value: string}[]>([]); 
    const [category, setCategory] = React.useState<string | null>(initialData?.category || null)
    const [sections, setSections] = React.useState<any[]>([]); 

    useCustomEffect(() => {fetchCategories()}, [])
    const fetchCategories = async () => {
        let res = await getCategories(); 

        let cats = res.map((ct: string) => ({value: ct, label: ct}))
        setCategories(cats); 
    }   
    let defaultValues = {
        title: initialData?.title || "",  
        banner: initialData?.banner || [], 
        blurb: initialData?.blurb || "",
        author: initialData?.author || "",
        pages: initialData?.pages || 0,
        amount: initialData?.amount || 0, 
        published: initialData?.published || "", 
    }

    const submitForm = async (data: BookFormValues) => {
        return await handleSubmit(
            data, category, sections, initialData, setLoading, 
            push, refresh
        )
    }

    return (
        <>
            <FormContainer 
               className='px-2'
               formSchema={formSchema} 
               defaultValues={defaultValues}
               buttonPosition={"top"} 
               button={
                    <Header 
                        categories={categories}
                        category={category}
                        loading={loading}
                        setLoading={setLoading}
                        initialData={initialData}
                        setCategory={setCategory}
                        sections={sections}
                        setSections={setSections}
                    />
                }
               values={values}
               loading={loading}
               onSubmit={submitForm}
            
            />
        </>
    )
};

export default BookForm; 