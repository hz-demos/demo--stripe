import { ReactNode } from 'react'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>

      {children}
    </section>
  )
}
