import type { Metadata } from 'next'

import {generateStaticMetadata} from "@/functions/metadata";
import BookForm from "@/components/forms/book"; 
import { Typography } from '@/components';

export const metadata: Metadata = generateStaticMetadata('Home', "");

const Home = ({searchParams}: {searchParams: {bookId: string}}) => {
  console.log(searchParams.bookId)

  return (
    <section className="w-full">
      <Typography.H1 title={"Post a book"} className="my-2 p-2" />
      <BookForm initialData={null}/>
    </section>
  )
}

export default Home; 