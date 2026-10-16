'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import ConsultationModal from '@/components/ConsultationModal'

const regions = [
  { name: 'Abuja (FCT)', desc: 'Home base — full survey, fabrication, and installation teams' },
  { name: 'Lagos', desc: 'Dedicated installation crew for residential and commercial projects' },
  { name: 'Port Harcourt', desc: 'Certified installers for the South-South region' },
  { name: 'Nationwide Dispatch', desc: 'Project teams travel nationwide for larger contracts' },
]

export default function InstallationServices() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Breadcrumb/Back Link */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
            <span className="mr-2">←</span> Back to Home
          </Link>
        </div>

        <h1 className="font-serif text-3xl font-medium text-stone-900 mb-8">
          Nationwide Survey & Professional Installation
        </h1>

        <div className="prose prose-stone max-w-none space-y-8 text-stone-800 leading-relaxed">
          <p className="mb-4">
            Professional installation services across Nigeria with laser-precise measurements and certified technicians.
          </p>

          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            Our Installation Protocol
          </h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-stone-900 text-white flex items-center justify-center rounded-lg mt-0.5">
                <span className="text-sm font-medium">01</span>
              </div>
              <div className="ml-4">
                <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">
                  Step 1: On-Site Survey & Sizing
                </h3>
                <p className="text-stone-600">
                  Our team visits your site to take precise physical measurements of every window recess, depth, and reveal. We check window clearances, structural anchor points, and power access for motorized setups, documenting all details so your blinds fit flush with zero light gaps.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 not-prose">
                  <div className="p-5 bg-white border border-stone-200 rounded-xl">
                    <span className="inline-block px-2.5 py-1 mb-3 text-xs font-medium tracking-wide uppercase text-green-800 bg-green-50 border border-green-200 rounded-none">
                      Complimentary
                    </span>
                    <h4 className="font-serif text-base font-medium text-stone-900 mb-2">
                      Complimentary Site Survey (Abuja Municipal)
                    </h4>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      Free on-site laser/tape measurements across central Abuja (Wuse 2, Maitama, Garki,
                      Jabi, Guzape, and surrounding municipal areas) for full-home or multi-window
                      projects upon preliminary project review.
                    </p>
                  </div>
                  <div className="p-5 bg-white border border-stone-200 rounded-xl">
                    <span className="inline-block px-2.5 py-1 mb-3 text-xs font-medium tracking-wide uppercase text-stone-700 bg-stone-100 border border-stone-200 rounded-none">
                      Rebated
                    </span>
                    <h4 className="font-serif text-base font-medium text-stone-900 mb-2">
                      Rebated Survey (Interstate & Outskirts)
                    </h4>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      For locations outside central Abuja or interstate fit-outs (Lagos, Port Harcourt,
                      nationwide), a nominal travel commitment fee applies. 100% of this fee is credited
                      directly toward your final invoice once fabrication is approved.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-stone-900 text-white flex items-center justify-center rounded-lg mt-0.5">
                <span className="text-sm font-medium">02</span>
              </div>
              <div className="ml-4">
                <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">
                  Step 2: Custom Sizing & Assembly
                </h3>
                <p className="text-stone-600">
                  Every blind is custom-cut and tailored specifically to your project's exact dimensions. We inspect the slats, align the mechanisms, test the lift cords and tilt gears, and verify fabric quality before anything leaves the workshop.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-stone-900 text-white flex items-center justify-center rounded-lg mt-0.5">
                <span className="text-sm font-medium">03</span>
              </div>
              <div className="ml-4">
                <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">
                  Step 3: Professional Fitting
                </h3>
                <p className="text-stone-600">
                  Our installers handle mounting with clean, secure brackets built to protect your wall finishes and window trim. We ensure every unit hangs level, test manual or motorized controls for smooth movement, and leave the workspace tidy when the tools are packed.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-stone-900 text-white flex items-center justify-center rounded-lg mt-0.5">
                <span className="text-sm font-medium">04</span>
              </div>
              <div className="ml-4">
                <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">
                  Step 4: Final Walkthrough & Handover
                </h3>
                <p className="text-stone-600">
                  We test every blind with you on-site—checking tilt, lift, and remote operations. You get practical care tips to keep them running smoothly and direct contact info for any follow-up adjustments.
                </p>
              </div>
            </div>
          </div>

          <section className="mt-4">
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
              Coverage Regions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {regions.map((region) => (
                <div key={region.name} className="flex items-start gap-3 p-4 bg-white border border-stone-200">
                  <MapPin className="h-5 w-5 text-stone-900 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-medium text-stone-900">{region.name}</h3>
                    <p className="text-sm text-stone-600 mt-1">{region.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="pt-8 border-t border-stone-200">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center px-6 py-3 bg-stone-900 text-white font-medium text-sm rounded-none hover:bg-stone-700 transition-colors"
            >
              Book a Site Survey
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
