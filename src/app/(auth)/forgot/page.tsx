import type { Metadata } from 'next'
 
import AuthForm from "@/components/forms/auth"; 
import Container from "../components/Container"
import TextLinks from "../components/TextLinks";

import {generateStaticMetadata} from "@/functions/metadata"; 
 
export const metadata: Metadata = generateStaticMetadata('Forgot password');

const Forgot = () => {
    return ( 
        <Container title='Forgot Password?'>
            <AuthForm 
                screen='forgot'
                buttonText='Request token'
                values={{email: ""}}
            />
            <div className='flex flex-col gap-2 my-4'>
                <TextLinks 
                    link='/login'
                    text="Login to account"
                />
            </div>
        </Container>
     );
}
 
export default Forgot;