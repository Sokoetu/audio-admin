"use client"; 

import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

import { ImagePlus, Trash, X } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

import { Button } from '@/components/ui/button';

interface ImageUploadProps {
    disabled?: boolean; 
    onChange: (value: string) => void; 
    onRemove: (value: string) => void; 
    path?: string;
    images: string[]; 
    avatar?: boolean; 
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled, onChange, onRemove, path, images, avatar = false
}) => {
    const [isMounted, setIsMounted] = React.useState(false); 

    React.useEffect(() => {setIsMounted(true)}, []); 

    const onUpload = (result: any) => {
        if (result.event === 'success') {
            onChange(result.info.secure_url); 
        }
    }

    if (!isMounted) return ''; 
    return (
        <div className={avatar ? "my-4": ""}>
            <div className="mb-4 flex items-center gap-4">
                {
                    images?.map((url: string, index: number) => (
                        <div key={index} className={`${avatar ? "w-[60px] h-[60px] rounded-full": "w-[200px] h-[100px] rounded-md overflow-hidden"} relative`}>
                            <div className={avatar ? "absolute z-10 -right-2 -top-2": "z-10 absolute top-2 right-2"}>
                                <Button 
                                    type="button" 
                                    onClick={() => onRemove(url)} 
                                    variant='destructive' size="icon"
                                    className={avatar ? "rounded-full w-6 h-6":""}
                                >
                                    {avatar ? <X className="h-4 w-4" />: <Trash className='h-4 w-4'/>}
                                </Button>
                            </div>
                            <Image 
                                fill
                                className={`${avatar ? "object-contain rounded-full": "object-cover"}`}
                                alt='Image'
                                src={url}
                             
                            />
                        </div>
                    ))
                }
            </div>
         
            <CldUploadWidget
                onUpload={onUpload}
                uploadPreset='dicydanz'
                options={{
                    cropping: false,
                    folder: path || 'test'
                }}
            >
                {({ open}) => {
                    const onClick = (e: any) => {
                        open()
                    }
                    return (
                        <Button 
                            type={"button"}
                            disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >
                            <ImagePlus className='h-4 w-4 mr-2'/>
                            {avatar ? "Change profile picture": "Upload an Image"}
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    );
}

export default ImageUpload;