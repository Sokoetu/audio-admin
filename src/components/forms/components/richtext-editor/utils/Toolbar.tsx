import React from "react";

import { Button } from "@/components/ui/button";

import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Linking from "./image-link"; 

import utils from "./utils"; 

import {createToast} from "@/functions/toast";

const Toolbar = ({editor}: {editor: any}) => {
    const [promptType, setPromptType] = React.useState<string>("image");
    const [openModal, setOpenModal] = React.useState<boolean>(false); 
    const [url, setUrl] = React.useState<string>("")

    if (!editor) return null

    const handleOpenModal: (str: string) => void = str => {
        setPromptType(str);
        setOpenModal(true);
    };
    const validate = () => {
        if (!url) {
            createToast("error", "Url cannot be empty"); 
            setUrl("")
            return; 
        }
    }
    const addImage = () =>   {
        validate()
        if (url) {
            editor
                .chain()
                .focus()
                .setImage({src: url, title: 'Post image', alt: "post"})
                .run()
        }
        setOpenModal(false);
        setUrl("")
    }
    const setLink = () => {
        validate()
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }
        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        setOpenModal(false);
        setUrl("")
    }

    return (
        <div className='p-2 flex justify-between gap-2'>
            <Linking 
                isOpen={openModal}
                promptType={promptType}
                url={url}
                setUrl={setUrl}
                onClose={() => {setUrl(""); setOpenModal(false)}}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                addImage={addImage}
                setLink={setLink}
            />
            <span className="flex-1 flex flex-wrap items-center gap-2">
                {
                    utils.options(editor).map((option, index) => (
                        <EditorButton 
                            icon={option.icon}
                            disabled={option.disabled}
                            key={index}
                            onClick={option.onClick}
                            text={option.title}
                            variantOutline={option.variantOutline}
                            callback={() => {option.title === 'add image' ? handleOpenModal('image'): option.title === 'add link' ? handleOpenModal('link'): {}}}
                        />
                    ))
                }
            </span>
            <span className="flex items-start max-sm:flex-col">
                {
                    utils.otherOptions(editor).map((option, index) => (
                        <EditorButton 
                            icon={option.icon}
                            disabled={option.disabled}
                            key={index}
                            onClick={option.onClick}
                            text={option.title}
                            variantOutline={option.variantOutline}
                        />
                    ))
                }
            </span>
        </div>
    )
}; 

export default Toolbar; 

// button component for each option
interface EditorButtonProps {
    onClick?: (() => any) | null | undefined;
    disabled: boolean; 
    variantOutline: boolean; 
    icon: React.ReactNode; 
    text: string; 
    callback?: () => void | null | undefined; 
}
const EditorButton: React.FC<EditorButtonProps> = ({onClick, disabled, variantOutline, icon, text, callback}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button 
                        className={"min-w-5 cursor-pointer"} 
                        disabled={disabled}
                        onClick={onClick ? onClick: callback}
                        variant={!variantOutline ? "outline": "secondary"}
                        size='icon'
                        type="button"
                    >
                        {icon}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="capitalize text-md font-bold">{text}</p>
                </TooltipContent>
            </Tooltip>

        </TooltipProvider>
)};