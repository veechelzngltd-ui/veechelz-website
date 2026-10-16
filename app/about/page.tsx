'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, Building2, RefreshCw, FileCheck, MapPin } from 'lucide-react'
import ConsultationModal from '@/components/ConsultationModal'

const pillars = [
  {
    icon: Home,
    title: 'Residential Luxury',
    description:
      'Custom Day & Night, Blackout Roller, and Venetian blinds tailored to modern homes, villas, and duplexes.',
  },
  {
    icon: Building2,
    title: 'Commercial & B2B Fit-Outs',
    description:
      'Contract-grade window treatments, motorized shading systems, and window treatments for corporate offices, banks, and hospitality.',
  },
  {
    icon: RefreshCw,
    title: 'Complete Lifecycle Service',
    description:
      'From physical laser/tape window surveys to custom sizing, secure mounting, motorization calibration, and a 5-year warranty.',
  },
]

const registration = [
  { label: 'Registered Name', value: 'Veechelz Nigeria Limited' },
  { label: 'Registration Number', value: 'RC-451171' },
  { label: 'Head Office', value: 'Suite B5, Begger Paint Plaza, Alexandria Crescent, Wuse 2, Abuja, FCT' },
  { label: 'Nationwide Reach', value: 'Stationed installation crews servicing Abuja, Lagos, Port Harcourt, and nationwide projects.' },
]

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Breadcrumb/Back Link */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
            <span className="mr-2">←</span> Back to Home
          </Link>
        </div>

        {/* Hero / Mission */}
        <div className="max-w-3xl mb-16">
          <span className="inline-block px-3 py-1 mb-5 text-xs font-medium tracking-wide uppercase text-stone-700 bg-stone-100 border border-stone-200 rounded-none">
            About Veechelz
          </span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-stone-900 leading-tight tracking-tight mb-5">
            Crafting Precision & Elegance in Window Treatments
          </h1>
          <p className="text-lg text-stone-700 leading-relaxed mb-6">
            Veechelz Nigeria Limited (RC-451171) — Delivering bespoke residential and corporate
            window finishing systems across Nigeria.
          </p>
          <div className="space-y-4 text-stone-600 leading-relaxed">
            <p>
              Headquartered in Wuse 2, Abuja, Veechelz is an established Nigerian interior finishing
              firm built on precision craftsmanship and disciplined technical process. Every project
              begins with an exact physical site survey — not an estimate — so that fabrication,
              mounting, and motorization are engineered to the true dimensions of the space, not
              approximated to it.
            </p>
            <p>
              We source premium materials, from extruded aluminum and natural basswood to
              flame-retardant blackout composites, and pair them with certified installation teams
              who understand that a window treatment is a structural and architectural detail, not
              an afterthought. The result is a finished product that holds its precision for years,
              backed by a 5-year craftsmanship guarantee.
            </p>
          </div>
        </div>

        {/* Pillars / What We Do */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-stone-900 mb-8">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white rounded-xl border border-stone-200 p-6 md:p-8"
              >
                <div className="inline-flex p-3 bg-stone-100 rounded-lg mb-5">
                  <pillar.icon className="h-6 w-6 text-stone-700" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-lg font-medium text-stone-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Transparency & Registration */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-stone-900 mb-2">
            Corporate Transparency & Registration
          </h2>
          <p className="text-stone-600 mb-8 max-w-2xl">
            Veechelz operates as a fully registered Nigerian limited liability company.
          </p>
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <dl className="divide-y divide-stone-200">
              {registration.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-6 px-6 py-5"
                >
                  <dt className="text-xs font-medium tracking-wide uppercase text-stone-500 sm:col-span-1">
                    {item.label}
                  </dt>
                  <dd className="text-sm text-stone-800 sm:col-span-2">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex items-start gap-2 mt-4 text-sm text-stone-500">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <a
              href="https://maps.google.com/?q=Begger+Paint+Plaza+Alexandria+Crescent+Wuse+2+Abuja"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 transition-colors"
            >
              View head office on the map
            </a>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 md:p-10 bg-stone-900 text-white text-center rounded-xl">
          <FileCheck className="h-8 w-8 mx-auto mb-4 text-stone-300" aria-hidden="true" />
          <h3 className="font-serif text-2xl font-medium mb-2">
            Transform Your Architectural Space
          </h3>
          <p className="text-stone-300 mb-6 max-w-lg mx-auto">
            Schedule an on-site survey or discuss contract supply with our technical team.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-white text-stone-900 font-medium text-sm rounded-none hover:bg-stone-100 transition-colors"
          >
            Request a Consultation
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
