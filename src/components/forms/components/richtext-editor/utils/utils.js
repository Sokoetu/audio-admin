import { 
    AlignCenter, AlignLeft, AlignRight, AlignJustify, Bold, 
    Code2, Heading2, Heading3, 
    Heading4, Heading5, Heading6, Image as ImageIcon, Italic, Link, 
    List, ListOrdered, Minus, Quote, Redo2, 
    RemoveFormattingIcon, StrikethroughIcon, 
    TerminalSquare, Underline, Undo2, WrapText, XSquare } from "lucide-react";

// button options for the rich text editor

const options = (editor) =>  ([
    {
        variantOutline: editor.isActive('bold'),
        disabled: !editor.can().chain().focus().toggleBold().run(),
        icon: <Bold className='w-5 h-5'/>,
        onClick: () => editor.chain().focus().toggleBold().run(),
        title: 'bold',
    },
    {
        variantOutline: editor.isActive('italic'),
        disabled: !editor.can().chain().focus().toggleItalic().run(),
        icon: <Italic className='w-5 h-5'/>,
        onClick: () => editor.chain().focus().toggleItalic().run(),
        title: 'italic',
    },
    {
        variantOutline: editor.isActive('underline'),
        disabled: !editor.can().chain().focus().toggleUnderline().run(),
        icon: <Underline className='w-5 h-5'/>,
        onClick: () => editor.chain().focus().toggleUnderline().run(),
        title: 'underline',
    },
    {
        variantOutline: editor.isActive('strike'),
        disabled: !editor.can().chain().focus().toggleStrike().run(),
        icon: <StrikethroughIcon className='w-5 h-5'/>,
        onClick: () => editor.chain().focus().toggleStrike().run(),
        title: 'strike',
    },
    {
        variantOutline: editor.isActive('code'),
        disabled: !editor.can().chain().focus().toggleCode().run(),
        icon: <Code2 className='w-5 h-5'/>,
        onClick: () => editor.chain().focus().toggleCode().run(),
        title: 'code',
    },
    {
        variantOutline: false,
        disabled: false,
        icon: <RemoveFormattingIcon className='w-5 h-5'/>,
        onClick: () => editor.chain().focus().unsetAllMarks().run(),
        title: 'clear formats',
    },
    {
        variantOutline: false,
        disabled: false,
        icon: <XSquare className='w-5 h-5'/>,
        onClick: () => editor.chain().focus().clearNodes().run(),
        title: 'clear nodes',
    },
    {
        variantOutline: false,
        disabled: false,
        icon: <Heading2 className='w-5 h-5'/>,
        onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        title: 'h2',
    },
    {
        variantOutline: false,
        disabled: false,
        icon: <Heading3 className='w-5 h-5'/>,
        onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        title: 'h3',
    },
    {
        variantOutline: false,
        disabled: false,
        icon: <Heading4 className='w-5 h-5' />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
        title: 'h4',
    },
    {
        variantOutline: false,
        disabled: false,
        icon: <Heading5 className='w-5 h-5' />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
        title: 'h5',
    },
    {
        variantOutline: false,
        disabled: false,
        icon: <Heading6 className='w-5 h-5' />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
        title: 'h6',
    },
    {
        variantOutline:  editor.isActive('bulletList'),
        disabled: false,
        icon: <List className='w-5 h-5' />,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        title: 'bullet list',
    },
    {
        variantOutline:  editor.isActive('orderedList'),
        disabled: false,
        icon: <ListOrdered className='w-5 h-5' />,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        title: 'ordered list',
    },
    {
        variantOutline:  editor.isActive({textAlign: "left"}),
        disabled: false,
        icon: <AlignLeft className='w-5 h-5' />,
        onClick: () => editor.chain().focus().setTextAlign('left').run(),
        title: 'align left',
    },
    {
        variantOutline:  editor.isActive({textAlign: "center"}),
        disabled: false,
        icon: <AlignCenter className='w-5 h-5' />,
        onClick: () => editor.chain().focus().setTextAlign('center').run(),
        title: 'align center',
    },
    {
        variantOutline:  editor.isActive({textAlign: "right"}),
        disabled: false,
        icon: <AlignRight className='w-5 h-5' />,
        onClick: () => editor.chain().focus().setTextAlign('right').run(),
        title: 'align right',
    },
    {
        variantOutline:  editor.isActive({textAlign: "justify"}),
        disabled: false,
        icon: <AlignJustify className='w-5 h-5' />,
        onClick: () => editor.chain().focus().setTextAlign('justify').run(),
        title: 'align justify',
    },
    {
        variantOutline: false,
        disabled: false,
        icon: <ImageIcon className='w-5 h-5' />,
        onClick: null,
        title: 'add image',
    },
    {
        variantOutline: false,
        disabled: false,
        icon: <Link className='w-5 h-5' />,
        onClick: null,
        title: 'add link',
    },
    {
        variantOutline:  editor.isActive('codeBlock'),
        disabled: false,
        icon: <TerminalSquare className='w-5 h-5' />,
        onClick: () => editor.chain().focus().toggleCodeBlock().run(),
        title: 'code block',
    },
    {
        variantOutline:  editor.isActive('blockquote'),
        disabled: false,
        icon: <Quote className='w-5 h-5' />,
        onClick: () => editor.chain().focus().toggleBlockquote().run(),
        title: 'block quote',
    },
    {
        variantOutline: false,
        disabled: false,
        icon: <Minus className='w-5 h-5' />,
        onClick: () => editor.chain().focus().setHorizontalRule().run(),
        title: 'line',
    },
    {
        variantOutline: false,
        disabled: false,
        icon: <WrapText className='w-5 h-5' />,
        onClick: () => editor.chain().focus().setHardBreak().run(),
        title: 'break',
    },

]); 

// undo and redo option at the end
const otherOptions = (editor) => ([
    {
        variantOutline: false,
        disabled: !editor.can().chain().focus().undo().run(),
        icon: <Undo2 className='w-5 h-5' />,
        onClick: () => editor.chain().focus().undo().run(),
        title: 'undo',
    },
    {
        variantOutline: false,
        disabled: !editor.can().chain().focus().redo().run(),
        icon: <Redo2 className='w-5 h-5' />,
        onClick: () => editor.chain().focus().redo().run(),
        title: 'redo',
    },
]);

let utils = {
    options, otherOptions
}

export default utils; 

export const generateWidth = (str) => {
    let width = "100%"; 

    if (str === 'half')  width = "50%"; 
    if (str === 'third')  width = "33%"; 
    if (str === 'quarter')  width = "25%"; 

    return width; 
}