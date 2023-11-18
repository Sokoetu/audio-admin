import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
    let baseUrl = '';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

const disallow = [
    '/forgot', '/login', '/reset', '/welcome', '/register',
    '/checkout', '/order/', '/orders', '/profile', '/settings', '/legal/', '/search'
]