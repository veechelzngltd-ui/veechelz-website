'use client'

import { ArrowRight, Calendar, MapPin, Phone } from 'lucide-react'

interface HeroProps {
  onBookConsultation: () => void
}

export default function Hero({ onBookConsultation }: HeroProps) {
  const features = [
    { icon: Calendar, label: 'Site Survey & Spec', desc: 'On-site measurement & consultation' },
    { icon: MapPin, label: 'Nationwide Install', desc: 'Lagos, Abuja, Port Harcourt & beyond' },
    { icon: Phone, label: 'B2B Contract Supply', desc: 'General contracting & bulk procurement' },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 md:px-16 pt-16 md:pt-20 overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80')] bg-cover bg-center bg-no-repeat" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/70 via-stone-900/50 to-transition" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium tracking-wide mb-6">
              Established 2015 • Nigeria's Premier Window Treatment Specialists
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight tracking-tight mb-6 text-balance">
              Veechelz{' '}
              <span className="font-light">Architectural Window Finishing</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-200/90 max-w-xl mb-10 leading-relaxed">
              From luxury residential window treatments to corporate office fit-outs and B2B general contracting supplies —
              Veechelz Nigeria Limited delivers precision-engineered interior solutions across Nigeria.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-6 md:gap-8 mb-10">
              {features.map((feature, index) => (
                <div key={feature.label} className="flex items-center gap-3 animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="p-2 rounded-lg bg-white/10">
                    <feature.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{feature.label}</p>
                    <p className="text-stone-300/80 text-xs">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBookConsultation}
                className="group relative px-8 py-4 bg-white text-stone-900 font-medium text-base rounded-none transition-[transform,background-color] duration-150 ease-out hover:bg-stone-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-900"
              >
                Schedule Site Survey
                <ArrowRight className="ml-2 h-5 w-5 inline-block transition-transform duration-100 ease-out group-hover:translate-x-1 active:scale-90" aria-hidden="true" />
              </button>
              <a
                href="#solutions"
                className="px-8 py-4 border-2 border-white/30 text-white font-medium text-base rounded-none cursor-pointer transition-colors duration-200 hover:border-white hover:bg-white/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-900 text-center"
              >
                View Collections
              </a>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
                alt="Elegant living room with custom roller blinds filtering natural light"
                className="w-full h-full object-cover transition-opacity duration-300 ease-out"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 p-6 bg-white rounded-lg shadow-xl max-w-xs transition-[transform,opacity] duration-300 ease-out pointer-events-none">
              <p className="text-sm text-stone-500 uppercase tracking-wider mb-1">Site Survey</p>
              <p className="font-serif text-3xl font-medium text-stone-900 leading-tight">Free</p>
              <p className="text-[11px] text-stone-500 leading-snug mt-0.5">
                in central Abuja (Wuse 2, Maitama, Garki, Jabi, Guzape)
              </p>
              <p className="text-sm text-stone-500 mt-2">Outside Abuja: small travel fee, 100% refunded when you order</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <svg className="h-6 w-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}