'use client'

import { useState } from 'react'
import Image from 'next/image'
import BrochureModal from './BrochureModal'
import { FinishSwatchRow, SlatPreview, timberFinishes } from './FinishSwatches'

interface BlindsCategory {
  id: string
  name: string
  description: string
  image: string
  features: string[]
  /** Show a finish-swatch teaser row on this category's card */
  showFinishes?: boolean
}

const categories: BlindsCategory[] = [
  {
    id: 'day-night',
    name: 'Day & Night Blinds (Zebra)',
    description: 'Dual-layer fabric systems for adjustable light filtering and modern elegance.',
    image: '/images/zebra-blue-check.jpg',
    features: ['Dual-Layer System', 'Adjustable Privacy', 'Modern Aesthetic'],
  },
  {
    id: 'blackout-roller',
    name: 'Blackout Roller Blinds',
    description: 'Heavy-duty light-blocking systems perfect for bedrooms and corporate conference rooms.',
    image: '/images/roller-install-grey-hq.jpg',
    features: ['Total Light Block', 'Thermal Insulation', 'Motorized Option'],
  },
  {
    id: 'venetian-wooden',
    name: 'Venetian & Wooden Blinds',
    description: 'Classic 25mm to 50mm horizontal slat systems optimized for executive spaces.',
    image: '/images/slat-swatch-fan.jpg',
    features: ['25–50mm Slats', 'Real & Faux Wood', 'Cordless Safety'],
    showFinishes: true,
  },
]

interface CategoryCardProps {
  category: BlindsCategory
  index: number
  onExplore: (category: BlindsCategory, finish?: string) => void
}

function CategoryCard({ category, index, onExplore }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedFinish, setSelectedFinish] = useState(timberFinishes[0].name)
  const activeFinish = timberFinishes.find((f) => f.name === selectedFinish) ?? timberFinishes[0]

  return (
    <article
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200 transition-[transform,shadow,border-color] duration-500 ease-out hover:shadow-xl hover:border-stone-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {category.showFinishes ? (
          <SlatPreview
            finish={activeFinish}
            className={`absolute inset-0 h-full w-full transition-transform duration-300 ease-out ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
        ) : (
          <Image
            src={category.image}
            alt={category.name}
            fill
            className={`object-cover transition-transform duration-300 ease-out ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent transition-opacity duration-300 ease-out ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Quick Info */}
        <div className={`absolute bottom-4 left-4 right-4 translate-y-2 transition-[transform,opacity] duration-300 ease-out ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0'}`}>
          <div className="flex flex-wrap gap-2">
            {category.features.map((feature) => (
              <span key={feature} className="px-2.5 py-1 text-xs font-medium text-white bg-white/20 backdrop-blur-sm rounded-full">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-serif text-xl font-medium text-stone-900 mb-2 group-hover:text-stone-700 transition-[color] duration-200 ease-out">
          {category.name}
        </h3>
        <p className="text-stone-600 text-sm mb-4 line-clamp-2">{category.description}</p>
        {category.showFinishes && (
          <FinishSwatchRow
            finishes={timberFinishes}
            size={26}
            label={`Finish: ${selectedFinish}`}
            selected={selectedFinish}
            onSelect={(f) => setSelectedFinish(f.name)}
          />
        )}
        <div className="flex items-center justify-between">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wide uppercase text-stone-700 bg-stone-100 border border-stone-200 rounded-none">
            Custom Quote
          </span>
          <span className="text-sm text-stone-500">per window</span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6">
        <button
          type="button"
          onClick={() => onExplore(category, category.showFinishes ? selectedFinish : undefined)}
          className="w-full py-3 text-sm font-medium text-stone-700 border border-stone-300 rounded-none cursor-pointer transition-[transform,background-color,border-color] duration-150 ease-out hover:bg-stone-900 hover:border-stone-900 hover:text-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"
        >
          Explore Collection
        </button>
      </div>
    </article>
  )
}

interface ShowroomProps {
  onExploreCollection?: (categoryName: string, finish?: string) => void
}

export default function Showroom({ onExploreCollection }: ShowroomProps) {
  const [brochureOpen, setBrochureOpen] = useState(false)

  const handleExplore = (category: BlindsCategory, finish?: string) => {
    if (onExploreCollection) {
      onExploreCollection(category.name, finish)
    } else if (typeof window !== 'undefined') {
      window.location.hash = `#${category.id}`
    }
  }

  return (
    <section id="showroom" className="py-16 md:py-24 px-6 md:px-16 bg-stone-50">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-stone-100 text-stone-700 text-sm font-medium tracking-wide mb-6">
            Our Specializations
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-stone-900 leading-tight tracking-tight mb-6">
            Premium Interior Collections
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            Four core specializations engineered for discerning residential and corporate clients across Nigeria.
            Each system is specified, fabricated, and installed to exacting standards.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} onExplore={handleExplore} />
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12 md:mt-16">
          <button
            type="button"
            onClick={() => setBrochureOpen(true)}
            className="px-8 py-4 text-base font-medium text-stone-900 border border-stone-300 rounded-none cursor-pointer transition-colors duration-300 hover:bg-stone-900 hover:border-stone-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"
          >
            Request Technical Brochure
          </button>
        </div>
      </div>

      <BrochureModal isOpen={brochureOpen} onClose={() => setBrochureOpen(false)} />
    </section>
  )
}