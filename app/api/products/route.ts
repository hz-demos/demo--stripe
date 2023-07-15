import type Stripe from 'stripe'

import { NextResponse } from 'next/server'

import { stripe } from '@/lib/apiHelpers'
import { createRedisInstance } from '@/redis'

const redis = createRedisInstance()

export async function GET(request: Request) {
  // build a key (it does not matter how)
  // const key = buildKey(req.body);

  // try fetch cached data
  const cached = await redis.get('products')

  // if cached, we're good!
  if (cached) {
    return NextResponse.json(JSON.parse(cached))
  }

  const products = await stripe.instance.products.list({
    active: true,
    limit: 10,
  })

  // cache data setting an expiry of 1 hour
  // this means that the cached data will remain alive for 60 minutes
  // after that, we'll get fresh data from the DB
  const MAX_AGE = 60_000 * 60 // 1 hour
  const EXPIRY_MS = `PX` // milliseconds

  await redis.set('products', JSON.stringify(products), EXPIRY_MS, MAX_AGE)

  return NextResponse.json(products)
}
