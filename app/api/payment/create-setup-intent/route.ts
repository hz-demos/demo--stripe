import type Stripe from 'stripe'

import { NextResponse } from 'next/server'

import { auth0, stripe } from '@/lib/apiHelpers'
// const { access_token } = await getManagementApiToken()

export async function POST(request: Request) {
  const { user: clientUser } = await request.json()

  let customer: Stripe.Customer | Stripe.DeletedCustomer

  const customerId = await auth0.findCustomerIdByUserId(clientUser.sub)
  if (customerId) {
    customer = await stripe.getCustomer(customerId)
  } else {
    customer = await stripe.createCustomerForUser({
      email: clientUser.email,
      name: clientUser.name,
    })
    await auth0.linkCustomerToUser(clientUser.sub, customer.id)
  }

  const user = await auth0.getUser(clientUser.sub)
  console.log(user, customer)

  const setupIntent = await stripe.instance.setupIntents.create({
    customer: customer.id,
    payment_method_types: ['card'],
  })

  return NextResponse.json({
    clientSecret: setupIntent.client_secret,
  })
}
