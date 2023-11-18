import { MetadataRoute } from 'next';
import slugify from "slugify"; 

 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NODE_ENV === 'development' ? "http://192.168.0.101:3000": "https://yourdomain.com"; 
    // example
    let categories: any[] = []

    const urls = categories.map((category: {title: string}) => (
        {
            url: `${baseUrl}/{...}/${slugify(category.title.toLowerCase())}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1
        }
    ))

    return [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        // ...urls
    ]
}