import type Stripe from 'stripe'

import { NextResponse } from 'next/server'

import { stripe } from '@/lib/apiHelpers'

export async function GET(request: Request) {
  const products = await stripe.instance.products.list({
    active: true,
    limit: 10,
  })

  return NextResponse.json(products)
}
