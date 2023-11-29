import React from "react"; 
import Image from "next/image"; 

import {FileImage, Trash} from "lucide-react"; 

import { Input } from "@/components/ui/input";
import { Typography } from "@/components";
import {Confirm} from '@/components/modals';
import { Button } from "@/components/ui/button";


interface LinkingProps {
  url: string;
  isOpen: boolean;
  promptType: string;
  onClose: () => void;
  addImage: () => void;
  setLink: () => void;
  setUrl: React.Dispatch<string>; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Linking: React.FC<LinkingProps> = ({
  isOpen,
  promptType,
  url,
  setUrl,
  onClose,
  onChange,
  addImage,
  setLink,
}) => {
  const [base64Data, setBase64Data] = React.useState<string | null>(null);

  const fileRef = React.useRef<HTMLInputElement>(null);

  // handle local file uploading
  const handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const fileInput = e.target;
    const file = fileInput.files && fileInput.files[0];
    if (file) {
      // Read the file as base64
      const reader = new FileReader();
      reader.onload = () => {
        // Update state with the base64-encoded string
        setBase64Data(reader.result as string);
        setUrl(reader.result as string)
      };
      reader.readAsDataURL(file);
    }
  }

  const handleAdd = () => {
    if (promptType === "image") {
      addImage()
      setBase64Data(null)
    } else {setLink()}
  }
 


 
  return (
    <Confirm
      title={promptType === "image" ? "Attach image" : "Embed link"}
      description={
        promptType === "image"
          ? "Paste the image address accessible online or select a file from your computer!"
          : "Paste url to link text to!"
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      {promptType === "image" && 
        <div className="flex flex-col gap-2">
          <Typography.P text="We encourage using an image that is online rather than a local image. This will help with reducing page size especially if local image is large"/>
          <Typography.P text="You can edit image dimensions on the editor by clicking on it"/>
          <span className="relative">
            {(base64Data || url) && 
              <>
                <Button 
                    variant='destructive' 
                    size={'icon'} 
                    type='button'
                    className='absolute top-0 right-0 z-10'
                    onClick={() => {setBase64Data(""); setUrl("")}}
                >
                    <Trash className='w-5 h-5'/>
                </Button>

                <Image 
                  src={base64Data || url}
                  alt='Selected image'
                  width={250}
                  height={300}
                  className={'w-full max-h-[300px] object-contain rounded-lg my-2'}
                />
              </>
            }
            <Input 
              accept="image/*"
              type="file"
              className="hidden"
              ref={fileRef}
              onChange={handleFileChange}
            />
            <Button className="flex gap-2 my-2" onClick={() => fileRef.current?.click()}>
              <FileImage className='w-5 h-5'/>
              <span>Select file from computer</span>
            </Button>

          </span>
          <Typography.H3 title="Or paste a link to an image here"/>
        </div>
      }
      <Input
        className="my-3 focus:border-active-color focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Paste your url..."
        value={url}
        onChange={onChange}
      />
      <Button
        className="w-full"
        variant="outline"
        onClick={handleAdd}
      >
        Okay
      </Button>
    </Confirm>
  );
};

export default Linking;
