import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JEE | Digital Experiences & Development',
  description: 'Portfolio of JEE, a multidisciplinary developer specializing in web development, applications, and creative digital products.',
  metadataBase: new URL('https://jee.codes'), 
  
  // --- THIS IS THE FIX FOR SOCIAL SHARING ---
  openGraph: {
    title: 'JEE | Digital Experiences & Development',
    description: 'Portfolio of JEE, a multidisciplinary developer specializing in web development, applications, and creative digital products.',
    url: 'https://jee.codes',
    siteName: 'JEE Portfolio',
    type: 'website',
    // Make sure your image file is named exactly like this in your 'app' or 'public' folder!
    images: [
      {
        url: '/opengraph-image.png', 
        width: 1200,
        height: 630,
        alt: 'JEE Digital Portfolio',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {/* Pro-Level SEO Schema (JSON-LD) for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "JEE",
              "url": "https://jee.codes",
              "jobTitle": "Freelance Full Stack Developer",
              "sameAs": [
                "https://github.com/yourusername", // Don't forget to put your real GitHub link here!
                "https://linkedin.com/in/yourusername" // And your real LinkedIn here!
              ]
            })
          }}
        />
        
        {/* Your actual website content */}
        {children}
      </body>
    </html>
  )
}