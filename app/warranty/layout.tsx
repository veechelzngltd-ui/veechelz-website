import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Warranty | Veechelz Nigeria Limited',
  description: 'Warranty terms and coverage for Veechelz window blinds and components.',
  alternates: { canonical: '/warranty' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}