import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technical Specifications | Veechelz Nigeria Limited',
  description: 'Technical specifications for Veechelz window blinds and components.',
  alternates: { canonical: '/technical-specifications' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}