import React from "react"; 
import Image, { StaticImageData } from "next/image";

import {Button} from "@/components/ui/button"; 
import {Input} from "@/components/ui/input"; 

import {Typography} from "@/components"; 
import {icons} from "@/assets"; 
import {Modal} from '@/components/modals/modal'; 

// import {generateWidth} from "./utils"; 

type Wrap = "right" | "left" | "";
type Layout = "full" | "half" | "third" | "quarter"; 

interface ImageEditsProps {
    isOpen: boolean; 
    onClose: () => void; 
    onUpdate: (dimensions: boolean) => void; 
    deleteImage: () => void; 
    layout: Layout; 
    wrap: Wrap; 
    width: number;
    setLayout: React.Dispatch<Layout>;  
    setWrap: React.Dispatch<Wrap>; 
    setWidth: React.Dispatch<number>; 
    generateWidth: (dim: string) => string; 
}


const ImageEditor: React.FC<ImageEditsProps> = (
    {isOpen, onClose, onUpdate, deleteImage,  layout, wrap, width, setWrap, setLayout, setWidth, generateWidth}
) => {
    const [dimensions, setDimensions] = React.useState<boolean>(true)


    return (
        <Modal
            title="Edit Selected Image"
            description='You can edit an image at a time'
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className='flex flex-col gap-2'>
                <p className='flex items-center text-sm'>
                    To edit an image, you can enter the width or select the layout dimension
                </p>
                <Button 
                    type='button'
                    className='w-[200px] self-end' 
                    variant='outline' 
                    onClick={() => setDimensions(!dimensions)}>{!dimensions ? "Enter width": "Choose layout"}</Button>
                {dimensions ? <ImageDimensions width={width} setWidth={setWidth} />: <LayoutComponent layout={layout} setLayout={setLayout} generateWidth={generateWidth}/>}
                <WrapImage wrap={wrap} setWrap={setWrap}/>
                <Button
                    type='button'
                    variant={'secondary'}
                    className='mt-4'
                    onClick={() => onUpdate(dimensions)}
                >
                    Edit Image
                </Button>
                <Button
                    type='button'
                    variant={'destructive'}
                    className='mt-1'
                    onClick={deleteImage}
                >
                    Delete Image
                </Button>
            </div>
        </Modal>
    )
}

export default ImageEditor; 


// supporting components 
// dimensions - width, height 
const ImageDimensions = ({width,  setWidth,}: {
    width: number, setWidth: React.Dispatch<number>
}) => {
    let cls = `focus:border-active-color focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0`; 
    return (
        <div>
            <Typography.H3 title={'Image width in pixels!'} className={"my-2"}/>
            <Typography.P text={'Width'} className={"my-2"}/>
            <Input 
                className={`${cls}`}
                value={width}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWidth(Number(e.target.value))}
                type='number'
            />
        </div>
    )
}



// layout 
// full 1/2 1/3 1/4 
let layouts: Layout[] = ["full", "half", "third", "quarter"]
const LayoutComponent = ({layout, setLayout, generateWidth}: {layout: Layout, setLayout: React.Dispatch<Layout>, generateWidth: (dim: string) => string}) => {

    return (
        <div className='flex flex-col gap-2'>
            <Typography.H3 title={'Image layout on page!'}/>
            <div className="flex gap-2">
                {
                    layouts.map((itm: Layout) =>  (
                            <LayoutButton 
                                key={itm}
                                layout={itm}
                                currentLayout={layout}
                                setLayout={setLayout}
                                generateWidth={generateWidth}
                            />
                    ))
                }
            </div>
        </div>
    )
}
 
const LayoutButton = (
    {layout, currentLayout, setLayout, generateWidth}: 
    {layout: Layout, currentLayout: Layout, setLayout: React.Dispatch<Layout>, generateWidth: (dim: string) => string}
) => {
    return (
        <div className='flex-1 flex flex-col items-center gap-1 rounded-lg'>
            <Button
                onClick={() => setLayout(layout)}
                type='button'
                variant={currentLayout === layout ? "secondary": "outline"}
                className='w-full h-[50px] p-2 flex justify-start'
            >
                <span className={`h-full bg-active-color rounded-md`} style={{width: `${generateWidth(layout)}`}}/>
            </Button>
            <span className={`capitalize text-xs ${currentLayout === layout ? "font-bold text-active-color":""}`}>{layout} page</span>
        </div>
    )
}






// text wrap
interface FloatImageProps {
    wrap: Wrap;
    setWrap: React.Dispatch<Wrap>; 
}

const WrapImage: React.FC<FloatImageProps> = ({wrap, setWrap}) => {

    return (
        <div className='flex flex-col gap-2'>
            <Typography.H3 title={'Wrap text around image'}/>
            <p className='flex gap-2'>
                <WrapButton 
                    wrap='left'
                    currentWrap={wrap}
                    setWrap={setWrap}
                    image={icons.floatLeft}
                />
                <WrapButton 
                    wrap='right'
                    currentWrap={wrap}
                    setWrap={setWrap}
                    image={icons.floatRight}
                />
                <WrapButton 
                    wrap=''
                    currentWrap={wrap}
                    setWrap={setWrap}
                    image={icons.close}
                />
            </p>
        </div>
    )
}

const WrapButton = ({wrap, currentWrap, setWrap, image}: 
    {wrap: Wrap, currentWrap: Wrap; setWrap: React.Dispatch<Wrap>, image: StaticImageData }
) => {
    return (
        <span className='flex gap-2 flex-col justify-center'>
            <Button
                onClick={() => setWrap(wrap)}
                size={'icon'}
                variant={(currentWrap === wrap && wrap !== '') ? "secondary": "outline"}
                type='button'
            >
                <Image 
                    alt='Wrap icon'
                    src={image}
                    width={100}
                    height={100}
                    className="w-6 h-6 object-contain"
                />
                
            </Button>
            <span className={`capitalize text-xs ${(currentWrap === wrap && wrap !== '') ? "font-bold text-active-color":""}`}>
                {wrap === '' ? "Clear": wrap}
            </span>
        </span>
    )
}
// supporting components 





