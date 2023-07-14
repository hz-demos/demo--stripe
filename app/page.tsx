'use client'

import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'

import { buttonVariants } from '@/components/ui/button'

export default function Home() {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div className="text-center mt-8">Loading...</div>
  if (error) return <div className="text-center mt-8">{error.message}</div>

  return (
    <main>
      <h1 className="text-3xl text-center mt-8">Mall based on Stripe</h1>
      <div className="m-auto max-w-screen-xl">
        {user ? (
          <>
            Welcome {user.name}!{' '}
            <Link
              className={buttonVariants({ variant: 'outline' })}
              href="/api/auth/logout"
            >
              Logout
            </Link>
          </>
        ) : (
          <Link
            className={buttonVariants({ variant: 'outline' })}
            href="/api/auth/login"
          >
            Login
          </Link>
        )}
      </div>
    </main>
  )
}
