import type { Metadata } from 'next'
 
import AuthForm from "@/components/forms/auth"; 
import Container from "../components/Container"
import TextLinks from "../components/TextLinks";

import {generateStaticMetadata} from "@/functions/metadata"; 
 
export const metadata: Metadata = generateStaticMetadata('Reset');
 
const Reset = () => {
    return ( 
        <Container title='Reset Password'>
            <AuthForm 
                screen='reset'
                buttonText='Submit'
                values={{password: "",passwordConfirm: ""}}
            />
            <div className='flex flex-col gap-2 my-4'>
                <TextLinks 
                    link='/login'
                    text="Login to your account"
                />
            </div>
        </Container>
     );
}
 
export default Reset;