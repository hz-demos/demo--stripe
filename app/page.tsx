'use client'

import { useUser } from '@auth0/nextjs-auth0/client'

export default function Home() {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <main>
      <h1 className="text-3xl text-center mt-8">Stripe demo</h1>
      <div className="m-auto max-w-screen-xl">
        {user ? (
          <>
            Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
          </>
        ) : (
          <a href="/api/auth/login">Login</a>
        )}
      </div>
    </main>
  )
}
