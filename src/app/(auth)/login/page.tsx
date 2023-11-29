import React from "react";
import type { Metadata } from 'next'
 
import AuthForm from "@/components/forms/auth"; 
import Container from "../components/Container"
import Socials from "../components/Socials";
import TextLinks from "../components/TextLinks";

import {generateStaticMetadata} from "@/functions/metadata"; 

export const metadata: Metadata = generateStaticMetadata('Login')

const Login =  () => {
  
    return ( 
        <Container title="Login">
            <AuthForm 
                screen='login'
                buttonText='Login'
                values={{email: "", password: ""}}
            />
            <Socials />
            <div className='flex flex-col gap-2 my-4'>
                <TextLinks 
                    link='/register'
                    text="Don't have an account?"
                />
                <TextLinks 
                    link='/forgot'
                    text="Forgot Password"
                />
            </div>
        </Container>
     );
}
 
export default Login;