import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Window Blinds FAQ | Veechelz Nigeria Limited',
  description: 'Answers about on-site surveys, fabrication time, installation and ordering custom window blinds from Veechelz Nigeria.',
  alternates: { canonical: '/faq' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}