'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import ConsultationModal from '@/components/ConsultationModal'

interface FaqItem {
  q: string
  a: ReactNode
}

interface FaqSection {
  label: string
  title: string
  items: FaqItem[]
}

const sections: FaqSection[] = [
  {
    label: 'Section A',
    title: 'Ordering, Sizing & Quotes',
    items: [
      {
        q: 'Why are prices not listed on the website?',
        a: 'Every blind is custom-fabricated to exact window measurements, fabric grade, and control type (manual vs. motorized). Submitting a quote request allows us to provide an accurate estimate based on your specific architectural needs.',
      },
      {
        q: 'Is the on-site survey free?',
        a: 'Within central Abuja municipal zones (Wuse 2, Maitama, Garki, Jabi, Guzape, etc.), on-site surveys are complimentary for qualifying multi-window projects following an initial estimate. For projects outside Abuja or interstate, a modest travel fee applies.',
      },
      {
        q: 'How long does fabrication and installation take?',
        a: 'Standard custom orders typically take 5–10 business days from measurement sign-off to installation.',
      },
    ],
  },
  {
    label: 'Section B',
    title: 'Blind Care & Maintenance',
    items: [
      {
        q: 'How do I clean Day & Night and Roller blinds?',
        a: 'Lightly dust regularly with a feather duster or vacuum with a soft brush attachment on low suction. For spot cleaning, use a damp cloth with mild soapy water—never soak the fabric or use harsh solvent cleaners.',
      },
      {
        q: 'How do Day & Night (Zebra) blinds work?',
        a: (
          <div className="space-y-3">
            <p>
              Day &amp; Night blinds use two alternating bands of fabric, one sheer and one solid. Line the bands up for
              full shading and privacy, or slide them apart for semi-shading that keeps the daylight and the view.
            </p>
            <img
              src="/images/zebra-semi-full-shading.jpg"
              alt="Day and Night blind shown in semi-shading on the left and full-shading on the right"
              className="w-full max-w-sm rounded-lg border border-stone-200"
              loading="lazy"
            />
          </div>
        ),
      },
      {
        q: 'How do I care for Venetian & Wooden blinds?',
        a: 'Wipe wooden slats with a dry microfiber cloth along the wood grain. For aluminum slats, wipe with a damp cloth. Avoid excess moisture on natural timber blinds to prevent warping.',
      },
      {
        q: 'What should I do if a blind gets stuck or jams?',
        a: 'Never force the pull chain or tilt cord. Check if the fabric or slats are misaligned in the headrail. If the issue persists, contact our support team under your 5-year warranty coverage.',
      },
    ],
  },
  {
    label: 'Section C',
    title: 'Nationwide Service & Warranty',
    items: [
      {
        q: 'Do you deliver and install outside Abuja?',
        a: 'Yes, we fulfill contract supply and certified installation nationwide across Nigeria.',
      },
      {
        q: 'What does the 5-Year Warranty cover?',
        a: (
          <>
            It covers internal gear mechanisms, headrail structural integrity, and motor units. See our full{' '}
            <Link href="/warranty" className="text-stone-900 underline hover:text-stone-700">
              /warranty
            </Link>{' '}
            page for complete details.
          </>
        ),
      },
    ],
  },
]

function AccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-stone-200 bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-stone-900">{item.q}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-stone-500 transition-transform duration-200 ease-out ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-stone-600 leading-relaxed text-sm">
          {item.a}
        </div>
      )}
    </div>
  )
}

export default function FaqPage() {
  const [openKey, setOpenKey] = useState<string | null>('0-0')
  const [modalOpen, setModalOpen] = useState(false)

  const toggle = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key))
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Breadcrumb/Back Link */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
            <span className="mr-2">←</span> Back to Home
          </Link>
        </div>

        <h1 className="font-serif text-3xl font-medium text-stone-900 mb-4">
          Frequently Asked Questions & Maintenance Care
        </h1>
        <p className="text-stone-600 mb-10 max-w-2xl">
          Answers to common questions about ordering, sizing, care, and our nationwide service and warranty coverage.
        </p>

        <div className="space-y-12">
          {sections.map((section, sIndex) => (
            <section key={section.title}>
              <span className="inline-block px-3 py-1 mb-3 text-xs font-medium tracking-wide uppercase text-stone-700 bg-stone-100 border border-stone-200 rounded-none">
                {section.label}
              </span>
              <h2 className="font-serif text-2xl font-medium text-stone-900 mb-4">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, iIndex) => {
                  const key = `${sIndex}-${iIndex}`
                  return (
                    <AccordionItem
                      key={key}
                      item={item}
                      isOpen={openKey === key}
                      onToggle={() => toggle(key)}
                    />
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 md:p-10 bg-stone-900 text-white text-center rounded-xl">
          <h3 className="font-serif text-2xl font-medium mb-2">
            Need a custom consultation or have an unlisted question?
          </h3>
          <p className="text-stone-300 mb-6 max-w-lg mx-auto">
            Our team is happy to walk through your project specifics, no obligation.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-white text-stone-900 font-medium text-sm rounded-none hover:bg-stone-100 transition-colors"
          >
            Book a Consultation
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
