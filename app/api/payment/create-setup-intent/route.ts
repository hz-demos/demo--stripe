import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { ManagementClient, type UserUpdate } from 'auth0'

import { getManagementApiToken } from '@/lib/apiHelpers'
// const { access_token } = await getManagementApiToken()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

const management = new ManagementClient({
  domain: process.env.AUTH0_ISSUER_DOMAIN!,
  token: process.env.AUTH0_MANAGEMENT_API_TOKEN!,
})

function getUser(id: string) {
  return management.users.get({ id })
}

function updateUser(id: string, data: UserUpdate) {
  return management.users.update({ id }, data)
}

export async function POST(request: Request) {
  const { user: clientUser } = await request.json()

  async function queryUserMetaWithCustomerId(id: string) {
    const user = await getUser(id)
    if (user.data.user_metadata?.customer_id) {
      return user.data.user_metadata.customer_id
    } else {
      return null
    }
  }

  function createCustomerForUser() {
    return stripe.customers.create({
      email: clientUser.email,
      name: clientUser.name,
    })
  }

  function linkUserToCustomer(customerId: string) {
    return updateUser(clientUser.sub, {
      user_metadata: {
        customer_id: customerId,
      },
    })
  }

  function retriveCustomerForUser(id: string) {
    return stripe.customers.retrieve(id)
  }

  const customerId = await queryUserMetaWithCustomerId(clientUser.sub)

  let customer: Stripe.Customer | Stripe.DeletedCustomer
  if (customerId) {
    customer = await retriveCustomerForUser(customerId)
  } else {
    customer = await createCustomerForUser()
    await linkUserToCustomer(customer.id)
  }

  const user = await getUser(clientUser.sub)
  console.log(user, customer)

  const setupIntent = await stripe.setupIntents.create({
    customer: customer.id,
    payment_method_types: ['card'],
  })

  return NextResponse.json({
    clientSecret: setupIntent.client_secret,
  })
}
