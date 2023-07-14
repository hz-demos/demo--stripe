import './globals.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mall System based on Stripe',
  description: 'A mall system based on Stripe, built with Next.js, Auth0, Shadcn/ui.',
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
