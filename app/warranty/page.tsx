'use client'

import { useState } from 'react'
import Link from 'next/link'
import ConsultationModal from '@/components/ConsultationModal'

export default function Warranty() {
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
          Veechelz 5-Year Craftsmanship Guarantee
        </h1>

        <div className="prose prose-stone max-w-none space-y-8 text-stone-800 leading-relaxed">
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
              What's Covered (5 Full Years)
            </h2>
            <ul className="list-disc list-inside space-y-2 text-stone-800">
              <li><strong>Motorization Systems:</strong> Motor failures, internal gear mechanisms, limit switch malfunctions, remote control receiver failures</li>
              <li><strong>Headrail & Structural Components:</strong> Headrail warping or bending, structural bracket failure, extrusion joint separation, end cap detachment or failure, internal reinforcement failure</li>
              <li><strong>Mechanisms & Hardware:</strong> Tilt mechanism failure, lift mechanism wear, cord or chain breakage (manufacturing defect), pulley system failure, bearing or bushing wear</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
              Fabric & Finishes Warranty (2 Years)
            </h2>
            <ul className="list-disc list-inside space-y-2 text-stone-800">
              <li>UV discoloration or fading beyond normal expectations</li>
              <li>Lamination delamination or peeling</li>
              <li>Fabric weakening or tearing (non-abuse)</li>
              <li>Coating chipping or flaking</li>
              <li>Color bleeding or staining from manufacturing defects</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
              Service Guarantee
            </h2>
            <ul className="list-disc list-inside space-y-2 text-stone-800">
              <li>Free on-site inspection and diagnosis</li>
              <li>Replacement of defective parts at no cost</li>
              <li>Labor included for warranty repairs</li>
              <li>Service areas: Abuja (FCT), Lagos, Port Harcourt, and surrounding metropolitan areas</li>
              <li>Nationwide shipping for replacement parts available</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
              Warranty Exclusions
            </h2>
            <ul className="list-disc list-inside space-y-2 text-stone-800">
              <li>Physical damage from abuse, misuse, or accidents</li>
              <li>Unauthorized tampering, modification, or repair attempts</li>
              <li>Improper installation by third parties</li>
              <li>Exterior weather exposure on interior-rated products</li>
              <li>Damage from pets, children, or foreign objects</li>
              <li>Normal wear and tear expected over product lifespan</li>
              <li>Damage from extreme weather events (hurricanes, floods, etc.)</li>
              <li>Failure to follow provided care and maintenance instructions</li>
              <li>Commercial use exceeding 8 hours/day continuous operation</li>
            </ul>
          </section>

          <div className="pt-8 border-t border-stone-200">
            <button
              className="inline-flex items-center px-6 py-3 bg-stone-900 text-white font-medium text-sm rounded-none hover:bg-stone-700 transition-colors"
              onClick={() => setModalOpen(true)}
            >
              Submit Warranty Claim / Request Consultation
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
