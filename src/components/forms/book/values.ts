import * as z  from "zod";

let values = [
    {
         name: "banner",
         file: true
     },
     {
         name: "title",
         placeholder: "Book title",
          
     },
     {
        name: "voice",
        placeholder: "angie",
    },
     {
         name: "blurb",
         placeholder: "Short summary on the book",
         textarea: true
     },
     {
        name: "author",
        placeholder: "John Mac",
    },
     {
         name: "amount",
         placeholder: 150,
         type: "number"
     },
     {
        name: "pages",
        placeholder: 0,
        type: "number"
    },
    {
        name: "published",
        placeholder: "2023-05-23",
    }
];

export default values; 

const formSchema = z.object({
    title: z.string().min(1, {message: "Book must have a title"}),
    banner: z.array(z.string()).min(1, {message: "You need to upload a banner!"}),
    blurb: z.string().min(1, {message: "Preview is required!"}),
    author: z.string().min(1, {message: "Author field is required!"}),
    voice: z.string().min(1, {message: "Voice is required!"}),
    pages: z.coerce.number(), 
    amount: z.coerce.number(), 
    published: z.string(), 
}); 

type BookFormValues = z.infer<typeof formSchema>

export {formSchema}
export type {BookFormValues}