"use client"; 

import {useRouter} from "next/navigation"; 

import { ChevronLeft, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"

const Container = ({children, title}: {children: React.ReactNode, title: string}) => {
    const router = useRouter(); 
    return ( 
        <Card className="w-[400px] p-4 max-sm:w-[98vw]">
            <CardTitle className='my-2 text-center text-md'>{title}</CardTitle>
            <Separator />
            {children}
            {
                title !== 'Activate User' && (
                    <>
                        <Separator className='my-2'/>
                        <CardFooter className='flex gap-2 justify-start items-center p-0'>
                            <Button variant='outline' size='icon' className='cursor-pointer' onClick={() => router.back()}><ChevronLeft className='w-5 h-5'/></Button>
                            <Button variant='outline' size='icon' className='cursor-pointer' onClick={() => router.push('/')}><Home className='w-5 h-5'/></Button>
                        </CardFooter>
                    </>

                )
            }
        </Card>
     );
}
 
export default Container;