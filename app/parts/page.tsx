'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, Link2, Frame, Volume2, MessageCircle } from 'lucide-react'
import { FinishSwatchRow, SlatPreview, timberFinishes } from '@/components/FinishSwatches'

type CategoryId = 'motors' | 'chains' | 'brackets' | 'acoustic'
type FilterId = 'all' | CategoryId

interface Part {
  id: string
  name: string
  sku: string
  category: CategoryId
  spec: string
  /** Optional selectable finishes (sampled from the real stock swatch card), e.g. timber slats */
  finishes?: boolean
}

const WHATSAPP_NUMBER = '2349111117575'

function whatsappLink(name: string, sku: string, finishName?: string): string {
  const message = finishName
    ? `Hello Veechelz, I would like a quote for ${name} (${sku}) in ${finishName} finish`
    : `Hello Veechelz, I would like a quote for ${name} (${sku})`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

const categoryMeta: Record<CategoryId, { label: string; icon: typeof Zap }> = {
  motors: { label: 'Motors & Smart Automation', icon: Zap },
  chains: { label: 'Control Mechanisms & Chains', icon: Link2 },
  brackets: { label: 'Brackets & Extrusions', icon: Frame },
  acoustic: { label: 'Acoustic & Slat Accessories', icon: Volume2 },
}

const filters: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All Parts' },
  { id: 'motors', label: 'Motors & Remotes' },
  { id: 'brackets', label: 'Brackets & Rails' },
  { id: 'chains', label: 'Chains & Clutches' },
  { id: 'acoustic', label: 'Acoustic Hardware' },
]

const parts: Part[] = [
  // Motors & Smart Automation
  {
    id: 'mot-25rf',
    name: '25mm RF Tubular Motor',
    sku: 'VCH-MOT-25RF',
    category: 'motors',
    spec: 'Torque: 1.1Nm | 38mm Tube Compatible',
  },
  {
    id: 'bridge-wz01',
    name: 'WiFi/Zigbee Smart Bridge',
    sku: 'VCH-BRG-WZ01',
    category: 'motors',
    spec: 'WiFi 2.4GHz + Zigbee 3.0 | Tuya Smart App',
  },
  {
    id: 'rem-15ch',
    name: 'Multi-Channel Remote (15-Channel)',
    sku: 'VCH-REM-15CH',
    category: 'motors',
    spec: 'Range: 30m Open Air | RF 433MHz',
  },
  {
    id: 'sol-5v2w',
    name: 'Solar Charging Panel',
    sku: 'VCH-SOL-5V2W',
    category: 'motors',
    spec: 'Output: 5V / 2W | USB-C Connector',
  },
  // Control Mechanisms & Chains
  {
    id: 'clt-38hd',
    name: 'Heavy-Duty Geared Clutch 38mm',
    sku: 'VCH-CLT-38HD',
    category: 'chains',
    spec: 'Load Rating: 12kg | 1:4 Gear Ratio',
  },
  {
    id: 'chn-ss45',
    name: 'Stainless Steel Ball Chain',
    sku: 'VCH-CHN-SS45',
    category: 'chains',
    spec: '4.5mm Beads | Sold Per Metre',
  },
  {
    id: 'spr-crd32',
    name: 'Cordless Spring Roller Mechanism',
    sku: 'VCH-SPR-CRD32',
    category: 'chains',
    spec: '32mm Tube | Up to 1.6m Drop',
  },
  {
    id: 'clt-adpt',
    name: 'Universal Clutch Adaptor Set',
    sku: 'VCH-CLT-ADPT',
    category: 'chains',
    spec: 'Fits 32/38/45mm Tubes',
  },
  // Brackets & Extrusions
  {
    id: 'brk-dn02',
    name: 'Dual Day/Night Brackets',
    sku: 'VCH-BRK-DN02',
    category: 'brackets',
    spec: 'Steel | Set of 2 | Powder-Coated',
  },
  {
    id: 'clp-cfm10',
    name: 'Ceiling Flush Mount Clips',
    sku: 'VCH-CLP-CFM10',
    category: 'brackets',
    spec: 'Aluminum | Pack of 10',
  },
  {
    id: 'ext-cst3m',
    name: 'Aluminum Cassette Profiles',
    sku: 'VCH-EXT-CST3M',
    category: 'brackets',
    spec: '3m Length | Anodized Finish',
  },
  {
    id: 'rail-wt25',
    name: 'Weighted Bottom Rails',
    sku: 'VCH-RAIL-WT25',
    category: 'brackets',
    spec: '25mm Insert | Per Linear Metre',
  },
  // Acoustic & Slat Accessories
  {
    id: 'acs-zclp',
    name: 'Acoustic Panel Mounting Z-Clips',
    sku: 'VCH-ACS-ZCLP',
    category: 'acoustic',
    spec: 'Steel | Pack of 20',
  },
  {
    id: 'slt-tbr50',
    name: '50mm Venetian Timber Slats',
    sku: 'VCH-SLT-TBR50',
    category: 'acoustic',
    spec: 'Basswood | Per Linear Metre',
    finishes: true,
  },
  {
    id: 'kit-gwr',
    name: 'Guide Wire Retention Kits',
    sku: 'VCH-KIT-GWR',
    category: 'acoustic',
    spec: '2mm Stainless Wire | Complete Kit',
  },
]

function PartCard({ part }: { part: Part }) {
  const Icon = categoryMeta[part.category].icon
  const [selectedFinish, setSelectedFinish] = useState(timberFinishes[0].name)
  const activeFinish = timberFinishes.find((f) => f.name === selectedFinish) ?? timberFinishes[0]
  // Drop a photo at public/images/parts/<part.id>.jpg and it appears here automatically.
  // No file yet -> the icon below stays as the placeholder.
  const photoSrc = `/images/parts/${part.id}.jpg`
  const chainFallback = part.category === 'chains' ? '/images/roller-chain-mechanism.jpg' : null

  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-[#E7E3DA] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:shadow-lg hover:border-[#B38F5B]/50">
      {/* Schematic Icon */}
      <div className="relative aspect-[4/3] flex items-center justify-center bg-[#F7F5F0]">
        {part.finishes ? (
          <SlatPreview finish={activeFinish} className="absolute inset-0 h-full w-full" />
        ) : (
          <>
            <Icon
              className="h-14 w-14 text-[#B38F5B] stroke-[1.25] transition-transform duration-300 ease-out group-hover:scale-110"
              aria-hidden="true"
            />
            <img
              src={photoSrc}
              alt={part.name}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                const img = e.currentTarget
                if (chainFallback && !img.dataset.fallback) {
                  img.dataset.fallback = '1'
                  img.style.objectPosition = 'left top'
                  img.src = chainFallback
                } else {
                  img.style.display = 'none'
                }
              }}
            />
          </>
        )}
        <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#18181B] text-[#F7F5F0] text-[10px] font-mono tracking-wider rounded-none">
          {part.sku}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-base font-medium text-[#18181B] mb-1.5 line-clamp-1">
          {part.name}
        </h3>
        <p className="text-xs text-stone-500 font-mono mb-4 leading-relaxed">
          SKU: {part.sku} | {part.spec}
        </p>

        {part.finishes && (
          <FinishSwatchRow
            size={30}
            label={`Finish: ${selectedFinish}`}
            selected={selectedFinish}
            onSelect={(f) => setSelectedFinish(f.name)}
          />
        )}

        <div className="mb-4">
          <span className="inline-block px-2.5 py-1 text-xs font-medium tracking-wide uppercase text-[#B38F5B] bg-[#18181B]/5 border border-[#B38F5B]/30 rounded-none">
            Price on Quote
          </span>
        </div>

        <a
          href={whatsappLink(part.name, part.sku, part.finishes ? selectedFinish : undefined)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#18181B] text-white text-sm font-medium rounded-none hover:bg-[#B38F5B] transition-colors duration-200 ease-out active:scale-95"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Request a Quote via WhatsApp
        </a>
      </div>
    </article>
  )
}

export default function PartsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')

  const filteredParts =
    activeFilter === 'all' ? parts : parts.filter((p) => p.category === activeFilter)

  const groupedByCategory = (Object.keys(categoryMeta) as CategoryId[])
    .map((catId) => ({
      id: catId,
      label: categoryMeta[catId].label,
      icon: categoryMeta[catId].icon,
      items: filteredParts.filter((p) => p.category === catId),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Breadcrumb/Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-stone-600 hover:text-[#18181B] transition-colors"
          >
            <span className="mr-2">←</span> Back to Home
          </Link>
        </div>

        {/* Trade Banner */}
        <div className="mb-10 p-5 md:p-6 bg-[#18181B] text-[#F7F5F0] rounded-xl flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="inline-block flex-shrink-0 w-fit px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#18181B] bg-[#B38F5B] rounded-none">
            Trade &amp; B2B
          </span>
          <p className="text-sm md:text-base text-stone-200 leading-relaxed">
            Commercial &amp; Trade Spare Parts — Genuine factory components for installers,
            facility managers, and bespoke retrofits.
          </p>
        </div>

        <div className="max-w-2xl mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-[#18181B] mb-4">
            Parts &amp; Hardware Store
          </h1>
          <p className="text-stone-600 leading-relaxed">
            Genuine motors, control mechanisms, brackets, and acoustic hardware for repair,
            replacement, and bespoke fabrication. Message our team directly on WhatsApp for
            instant ordering and dispatch.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Part categories">
          {filters.map((filter) => (
            <button
              key={filter.id}
              role="tab"
              aria-selected={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 text-sm font-medium rounded-none transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-[#18181B] text-white'
                  : 'bg-white text-stone-700 border border-[#E7E3DA] hover:border-[#B38F5B] hover:text-[#18181B]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Catalog, grouped by category */}
        <div className="space-y-14">
          {groupedByCategory.map((group) => (
            <section key={group.id} aria-labelledby={`cat-${group.id}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#18181B] rounded-lg">
                  <group.icon className="h-5 w-5 text-[#B38F5B]" aria-hidden="true" />
                </div>
                <h2
                  id={`cat-${group.id}`}
                  className="font-serif text-xl md:text-2xl font-medium text-[#18181B]"
                >
                  {group.label}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {group.items.map((part) => (
                  <PartCard key={part.id} part={part} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {filteredParts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-stone-600">No parts found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
