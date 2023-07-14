import { strict as assert } from 'node:assert'

import { ManagementClient, type UserUpdate } from 'auth0'

assert(process.env.AUTH0_ISSUER_DOMAIN, 'Missing Auth0 issuer domain')
assert(process.env.AUTH0_MANAGEMENT_API_TOKEN, 'Missing Auth0 API token')

export const management = new ManagementClient({
  domain: process.env.AUTH0_ISSUER_DOMAIN,
  token: process.env.AUTH0_MANAGEMENT_API_TOKEN,
})

export function getUser(id: string) {
  return management.users.get({ id })
}

export function updateUser(id: string, data: UserUpdate) {
  return management.users.update({ id }, data)
}

export async function findCustomerIdByUserId(
  id: string
): Promise<string | null> {
  const user = await getUser(id)
  return (user.data.user_metadata?.customer_id as string) ?? null
}

export async function linkCustomerToUser(
  userId: string,
  customerId: string
): Promise<void> {
  await updateUser(userId, {
    user_metadata: {
      customer_id: customerId,
    },
  })
}

export const getManagementApiToken = async () => {
  assert(process.env.AUTH0_CLIENT_ID, 'Missing Auth0 client ID')
  assert(process.env.AUTH0_CLIENT_SECRET, 'Missing Auth0 client secret')
  assert(process.env.AUTH0_ISSUER_BASE_URL, 'Missing Auth0 issuer base URL')

  return fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
    }),
  }).then((res) => res.json())
}
