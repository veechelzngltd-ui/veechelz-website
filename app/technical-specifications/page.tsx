'use client'

import { useState } from 'react'
import Link from 'next/link'
import BrochureModal from '@/components/BrochureModal'
import { FinishSwatchRow, SlatPreview, timberFinishes } from '@/components/FinishSwatches'

export default function TechnicalSpecifications() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedFinish, setSelectedFinish] = useState(timberFinishes[0].name)
  const activeFinish = timberFinishes.find((f) => f.name === selectedFinish) ?? timberFinishes[0]

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
          Engineering & Technical Specifications
        </h1>

        <div className="prose prose-stone max-w-none space-y-8 text-stone-800 leading-relaxed">
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
              Slat & Fabric Profiles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-stone-900">Aluminum Slats</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>25mm thick extruded aluminum</li>
                  <li>Powder-coated finish with UV protection</li>
                  <li>Available in matte, satin, and gloss finishes</li>
                  <li>Lightweight yet durable construction</li>
                  <li>Corrosion-resistant for humid environments</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-stone-900">Wood & Faux-Wood Slats</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>50mm natural basswood or premium faux-wood</li>
                  <li>Real wood grain texture with protective coating</li>
                  <li>Faux-wood offers moisture resistance for bathrooms/kitchens</li>
                  <li>Stainable and paintable options available</li>
                  <li>Sustainably sourced materials</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-stone-900">Blackout Composite Fabrics</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Flame-retardant, triple-weave composite</li>
                  <li>100% blackout capability (up to 99% UV blocking)</li>
                  <li>Noise-reducing and thermal insulating properties</li>
                  <li>Wipe-clean, mildew-resistant surface</li>
                  <li>Available in black, white, and neutral tones</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
              Wood &amp; Faux-Wood Slat Finishes
            </h2>
            <p className="mb-4">
              Nine stock finishes, sampled from our physical finish card. Select one to preview it on the slats.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-stone-200 bg-white">
                  <SlatPreview finish={activeFinish} className="absolute inset-0 h-full w-full" />
                </div>
                <FinishSwatchRow
                  size={34}
                  label={`Finish: ${selectedFinish}`}
                  selected={selectedFinish}
                  onSelect={(f) => setSelectedFinish(f.name)}
                />
              </div>
              <figure className="m-0">
                <img
                  src="/images/slat-swatch-fan.jpg"
                  alt="Physical finish card showing nine slat colours: Tiger Eye, Black, Mahogany, Walnut, Cherry, Orange, Oak, Natural and White"
                  className="w-full rounded-xl border border-stone-200 object-cover"
                  loading="lazy"
                />
                <figcaption className="mt-2 text-xs text-stone-500">
                  Our actual slat stock: Tiger Eye, Black, Mahogany, Walnut, Cherry, Orange, Oak, Natural, White.
                </figcaption>
              </figure>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
              Headrail & Hardware
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-stone-900">Headrail Systems</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Heavy-duty extruded aluminum (1.2mm thickness)</li>
                  <li>Concealed mounting brackets for clean appearance</li>
                  <li>Reinforced corner joints for structural integrity</li>
                  <li>Available in matching finishes to slats/fabrics</li>
                  <li>Internal cable routing for motorized systems</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-stone-900">Tilt & Lift Mechanisms</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Brass tilt gears for smooth, precise operation</li>
                  <li>Stainless steel lift cords with UV protection</li>
                  <li>Anti-ratchet systems to prevent slippage</li>
                  <li>Low-friction bushings for quiet operation</li>
                  <li>Child-safe cord tensioners available</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
              Motorization & Automation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-stone-900">Motor Options</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>24V DC tubular motors (battery/solar compatible)</li>
                  <li>220V AC tubular motors for hardwired installations</li>
                  <li>Quiet operation (&lt;44dB) with soft start/stop</li>
                  <li>Programmable limits and intermediate positions</li>
                  <li>Manual override capability</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-stone-900">Smart Home Integration</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>RF remote control (433MHz with rolling code)</li>
                  <li>Tuya Smart integration (WiFi/Zigbee)</li>
                  <li>Amazon Alexa and Google Home voice control</li>
                  <li>Apple HomeKit compatibility (via bridge)</li>
                  <li>Wall switches and timers available</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
              Performance Specifications
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-stone-200">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Specification</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Aluminum</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Natural Wood</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Faux-Wood</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Blackout Fabric</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr className="bg-white">
                    <td className="px-6 py-4 text-sm font-medium text-stone-900">Material Thickness</td>
                    <td className="px-6 py-4 text-sm text-stone-700">25mm</td>
                    <td className="px-6 py-4 text-sm text-stone-700">50mm</td>
                    <td className="px-6 py-4 text-sm text-stone-700">50mm</td>
                    <td className="px-6 py-4 text-sm text-stone-700">0.45mm (fabric)</td>
                  </tr>
                  <tr className="bg-stone-50">
                    <td className="px-6 py-4 text-sm font-medium text-stone-900">UV Blocking Rating</td>
                    <td className="px-6 py-4 text-sm text-stone-700">85% (standard)</td>
                    <td className="px-6 py-4 text-sm text-stone-700">75% (natural wood)</td>
                    <td className="px-6 py-4 text-sm text-stone-700">80% (faux-wood)</td>
                    <td className="px-6 py-4 text-sm text-stone-700">99% (blackout)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4 text-sm font-medium text-stone-900">Water Resistance</td>
                    <td className="px-6 py-4 text-sm text-stone-700">Excellent</td>
                    <td className="px-6 py-4 text-sm text-stone-700">Poor (indoor only)</td>
                    <td className="px-6 py-4 text-sm text-stone-700">Excellent</td>
                    <td className="px-6 py-4 text-sm text-stone-700">Excellent</td>
                  </tr>
                  <tr className="bg-stone-50">
                    <td className="px-6 py-4 text-sm font-medium text-stone-900">Fire Rating</td>
                    <td className="px-6 py-4 text-sm text-stone-700">Non-combustible</td>
                    <td className="px-6 py-4 text-sm text-stone-700">Combustible (treated)</td>
                    <td className="px-6 py-4 text-sm text-stone-700">Self-extinguishing</td>
                    <td className="px-6 py-4 text-sm text-stone-700">Flame-retardant</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4 text-sm font-medium text-stone-900">Temperature Tolerance</td>
                    <td className="px-6 py-4 text-sm text-stone-700">-20°C to 80°C</td>
                    <td className="px-6 py-4 text-sm text-stone-700">0°C to 40°C</td>
                    <td className="px-6 py-4 text-sm text-stone-700">-10°C to 50°C</td>
                    <td className="px-6 py-4 text-sm text-stone-700">-10°C to 60°C</td>
                  </tr>
                  <tr className="bg-stone-50">
                    <td className="px-6 py-4 text-sm font-medium text-stone-900">Wind Load Resistance</td>
                    <td className="px-6 py-4 text-sm text-stone-700">Class 4 (up to 110km/h)</td>
                    <td className="px-6 py-4 text-sm text-stone-700">Class 2 (up to 60km/h)</td>
                    <td className="px-6 py-4 text-sm text-stone-700">Class 3 (up to 90km/h)</td>
                    <td className="px-6 py-4 text-sm text-stone-700">Class 3 (up to 90km/h)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
              Wet-Room Suitability
            </h2>
            <p className="mb-4">
              Faux-wood, aluminum, and blackout composite fabric systems are all rated for bathrooms, kitchens, and other high-humidity environments. Natural basswood is recommended for dry, climate-controlled interiors only, as sustained moisture exposure can warp or discolor the timber over time.
            </p>
          </section>

          <div className="pt-8 border-t border-stone-200">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center px-6 py-3 bg-stone-900 text-white font-medium text-sm rounded-none cursor-pointer transition-colors hover:bg-stone-700"
            >
              Download Spec Sheet / Request Consultation
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </div>

      <BrochureModal isOpen={modalOpen} onClose={() => setModalOpen(false)} interest="Technical specifications page" />
    </div>
  )
}
