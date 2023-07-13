'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import SetupForm from './SetupForm'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function SetUpFuturePayments() {
  const { user, error, isLoading } = useUser()
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    if (!user) return

    fetch('/api/payment/create-setup-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [user])

  console.log('----', user)
  console.log(clientSecret)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  if (!user) return <Link href="/api/auth/login">Login</Link>

  const options = {
    clientSecret,
  }

  return (
    <main>
      <h1 className="text-3xl text-center m-8">Set up future payments</h1>
      <section className="m-auto max-w-screen-xl">
        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <SetupForm />
          </Elements>
        )}
      </section>
    </main>
  )
}
