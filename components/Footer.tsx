import Link from 'next/link'
import { Mail, Phone, MapPin, Truck, ShieldCheck, Headset, HardHat } from 'lucide-react'


const footerLinks = {
  company: [
    { name: 'About Veechelz', href: '/about' },
    { name: 'Corporate Profile', href: '/about' },
    { name: 'Project Portfolio', href: '/projects' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press & Media', href: '/press' },
  ],
  support: [
    { name: 'Contact Us', href: '/#contact' },
    { name: 'Technical Specifications', href: '/technical-specifications' },
    { name: 'Warranty Information', href: '/warranty' },
    { name: 'Installation Services', href: '/installation-services' },
    { name: 'Maintenance & Care', href: '/faq' },
  ],
  solutions: [
    { name: 'Day & Night Blinds', href: '/#solutions' },
    { name: 'Blackout Roller Blinds', href: '/#solutions' },
    { name: 'Venetian & Wooden Blinds', href: '/#solutions' },
    { name: 'B2B Contract Supply', href: '/#contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookie Policy', href: '/privacy-policy#cookies' },
    { name: 'Accessibility', href: '/terms-of-service#accessibility' },
  ],
}

const features = [
  { icon: Truck, title: 'Nationwide Delivery', desc: 'Lagos, Abuja, Port Harcourt & beyond' },
  { icon: ShieldCheck, title: '5-Year Warranty', desc: 'On all installed systems' },
  { icon: Headset, title: 'Expert Consultation', desc: 'Mon-Sat 8am-6pm WAT' },
  { icon: HardHat, title: 'Professional Installation', desc: 'Certified teams across Nigeria' },
]

export default function Footer({ onOpenConsultation }: { onOpenConsultation?: () => void }) {
  return (
    <footer className="bg-stone-900 text-stone-300" role="contentinfo">
      {/* Features Bar */}
      <div className="border-b border-stone-800">
        <div className="mx-auto max-w-7xl px-6 md:px-16 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-stone-800 border border-stone-700/70">
                  <feature.icon className="h-6 w-6 text-[#B38F5B]" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-medium text-white mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-stone-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
            {/* Brand */}
            <div className="md:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-block" aria-label="Veechelz Nigeria Limited — Home">
                <img src="/logo-white.svg" alt="Veechelz Nigeria Limited" className="h-10 w-auto mb-4 object-contain" />
              </Link>
              <p className="text-stone-400 text-sm leading-relaxed mb-6 max-w-xs">
                Veechelz Nigeria Limited (RC-451171) — Nigeria's premier specialist in luxury
                residential window treatments, corporate office fit-outs, and interior finishing systems.
              </p>
              <div className="mb-6">
                <span className="inline-block text-[11px] font-mono tracking-wider px-2.5 py-1 rounded bg-stone-800/80 text-[#B38F5B] border border-stone-700/60">
                  RC-451171 &bull; INCORPORATED IN NIGERIA
                </span>
              </div>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/veechelz_ng?stkn=bHp3NG1xdndndzFt&utm_source=qr"
                  className="p-2 text-stone-400 hover:text-white transition-colors rounded-lg hover:bg-stone-800"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-.128-1.283-.14-1.69-.14-4.947 0-3.26.014-3.668.072-4.947.206-4.142 2.486-6.51 6.752-6.752 1.28-.057 1.688-.072 4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a
                  href="https://wa.me/2349111117575?text=Hello%20Veechelz%2C%20I%27d%20like%20to%20make%20an%20enquiry"
                  className="p-2 text-stone-400 hover:text-white transition-colors rounded-lg hover:bg-stone-800"
                  aria-label="WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
              </div>
            </div>

            {/* Company */}
            <nav aria-label="Company links">
              <h4 className="font-serif text-sm font-medium text-white uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-stone-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Support */}
            <nav aria-label="Support links">
              <h4 className="font-serif text-sm font-medium text-white uppercase tracking-wider mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    {link.name === 'Contact Us' && onOpenConsultation ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          onOpenConsultation()
                        }}
                        className="text-sm text-stone-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link href={link.href} className="text-sm text-stone-400 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Shop */}
            <nav aria-label="Solutions links">
              <h4 className="font-serif text-sm font-medium text-white uppercase tracking-wider mb-4">Solutions</h4>
              <ul className="space-y-3">
                {footerLinks.solutions.map((link) => (
                  <li key={link.name}>
                    {link.name === 'B2B Contract Supply' && onOpenConsultation ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          onOpenConsultation()
                        }}
                        className="text-sm text-stone-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link href={link.href} className="text-sm text-stone-400 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Legal */}
            <nav aria-label="Legal links">
              <h4 className="font-serif text-sm font-medium text-white uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-stone-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800 py-6">
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-stone-500">
              &copy; {new Date().getFullYear()} Veechelz Nigeria Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-stone-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <a href="https://maps.google.com/?q=Begger+Paint+Plaza+Alexandria+Crescent+Wuse+2+Abuja" target="_blank" rel="noopener noreferrer">
                  Suite B5, Begger Paint Plaza, Alexandria Crescent, Wuse 2, Abuja
                </a>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <a href="tel:+2349111117575">0911117575</a>
              </span>
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a href="mailto:veechelzngltd@gmail.com">veechelzngltd@gmail.com</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}