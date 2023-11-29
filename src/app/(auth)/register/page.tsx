import React from "react";
import type { Metadata } from 'next'

import AuthForm from "@/components/forms/auth"; 
import Container from "../components/Container"
import Socials from "../components/Socials";
import TextLinks from "../components/TextLinks";

import {generateStaticMetadata} from "@/functions/metadata"; 

export const metadata: Metadata = generateStaticMetadata('Sign up')

const Register =  () => {
    return ( 
        <Container title='Register'>
            <AuthForm 
                screen='register'
                buttonText='Sign up'
                values={{email: "", name: "", phone: "", password: "", passwordConfirm: ""}}
            />
            <Socials />
            <div className='flex flex-col gap-2 my-4'>
                <TextLinks 
                    link='/login'
                    text="Already have an account?"
                />
            </div>
        </Container>
     );
}
 
export default Register;