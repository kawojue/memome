import './globals.css'
import Head from 'next/head'
import type { Metadata } from 'next'
import IsAuth from '@/components/IsAuth'
import { Toaster } from 'react-hot-toast'
import QueryProvider from '@/components/QueryProvider'

export const metadata: Metadata = {
  title: 'MemoMe',
  description: 'An Ultimate Anonymous Platform for Secure Communication, Polls, and Content Control.',
  openGraph: {
    images: ['https://d15zb4m4p46ai4.cloudfront.net/Dist/logo-1.png']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta property="og:image" content="https://d15zb4m4p46ai4.cloudfront.net/Dist/logo-1.png" />
        <title>MemoMe</title>
      </Head>
      <body className="min-h-screen">
        <Toaster
          position="top-center"
          reverseOrder={false} />
        <QueryProvider>
          <IsAuth>
            {children}
          </IsAuth>
        </QueryProvider>
      </body>
    </html>
  )
}
