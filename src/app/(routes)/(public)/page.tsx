import Image from 'next/image';
import type { Metadata } from 'next'

import {ThemeToggle} from "@/components";
import {generateStaticMetadata} from "@/functions/metadata";

export const metadata: Metadata = generateStaticMetadata('Home', "");

export default function Home() {
  return (
    <>
      home
      <ThemeToggle />
    </>
  )
}
