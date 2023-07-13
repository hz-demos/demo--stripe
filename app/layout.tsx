import './globals.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Stripe Payments Demo',
  description: 'A demo of Stripe Payments in Next.js with Auth0',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>{children}</body>
      </UserProvider>
    </html>
  )
}
