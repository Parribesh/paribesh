import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Paribesh Neupane - Full Stack Developer',
  description: 'Personal website showcasing projects, thoughts, and professional journey of Paribesh Neupane',
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

