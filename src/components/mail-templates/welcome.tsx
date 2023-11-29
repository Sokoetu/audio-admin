import * as React from "react"; 

import { Hr, Button, Text } from "@react-email/components";

import MailBaseTemplate from "./base-template"; 

import { generateBaseURL } from "./utils";

interface WelcomeEmailProps {
    name: string; 
    token: string; 
}


export  const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({name, token}) => {
    let url = generateBaseURL(); 

    let href = `${url}/welcome?token=${token}`; 

    return (
        <MailBaseTemplate title="Activation Required!"> 
            <Text className="text-lg font-bold my-2">{`Hello ${name}`}</Text>
            <Text className="text-lg font-bold my-2">{`Welcome to ${process.env.NEXT_PUBLIC_COMPANY}`} </Text>
            <Text className="text-sm my-2">
                We are thrilled to have you on board. Before you proceed, click on the link below to activate your account! 
            </Text>
            <Button
                href={href}
                className="bg-brand px-3 py-2 my-2 font-medium leading-4 text-white rounded-md"
            >
                Activate account
            </Button>
            <Hr />
            <Text className="text-sm my-2">
                You received this email because an account with your email was registered on our platform! 
            </Text>
            <Text className="text-sm my-2">
                Ignore it if you never registered 
            </Text>
        </MailBaseTemplate>
    )
}