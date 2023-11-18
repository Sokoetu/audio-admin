NextJS 14 starter template

## Getting Started

Replace the remote url with yours 

```bash
git remote set-url #add yours here 
#or if your haven't setup a github repo yet 

git remote remove origin 
#then after creating your repo 

git remote set-url #add yours here 
 
```

To start, install dependencies then run the development server:

```bash
yarn 
#or 

npm install 
#then 

npm run dev
# or
yarn run dev
 
```
## More info about the template 
With this typescript template, you can save some time in setting up a nextjs 14 template. It comes with some vital dependencies such as: 
- Shadcn for ui
- Tailwind for styling
- zustant for state management
- next-themes for darak and light mode styling 
- cookies-next for setting cookies 
- lucide-react for icons 
and more ...

Other highlights of the template include; 

- A customizable cookie consent popup 
- Axios interceptor and api call functions that helps save time
- Toast provider with sonner  
- Custom 404 page that you can customize. 
- Robots.txt generation
- Sitemap generation
- Initial setup for SEO optimization customizable to meet your needs
- Dynamic OG generation using next/og

There are also some custom hooks included. 


## upcoming 
Authentication 

## Folder structure

```bash
    ├── README.md
    ├── components.json
    ├── next-env.d.ts
    ├── next.config.js
    ├── package.json
    ├── postcss.config.js
    ├── public
    ├── src
    │   ├── app
    │   │   ├── (routes)
    │   │   │   ├── (private)
    │   │   │   ├── (public)
    │   │   │   │   └── page.tsx
    │   │   │   └── layout.tsx
    │   │   ├── api
    │   │   │   └── og
    │   │   │       ├── components
    │   │   │       │   └── og.tsx
    │   │   │       └── route.tsx
    │   │   ├── apple-icon.png
    │   │   ├── favicon.ico
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   ├── not-found.tsx
    │   │   ├── robots.ts
    │   │   └── sitemap.ts
    │   ├── components
    │   │   ├── error-components
    │   │   │   └── 404.tsx
    │   │   ├── index.js
    │   │   ├── ui
    │   │   │   ├── button.tsx
    │   │   │   ├── card.tsx
    │   │   │   └── separator.tsx
    │   │   └── utils
    │   │       └── theme-toggler.tsx
    │   ├── config
    │   │   └── env.ts
    │   ├── constants
    │   │   ├── index.js
    │   │   └── metadata.ts
    │   ├── functions
    │   │   ├── metadata.ts
    │   │   ├── toast.ts
    │   │   ├── utils.js
    │   │   └── validation.js
    │   ├── helpers
    │   │   ├── axios-interceptor.js
    │   │   └── cookie-helpers.ts
    │   ├── hooks
    │   │   ├── useEffect.ts
    │   │   ├── useInterval.ts
    │   │   ├── useSearchParams.ts
    │   │   └── useWindow.ts
    │   ├── lib
    │   │   └── utils.ts
    │   ├── providers
    │   │   ├── theme-provider.tsx
    │   │   └── toast-provider.tsx
    │   └── utils
    │       ├── api-calls.ts
    │       ├── cookie-consent.tsx
    │       └── index.js
    ├── tailwind.config.js
    ├── tailwind.config.ts
    └── tsconfig.json

```