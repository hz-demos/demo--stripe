import { getSession } from '@auth0/nextjs-auth0'

export default async function Profile() {
  const session = await getSession()

  return (
    <main>
      <h1 className="text-3xl text-center m-8">Profile</h1>
      <h3>Access Token</h3>
      <pre>
        {JSON.stringify({ accessToken: session?.accessToken }, null, 2)}
      </pre>
      <h3>User</h3>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </main>
  )
}
