import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects & Installations | Veechelz Nigeria Limited',
  description: 'Residential, commercial and motorized window blind projects by Veechelz Nigeria Limited.',
  alternates: { canonical: '/projects' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}