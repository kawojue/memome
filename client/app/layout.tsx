import './globals.css'
import ReactGA from 'react-ga4'
import type { Metadata } from 'next'
import IsAuth from '@/components/IsAuth'
import { Toaster } from 'react-hot-toast'
import QueryProvider from '@/components/QueryProvider'

export const metadata: Metadata = {
  title: 'MemoMe',
  description: 'An Ultimate Anonymous Platform for Secure Communication, Polls, and Content Control.',
}

ReactGA.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
