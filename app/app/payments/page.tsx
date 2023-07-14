import Link from 'next/link'

import { cn } from '@/lib/utils'

type Scenario = {
  [key: string]: { text: string; completed?: boolean }
}

const scenarios = {
  'set-up-future-payments': { text: 'Set up future payments', completed: true },
  'save-payment-details-during-payment': {
    text: 'Save payment details during payment',
    completed: false,
  },
  'place-a-hold-on-a-payment-method': {
    text: 'Place a hold on a payment method',
    completed: false,
  },
  '3d-secure': { text: '3D Secure authentication', completed: false },
  'ignore-bank': { text: 'Ignore bank authentication', completed: false },
  'build-two': {
    text: 'Build a two-step confirmation experience',
    completed: false,
  },
  'collect-payment-before-create-intent': {
    text: 'Collect payment details before creating an Intent',
    completed: false,
  },
  'finalize-payments': {
    text: 'Finalize payments on the server',
    completed: false,
  },
  'mutiple-payment': {
    text: 'Mutiple payment method configurations on AutoPM',
    completed: false,
  },
} satisfies Scenario

const getKeyByValue = <T extends Record<string, { text: string }>>(
  object: T,
  value: T[keyof T]
) => {
  return Object.keys(object).find((key) => object[key].text === value.text)
}

export default function Payments() {
  return (
    <main>
      <h1 className="text-3xl text-center m-8">More payment scenarios</h1>
      <section className="m-auto max-w-screen-xl">
        <ul className="flex flex-wrap">
          {Object.values(scenarios).map((scenario) => (
            <li
              key={scenario.text}
              className={cn(`w-1/5 m-2 border flex`, {
                'border-green-300': scenario.completed,
              })}
            >
              <Link
                className="p-4"
                href={`/app/payments/${getKeyByValue(scenarios, scenario)}`}
              >
                {scenario.text}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
