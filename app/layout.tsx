import './globals.css'

import type { Metadata } from 'next'



export const metadata: Metadata = {

  title: 'JEE | Digital Experiences & Development',

  description: 'Next.js portfolio home screen',

}



export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode

}>) {

  return (

    <html lang="en">

      <body>{children}</body>

    </html>

  )

}