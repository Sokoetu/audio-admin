"use client"; 
import React from "react";
import Link from "next/link";

import CookieConsent from "react-cookie-consent";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { getCookie, setCookie } from "@/helpers/cookie-helpers";

const CookieConsentOption = ({}) => {
    const [consent, setConsent] = React.useState(true);

    React.useEffect(() => {
        let consentCookie = getCookie("_consent"); 
        if (!consentCookie) setConsent(false); 
    }, [])
    
    const handleConsent = () => {
        setConsent(true); 
        let expires = new Date(); 
        expires.setDate(expires.getDate() + 1000); 
        setCookie("_consent", "_", { expires})
    }

    
    return (
        <>
            {
                !consent && (
                    <CookieConsent
                        location="bottom"
                        buttonText="Sure man!!"
                        cookieName="_consent"
                        style={{ background: "transparent", width: "fit-content" }}
                        buttonStyle={{ display: 'none' }}
                    >
                        <Card className='w-[380px] h-fit p-4 flex flex-col gap-2'>
                            <CardTitle className='font-bold text-md text-center my-2'>Cookie Consent Form</CardTitle>
                            <Separator />
                            <CardContent className='p-0 my-4'>
                                <p className='text-justify text-xs'>
                                    This site uses cookies to enhance your experience. Only the necessary cookies are required. Click 
                                    &nbsp;<Link href={"#"} className={'underline'} title={`cookie policy`}>here</Link> &nbsp;
                                    to read through the cookie policy.
                                </p>
                            </CardContent>
                            <CardFooter className='p-0 w-full flex gap-2'>
                                 
                                <Button className='flex-1' variant='outline' onClick={handleConsent}>Accept</Button>
                            </CardFooter>
                        </Card>
                    </CookieConsent>
                )
            }
        </>
)}

export default CookieConsentOption; 