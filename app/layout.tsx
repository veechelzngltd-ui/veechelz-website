import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/CartContext'

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

export const metadata: Metadata = {
  title: 'Veechelz Nigeria | Custom Window Blinds & Premium Parts',
  description: 'Handcrafted custom window blinds and premium blind parts. Roller, Venetian, Motorized blinds plus bottom plates, bead chains, and blind materials.',
  icons: {
    icon: [
      { url: '/veechelz-icon-v2.svg', type: 'image/svg+xml' },
      { url: '/veechelz-icon-v2.ico', sizes: '48x48' },
    ],
    shortcut: '/veechelz-icon-v2.ico',
    apple: '/veechelz-apple-v2.png',
  },
  keywords: ['custom blinds', 'window blinds', 'roller blinds', 'venetian blinds', 'motorized blinds', 'blind parts', 'bottom plates', 'bead chains'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-stone-50 antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}