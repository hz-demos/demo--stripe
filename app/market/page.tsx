'use client'

import { useEffect, useState } from 'react'
import Stripe from 'stripe'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Market() {
  const [products, setProducts] = useState<Stripe.ApiList<Stripe.Product>>()

  useEffect(() => {
    fetch('/api/products', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  console.log(products)

  return (
    <main>
      <h1 className="text-3xl text-center m-8">Market</h1>
      <section className="m-auto max-w-screen-xl">
        <ul className="flex justify-between">
          {products?.data?.map((product) => (
            <li key={product.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Content</p>
                </CardContent>
                <CardFooter>
                  <Button>Buy</Button>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
