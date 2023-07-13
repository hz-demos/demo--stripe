import Link from 'next/link'

const scenarios = {
  'set-up-future-payments': 'Set up future payments',
  'save-payment-details-during-payment': 'Save payment details during payment',
  'place-a-hold-on-a-payment-method': 'Place a hold on a payment method',
  '3d-secure': '3D Secure authentication',
  'ignore-bank': 'Ignore bank authentication',
  'build-two': 'Build a two-step confirmation experience',
  'collect-payment': 'Collect payment details before creating an Intent',
  'finalize-payments': 'Finalize payments on the server',
  'mutiple-payment': 'Mutiple payment method configurations on AutoPM',
} as const

const getKeyByValue = <T extends Record<string, string>>(
  object: T,
  value: T[keyof T]
) => {
  return Object.keys(object).find((key) => object[key] === value)
}

export default function Payments() {
  return (
    <main>
      <h1 className="text-3xl text-center m-8">More payment scenarios</h1>
      <section className="m-auto max-w-screen-xl">
        <ul className="flex flex-wrap">
          {Object.values(scenarios).map((scenario) => (
            <li key={scenario} className="w-1/5 m-2 border flex">
              <Link
                className="p-4"
                href={`/app/payments/${getKeyByValue(scenarios, scenario)}`}
              >
                {scenario}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
