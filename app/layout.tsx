import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Paribesh - ish-vara.com',
  description: 'Paribesh subdomain powered by Next.js and WordPress',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

