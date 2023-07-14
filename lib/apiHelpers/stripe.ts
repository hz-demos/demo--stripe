import { strict as assert } from 'node:assert'

import Stripe from 'stripe'

assert(process.env.STRIPE_SECRET_KEY, 'Missing Stripe secret key')

export const instance = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

type User = {
  email: string
  name: string
}
export function createCustomerForUser({ email, name }: User) {
  return instance.customers.create({
    email: email,
    name: name,
  })
}

export function getCustomer(id: string) {
  return instance.customers.retrieve(id)
}
