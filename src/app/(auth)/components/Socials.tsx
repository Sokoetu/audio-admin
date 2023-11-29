"use client"; 
import Image from "next/image"; 
import {Button} from "@/components/ui/button"; 
import {Separator} from "@/components/ui/separator"; 
import {Typography} from "@/components"; 

import { useTheme } from "next-themes"; 
import {get_social_icon} from "@/assets/icons/socials";
import { createToast } from "@/functions/toast";

const Socials = ({}) => {
    const {theme} = useTheme(); 
    return ( 
        <>
            <div className="flex items-center gap-2 my-4">
                <Separator className='flex-1'/>
                <Typography.H3  title='Or use' className="uppercase text-sm"/>
                <Separator className='flex-1'/>
            </div>
            <div className="flex justify-center w-full flex-wrap gap-2">
              <SocialButton title="google" theme={theme}/>
              <SocialButton title="github" theme={theme}/>
              <SocialButton title="microsoft" theme={theme}/>
              <SocialButton title="apple" theme={theme}/>
              <SocialButton title="instagram" theme={theme}/>
              <SocialButton title="linkedin" theme={theme}/>
              <SocialButton title="twitter" theme={theme}/>
            </div>
            <Separator className="my-2"/>
           
        </>
     );
}
 
export default Socials;

// social button
interface SocialButtonProps {
    title: string; 
    theme?: string; 
}
const SocialButton: React.FC<SocialButtonProps> = ({title, theme = "dark"}) => {

    return (
        <Button
            variant="outline"
            size={"icon"}
            // className=
            onClick={() => createToast("success", "Under construction")}
        >
            <Image 
                alt={`${title} social icon`}
                src={get_social_icon(title, theme)}
                width={30}
                height={30}
                className="w-5 h-5 object-contain"
            />
        </Button>
    )
}