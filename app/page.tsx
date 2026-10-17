'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Showroom from '@/components/Showroom'
import Footer from '@/components/Footer'
import ConsultationModal from '@/components/ConsultationModal'

interface QuickFormValues {
  name: string
  email: string
  phone: string
  notes: string
}

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCategoryNotes, setSelectedCategoryNotes] = useState('')
  const [prefill, setPrefill] = useState<QuickFormValues | undefined>(undefined)

  const openConsultation = () => setModalOpen(true)

  const openConsultationWithValues = (values: QuickFormValues) => {
    setPrefill(values)
    setModalOpen(true)
  }

  const handleExploreCollection = (categoryName: string, finish?: string) => {
    setSelectedCategoryNotes(
      finish ? `Interested in: ${categoryName} — Colour: ${finish}` : `Interested in: ${categoryName}`
    )
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Header onBookConsultation={openConsultation} />
      <main className="pt-0">
        <section id="about">
          <Hero onBookConsultation={openConsultation} />
        </section>
        <section id="solutions" className="scroll-mt-24">
          <Showroom onExploreCollection={handleExploreCollection} />
        </section>
        <ContactSection onOpenModal={openConsultationWithValues} />
      </main>
      <Footer onOpenConsultation={openConsultation} />
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setSelectedCategoryNotes('')
          setPrefill(undefined)
        }}
        initialNotes={selectedCategoryNotes}
        initialValues={prefill}
      />
    </div>
  )
}

function ContactSection({ onOpenModal }: { onOpenModal: (values: QuickFormValues) => void }) {
  return (
    <section id="contact" className="py-16 md:py-24 px-6 md:px-16 bg-stone-100">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-stone-200 text-stone-700 text-sm font-medium tracking-wide mb-6">Project Enquiries</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-stone-900 leading-tight tracking-tight mb-6">Start Your Project with Veechelz</h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-10 max-w-xl">From residential window treatments to corporate office fit-outs and B2B contract supply — our technical team delivers specification, fabrication, and installation across Nigeria.</p>
            <div className="space-y-4">{[
              { icon: 'Calendar', label: 'Site Survey & Specification', desc: 'On-site measurement and technical consultation' },
              { icon: 'MapPin', label: 'Nationwide Installation', desc: 'Certified teams in Lagos, Abuja, Port Harcourt & beyond' },
              { icon: 'Phone', label: 'B2B Contract Supply', desc: 'General contracting and bulk supply for developers' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-stone-200">
                <div className="flex-shrink-0 p-3 bg-stone-100 rounded-lg">
                  <svg className="h-6 w-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon === 'Calendar' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />}
                    {item.icon === 'MapPin' && (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </>
                    )}
                    {item.icon === 'Phone' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-stone-900">{item.label}</p>
                  <p className="text-sm text-stone-600">{item.desc}</p>
                </div>
              </div>
            ))}</div>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-8 md:p-10">
            <h3 className="font-serif text-xl font-medium text-stone-900 mb-6">Request a Site Survey</h3>
            <form className="space-y-5" onSubmit={(e) => {
              e.preventDefault()
              const data = new FormData(e.currentTarget)
              onOpenModal({
                name: String(data.get('name') || ''),
                email: String(data.get('email') || ''),
                phone: String(data.get('phone') || ''),
                notes: String(data.get('message') || ''),
              })
            }}>
              <div><label htmlFor="quick-name" className="block text-sm font-medium text-stone-700 mb-1.5">Full Name</label><input type="text" id="quick-name" name="name" className="w-full px-4 py-3 border border-stone-300 rounded-none text-sm focus:border-stone-900 transition-colors" placeholder="Your name" required /></div>
              <div><label htmlFor="quick-email" className="block text-sm font-medium text-stone-700 mb-1.5">Email Address</label><input type="email" id="quick-email" name="email" className="w-full px-4 py-3 border border-stone-300 rounded-none text-sm focus:border-stone-900 transition-colors" placeholder="your@email.com" required /></div>
              <div><label htmlFor="quick-phone" className="block text-sm font-medium text-stone-700 mb-1.5">Phone Number</label><input type="tel" id="quick-phone" name="phone" className="w-full px-4 py-3 border border-stone-300 rounded-none text-sm focus:border-stone-900 transition-colors" placeholder="0911 111 7575" required /></div>
              <div><label htmlFor="quick-message" className="block text-sm font-medium text-stone-700 mb-1.5">Project Details</label><textarea id="quick-message" name="message" rows={3} className="w-full px-4 py-3 border border-stone-300 rounded-none text-sm focus:border-stone-900 transition-colors resize-none" placeholder="Project type, location, timeline, and any specifications..." required /></div>
              <button type="submit" className="w-full py-3.5 bg-stone-900 text-white font-medium text-sm rounded-none hover:bg-stone-700 transition-colors">Schedule Site Survey</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}