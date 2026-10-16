import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Veechelz Nigeria Limited | Window Blinds Company in Abuja',
  description: 'Veechelz Nigeria Limited is a registered Nigerian company headquartered in Wuse 2, Abuja, supplying and installing custom window blinds for homes and commercial spaces.',
  alternates: { canonical: '/about' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}