"use client";
import React from "react";

import { useEditor, EditorContent } from "@tiptap/react";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import Toolbar from "./utils/Toolbar";
import ImageEditor from  "./utils/image-edits"; 
import extensions from "./utils/extensions"; 

import {generateWidth} from "./utils/utils"; 
import {createToast} from "@/functions/toast"; 


const Editor = ({ value, setValue, editable = true }) => {
  const editor = useEditor({
    editable,
    editorProps: {
      attributes: {
        class: "focus:outline-none p-2",
      },
    },
    extensions,
    content: `${value ? value : "Type your content here..."}`,
    onUpdate: ({ editor }) => {
      if (!editable) return; 
      const html = editor.getHTML();

      setValue(html);
    }
  })
 

  // states
  const [clickedImg, setClickedImg] = React.useState(null); 
  
  const [wrap, setWrap] = React.useState(''); 
  const [width, setWidth] = React.useState(0); 
   
  const [layout, setLayout] = React.useState("full"); 

  const [openImageEdit, setImageEdit] = React.useState(false); 

  if(!editor) {
    return null;
  }

  const handleImageClick = (event) => {
    const clickedImage = event.target  
  
    if (clickedImage.tagName === "IMG") {
      // get the image attributes 
      const float = clickedImage.style.float; 
      const imgWidth = clickedImage.style.width; 

      let currLayout = 'full'; 
      if (imgWidth === `100%`) currLayout = `full`;
      if (imgWidth === `50%`) currLayout = `half`;
      if (imgWidth === `33%`) currLayout = `third`;
      if (imgWidth === `25%`) currLayout = `quarter`;

      // let width = imgWidth.includes('%') ? currLayout: imgWidth; 

      setClickedImg(clickedImage); 

      setWrap(float || "")
      setWidth(imgWidth || 0)
      setLayout(currLayout)
      
      setImageEdit(true)
    }
  };

  const handleImageUpdate = (dimensions) => {
    let style = ''; 

    if (dimensions && !wrap && !width) {
      createToast("error", "No selected or entered values!");
      return; 
    } else {
      clickedImg.style.marginInline = "10px"; 
      style = 'margin-inline: 10px;'
    }

    if (dimensions) {
      if (!width) {
        createToast("error", "You have to enter the width!");
        return; 
      }
      clickedImg.style.width = `${width}px`; 
      style += `width: ${width}px;`
    } else {
      const enteredLayout = generateWidth(layout);
      clickedImg.style.width = enteredLayout; 
      style += `width: ${enteredLayout};`
    }

    if (wrap) {
      clickedImg.style.float = wrap
      style += `float: ${wrap};`
    } else {
      clickedImg.style.float = ''; 
      style += `float: ""`;
    }

     
    let src = clickedImg.src; 
    let title = `Post image`;
    let alt = 'image';

    editor.chain().focus().setImage({src, alt, title, style}).run()
    resetStates()
  }

  const handleImageDelete = () => {
    if (clickedImg) {
      editor.commands.deleteSelection()
    }
    resetStates()
  };
  const resetStates = () => {
        // Reset state variables
        setClickedImg(null);
        setWrap('');
        setWidth(0);
        setLayout('full');
        setImageEdit(false);
  }
  // Attach click event listener to the editor's content DOM
  if (editable) editor?.view.dom.addEventListener("click", handleImageClick);

  return (
    <Card
      className={`relative flex flex-col justify-stretch w-full h-[60vh] relative ${!editable ? 'border-0 p-0': ''}`}
    >
      {
        editable && (
          <>
              <ImageEditor 
                isOpen={openImageEdit}
                onClose={(() => setImageEdit(false))}
                onUpdate={handleImageUpdate}
                deleteImage={handleImageDelete}
                layout={layout}
                wrap={wrap}
                width={width}
                setLayout={setLayout}
                setWrap={setWrap}
                setWidth={setWidth}
                generateWidth={generateWidth}
              />
              {!editable && (
                <div
                  className={`z-10 absolute top-0 right-0 w-full h-full`}
                  style={{ background: "rgba(0,0,0,.7)" }}
                />
              )}
              <Toolbar editor={editor} />
              <Separator />
          </>

        )
      }
      <ScrollArea className="h-[60vh]">
          <EditorContent editor={editor} />
      </ScrollArea>
    </Card>
  );
};

export default Editor;
