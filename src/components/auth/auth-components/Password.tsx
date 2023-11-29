import React from 'react'

import { Eye, EyeOff, Lock } from "lucide-react";
import { FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

interface PasswordProps {
    loading: boolean; 
    field: object; 
}
 
const Password: React.FC<PasswordProps> = ({loading,  field}) => {
    const [type, setType] = React.useState<string>("password")
    return (
        <FormItem>
            <FormControl>
                <>
                    <div className='flex items-center relative'>
                        <Lock className={'absolute top-2.5 left-2 h-5 w-5'}/>
                        <Input 
                            className="pl-8 pr-12"
                            disabled={loading}
                            placeholder={'*******'}
                            type={type}
                            {...field}
                        />
                        <Button 
                            variant="outline" 
                            onClick={() => setType(type === "password" ? "text": "password")} 
                            className='absolute right-0 border-l-0' type="button"
                        >
                            {type === 'password' ? <Eye className='w-4 h-4'/>: <EyeOff className='w-4 h-4'/> }
                        </Button>
                    </div>
                </>
            </FormControl>
        </FormItem>
    );
}
 
export default Password;