import * as React from "react"; 

import { Hr, Button, Text } from "@react-email/components";

import MailBaseTemplate from "./base-template"; 

import { generateBaseURL } from "./utils";

interface PasswordResetProps {
    token: string; 
    name: string; 
}

export  const  PasswordReset: React.FC<Readonly<PasswordResetProps>> = ({name, token}) => {
    let url = generateBaseURL(); 

    let href = `${url}/reset?token=${token}`;

    return (
        <MailBaseTemplate title="Password Reset Token">
            <Text className="text-md my-2">{`Hello ${name}`}</Text>
            <Text className="text-sm my-2">
                A password reset token was generated for your account. It is only valid for 10 minutes. Click below to reset password.
            </Text>
            <Button
                href={href}
                className="bg-brand px-3 py-2 my-2 font-medium leading-4 text-white rounded-md"
            >
                Reset password
            </Button>
            <Hr />
            <Text className="text-sm my-2">
                You received this email because a password reset was requests on your account.
            </Text>
            <Text className="text-sm my-2">
                Ignore it if you never requested
            </Text>
        </MailBaseTemplate>
    )
}
