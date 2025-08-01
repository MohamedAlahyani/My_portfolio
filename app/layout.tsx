import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My portfolio',
  description: 'Hello',
  icons: {
    icon: '/favicon.svg',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head /> 
      <body>{children}</body>
    </html>
  )
}
