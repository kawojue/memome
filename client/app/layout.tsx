import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import QueryProvider from '@/components/QueryProvider'

export const metadata: Metadata = {
  title: 'MemoMe',
  description: 'Amazinderful way to Host a Poll, Send and Receive Anonymous Messages.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Toaster
          position="top-center"
          reverseOrder={false} />
        <Analytics />
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
