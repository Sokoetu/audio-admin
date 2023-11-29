import * as React from "react"; 

import { Hr, Button, Text } from "@react-email/components";

import MailBaseTemplate from "./base-template"; 

import { generateBaseURL } from "./utils";

interface RegisterUserProps {
    name: string; 
    password: string; 
    role: string; 
}


export  const RegisterUser: React.FC<Readonly<RegisterUserProps>> = ({name, role, password}) => {
    let url = generateBaseURL(); 

    let href = `${url}/login`; 

    return (
        <MailBaseTemplate title="Activation Required!"> 
            <Text className="text-lg font-bold my-2">{`Hello ${name}`}</Text>
            <Text className="text-lg font-bold my-2">{`Welcome to ${process.env.NEXT_PUBLIC_COMPANY}`} </Text>
            <Text className="text-sm my-2">
                We are thrilled to have you on board as {`${role === "admin" ? "an admin": "a writer"}`}. Click on the button and use the password below to login to your account! 
            </Text>
            <Text className="text-sm my-4 font-bold pl-8">
               {password}
            </Text>
            <Button
                href={href}
                className="bg-brand px-3 py-2 my-2 font-medium leading-4 text-white rounded-md"
            >
                Login 
            </Button>
            <Hr />
            <Text className="text-sm my-2">
                Make sure you change your password in the settings page after login! 
            </Text>
        </MailBaseTemplate>
    )
}