/*
  Responsible for generating the OG image to when link is shared 
  Customized as you may please. You can view the results at localhost:3000/api/og if ou are in development
  The imported OG component is to just separate and make the code clean 
  As the fonts, it is commented just in case you want to add yours. 
*/

import { ImageResponse } from 'next/og';

import initialMetadata from "@/constants/metadata"; 
import OG from "./components/og"; 

export const runtime = 'edge';

 
export async function GET(request: Request): Promise<Response> {
  // const interExtrabold = fetch(
  //   new URL('../../../public/Inter-ExtraBold.ttf', import.meta.url)
  // ).then((res) => res.arrayBuffer())

  try {
    const { searchParams } = new URL(request.url);

    const description = searchParams.get("type") || initialMetadata.description; 
    const title = searchParams.get("Title") || initialMetadata.title; 
    const img = searchParams.get("img")

    return new ImageResponse(
        <OG title={title} description={description} img={img}/>,
      {
        width: 1200,
        height: 630,
        // fonts: [
        //   {
        //     name: 'Inter',
        //     data: await interExtrabold,
        //     style: 'normal',
        //     weight: 800,
        //   },
        // ], 
         
      }
    ) as Response
  } catch (err: any) {
    console.log(`${err.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}