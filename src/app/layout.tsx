/*
    Root layout. 
    It uses the toast-provider as a wrapper for sonner toast from context 
    The theme provider is a wrapper for next-themes
    The basemetadata from constants defines the initial metadata that is passed to the Metadat api from Nextjs

    In the app directory, the apple-icon.png and favicon are included in the meta tags in the head section 
    Add your's accordingly 
*/

import type { Metadata } from 'next'
import dynamic from "next/dynamic"; 
import { Inter } from 'next/font/google'

import { ToasterProvider } from '@/providers/toast-provider';
import AuthProvider from '@/providers/auth-provider';

// app specific 
import {baseMetadata} from "@/constants"
import {CookieConsent} from "@/utils"

import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const ThemeProvider  = dynamic(() => import("@/providers/theme-provider"));

// setting up metadata
// as for the og image, a custom image is generated using the api/og route
// check api/og for more details

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
          <AuthProvider
            authType='cookie'
            authName='_auth'
          >
            {children}
          </AuthProvider>
          <ToasterProvider />
          <CookieConsent />
        </ThemeProvider>  
      </body>
    </html>
  )
}
