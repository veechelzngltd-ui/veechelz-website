import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Veechelz Nigeria Limited',
  description: 'Terms of service for using the Veechelz Nigeria Limited website and ordering our products and services.',
  alternates: { canonical: '/terms-of-service' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}