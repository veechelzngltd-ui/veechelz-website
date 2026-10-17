import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import HomeScrollReset from '@/components/HomeScrollReset'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://veechelz-website.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    siteName: 'Veechelz Nigeria Limited',
    locale: 'en_NG',
    title: 'Veechelz Nigeria | Custom Window Blinds in Abuja',
    description: 'Made-to-measure window blinds, motorized systems and professional installation in Abuja, Lagos and Port Harcourt.',
  },
  twitter: { card: 'summary_large_image' },
  title: 'Veechelz Nigeria | Custom Window Blinds in Abuja',
  description: 'Made-to-measure window blinds, motorized systems and professional installation in Abuja, Lagos and Port Harcourt.',
  icons: {
    icon: [
      { url: '/veechelz-icon-v2.svg', type: 'image/svg+xml' },
      { url: '/veechelz-icon-v2.ico', sizes: '48x48' },
    ],
    shortcut: '/veechelz-icon-v2.ico',
    apple: '/veechelz-apple-v2.png',
  },
  keywords: ['custom blinds', 'window blinds', 'roller blinds', 'venetian blinds', 'motorized blinds'],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Veechelz Nigeria Limited',
  url: siteUrl,
  telephone: '+2349111117575',
  email: 'veechelzngltd@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Suite B5, Begger Paint Plaza, Alexandria Crescent, Wuse 2',
    addressLocality: 'Abuja',
    addressRegion: 'FCT',
    addressCountry: 'NG',
  },
  areaServed: ['Abuja', 'Lagos', 'Port Harcourt'],
  sameAs: ['https://www.instagram.com/veechelz_ng'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-stone-50 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <HomeScrollReset />
        <Analytics />
      </body>
    </html>
  )
}