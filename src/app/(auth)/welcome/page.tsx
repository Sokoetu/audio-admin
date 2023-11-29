import type { Metadata } from 'next'
 
import AuthForm from "@/components/forms/auth"; 
import Container from "../components/Container"
import TextLinks from "../components/TextLinks";

import {generateStaticMetadata} from "@/functions/metadata"; 
 
export const metadata: Metadata = generateStaticMetadata('Welcome');
 
const Activate = () => {

    return ( 
        <Container title='Activate User'>
            <AuthForm 
                screen='welcome'
                buttonText='Request another token'
                values={{email: "" }}
            />
        </Container>
     );
}
 
export default Activate;