// sections sheet
"use client"; 

import React from 'react'; 

import { Button } from "../ui/button";
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import {Separator} from "../ui/separator"; 
import { Typography } from '..';

import SheetContainer from "./container";
import { useCustomEffect } from '@/hooks';
import { ChevronDown, ChevronUp, PlusCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { createToast } from '@/functions/toast';


interface SectionsProps {
    sections: any; 
    setSections: React.Dispatch<any[]>; 
}

const Sections: React.FC<SectionsProps> = ({sections, setSections}) => {
    const [mounted, setMounted] = React.useState<boolean>(false); 
    useCustomEffect(() => {setMounted(true)}, []); 
    const [add, setAdd] = React.useState<boolean>(false); 

    const [title, setTitle] = React.useState<string>("")
    const [text, setText] = React.useState<string>("")

    if (!mounted) return <Button  variant={'outline'} type={"button"}>Sections</Button>;

    const handleSectionAdd = () => {
        if (!title || !text) {
            createToast("error", "Both  title and text are required!");
            return; 
        }
        let updated = [...sections, {title, text}]
        setAdd(false)
        setSections(updated); 
        setTitle("");
        setText("")
    }

    return (
        <SheetContainer
            trigger={
                <span className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'>
                        Sections
                </span>
            }
            width="w-full max-w-[70vw] sm:max-w-[70vw]"
        >
            <div className='mt-6 flex justify-between items-center'>
                <Typography.H2 title={`Sections (${sections.length})`}/>
                <Button variant={"outline"}  size={"icon"} onClick={() => setAdd(!add)}>
                    {
                        add ? <ChevronUp />: <ChevronDown />
                    }
                </Button>
            </div>
            <Separator className='my-2'/>
            {
                add  && (
                    <div>
                        <Input
                            className='focus:border-active-color focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder={"Section title"}
                            type={'text'}
                            value={title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        />
                        <Textarea 
                            className='my-2 focus:border-active-color focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder={"Section text"}
                            value={text}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                        />

                        <Button type="button" onClick={handleSectionAdd}>
                            Add Section
                        </Button>
                    </div>
                )
            }
            <ScrollArea className="h-[80vh]">
                {
                    sections.map((section: any, index: number) => <Section key={index} {...section}/>)
                }
            </ScrollArea>
        </SheetContainer>
    )
}

export default Sections; 

interface SectionProp {
    title: string;
    text: string; 
    file_key?: string; 

}

const Section: React.FC<SectionProp> = ({title, text,  file_key}) => {
    const [open, setOpen] = React.useState<boolean>(false)
    return (
        <Card className="p-2 my-2">
            <div className='flex justify-between items-center'>
                <Typography.H3 title={title} />
                <Button variant={"ghost"}  size={"icon"} onClick={() => setOpen(!open)}>
                    {
                        open ? <ChevronUp />: <ChevronDown />
                    }
                </Button>
            </div>

            {
                open && (
                    <>
                        <Separator className="my-1" />
                        <p>
                            {text}
                        </p>
                    </>
                )
            }
        </Card>
    )
}