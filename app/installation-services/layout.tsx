import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Installation Services & Site Surveys | Veechelz Nigeria Limited',
  description: 'On-site survey, sizing and professional installation of custom window blinds in Abuja and nationwide.',
  alternates: { canonical: '/installation-services' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}