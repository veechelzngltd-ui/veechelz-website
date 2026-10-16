import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blind Parts & Hardware Store | Veechelz Nigeria Limited',
  description: 'Genuine motors, control mechanisms, brackets and acoustic hardware for blind repair, replacement and bespoke fabrication. Request a quote on WhatsApp.',
  alternates: { canonical: '/parts' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}