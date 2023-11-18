import type { Metadata } from 'next'
import dynamic from "next/dynamic"; 
import { Inter } from 'next/font/google'

import { ToasterProvider } from '@/providers/toast-provider';

// app specific 
import {baseMetadata} from "@/constants"
import {CookieConsent} from "@/utils"

import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const ThemeProvider  = dynamic(() => import("@/providers/theme-provider"));

// setting up metadata
const {authors, creator, description, keywords, publisher, site, template, title, url} = baseMetadata; 
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    template, default: title 
  },
  description,
  applicationName: site, 
  keywords, 
  authors, 
  creator, 
  publisher, 
  alternates: {
    canonical: "/",
    languages: {'en-US': "/en-US"}
  },
  openGraph: {
    title, description, url, siteName: site, type: "website", images: [{url: `${url}/api/og?title=${title}`}]
  },
  twitter: {
    card: "summary_large_image", title, description, images: [`${url}/api/og?title=${title}`]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          
          {children}
          <ToasterProvider />
          <CookieConsent />
        </ThemeProvider>  
      </body>
    </html>
  )
}
