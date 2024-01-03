// getting user
"use client"; 
import React from 'react'
import { useRouter } from 'next/navigation'; 

import { useCustomEffect } from '@/hooks';
import { useAuthUser } from '@/hooks/authHooks';

import { getUser } from '@/functions/api-calls/user';
import { createToast } from '@/functions/toast';

const Authenticate = ({}) => {
    const [mounted, setMounted] = React.useState(false);
    const auth = useAuthUser(); 
    const {push} = useRouter(); 
    const user = auth(); 

    useCustomEffect(() => {setMounted(true)}, []); 
    useCustomEffect(() => {fetchUser()}, [mounted]); 

    const fetchUser = async () => {
        if (!mounted) return
        if (!user) {
            createToast("error", "You have to be logged in to access the section!");
            push("/login")
            return; 
        }

        let res = await getUser(); 
        if (!res) {
            createToast("error", "You have to be logged in to access the section!");
            push("/login")
            return;
        }
    }
    return (
        <></>
    )
}; 

export default Authenticate; 