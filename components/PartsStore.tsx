'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Minus, Plus, Check, ClipboardList } from 'lucide-react'
import { useCart } from './CartContext'

interface Part {
  id: string
  name: string
  description: string
  image: string
  inStock: boolean
  specs: string[]
}

const parts: Part[] = [
  {
    id: 'bottom-plate-standard',
    name: 'Standard Bottom Plate',
    description: 'Aluminum bottom rail for roller blinds — clean finish, smooth operation',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80',
    inStock: true,
    specs: ['2" Width', 'Aluminum', 'White/Black/Silver'],
  },
  {
    id: 'bottom-plate-heavy',
    name: 'Heavy-Duty Bottom Plate',
    description: 'Reinforced bottom rail for large windows and motorized systems',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80',
    inStock: true,
    specs: ['2.5" Width', 'Reinforced Aluminum', '3 Colors'],
  },
  {
    id: 'bead-chain-standard',
    name: 'Standard Bead Chain',
    description: 'Nickel-plated steel bead chain — universal fit for clutch mechanisms',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    inStock: true,
    specs: ['4.5mm Beads', 'Nickel-Plated', 'Per Foot'],
  },
  {
    id: 'bead-chain-premium',
    name: 'Premium Bead Chain',
    description: 'Stainless steel bead chain with smooth glide technology',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    inStock: true,
    specs: ['4.5mm Beads', 'Stainless Steel', 'Per Foot'],
  },
  {
    id: 'blind-material-sunscreen',
    name: 'Sunscreen Fabric (3% Open)',
    description: 'UV-blocking fabric preserves views while reducing glare and heat',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80',
    inStock: true,
    specs: ['3% Openness', 'PVC/Polyester', 'Per Sq Ft'],
  },
  {
    id: 'blind-material-blackout',
    name: 'Blackout Fabric',
    description: 'Complete light blockage — ideal for bedrooms and media rooms',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80',
    inStock: true,
    specs: ['100% Blackout', 'Multi-layer', 'Per Sq Ft'],
  },
  {
    id: 'blind-material-light-filter',
    name: 'Light Filtering Fabric',
    description: 'Soft diffusion fabric — gentle glow with privacy',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80',
    inStock: true,
    specs: ['Soft Diffusion', 'Polyester', 'Per Sq Ft'],
  },
  {
    id: 'clutch-mechanism',
    name: 'Universal Clutch Mechanism',
    description: 'Smooth operation clutch — compatible with 1.5" and 2" tubes',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80',
    inStock: true,
    specs: ['Universal Fit', 'Pre-loaded Spring', 'Lifetime Warranty'],
  },
  {
    id: 'mounting-brackets',
    name: 'Universal Mounting Brackets',
    description: 'Adjustable brackets for inside/outside mount — set of 2',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80',
    inStock: true,
    specs: ['Adjustable Depth', 'Steel Construction', 'Pair'],
  },
  {
    id: 'valance-standard',
    name: 'Standard Valance',
    description: 'Color-matched valance conceals roller tube — snap-on design',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80',
    inStock: false,
    specs: ['Snap-On', 'Color-Matched', 'Per Linear Ft'],
  },
  {
    id: 'cord-cleat',
    name: 'Safety Cord Cleat',
    description: 'Child-safe cord tensioning device — meets ANSI standards',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80',
    inStock: true,
    specs: ['Child Safe', 'ANSI Compliant', 'White/Beige'],
  },
  {
    id: 'tube-1.5',
    name: '1.5" Aluminum Tube',
    description: 'Precision-cut aluminum tube for custom roller blind builds',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80',
    inStock: true,
    specs: ['1.5" Diameter', 'Aluminum', 'Per Linear Ft'],
  },
]

interface PartCardProps {
  part: Part
  index: number
}

function PartCard({ part, index }: PartCardProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const increment = () => setQuantity((q) => Math.min(q + 1, 99))
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1))

  const handleAddToQuote = () => {
    addItem({
      id: part.id,
      name: part.name,
      image: part.image,
      specs: part.specs,
      quantity,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    setQuantity(1)
  }

  return (
    <article
      className={`group relative bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200 transition-[transform,shadow,border-color] duration-300 ease-out hover:shadow-md hover:border-stone-300 ${
        isHovered ? 'shadow-lg' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-stone-50">
        <img
          src={part.image}
          alt={part.name}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {!part.inStock && (
          <div className="absolute inset-0 bg-stone-900/60 flex items-center justify-center">
            <span className="px-4 py-2 bg-white text-stone-900 text-sm font-medium rounded-none">
              Out of Stock
            </span>
          </div>
        )}
        {part.inStock && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-stone-900 text-xs font-medium rounded-none">
              In Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-base font-medium text-stone-900 mb-1 line-clamp-1">
          {part.name}
        </h3>
        <p className="text-stone-600 text-sm mb-3 line-clamp-2">{part.description}</p>

        {/* Specs */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {part.specs.map((spec) => (
            <span key={spec} className="px-2 py-0.5 text-xs text-stone-600 bg-stone-100 rounded-none">
              {spec}
            </span>
          ))}
        </div>

        {/* Price on Request Badge */}
        <div className="mb-4">
          <span className="inline-block px-2.5 py-1 text-xs font-medium tracking-wide uppercase text-stone-700 bg-stone-100 border border-stone-200 rounded-none">
            Price on Request
          </span>
        </div>

        {/* Quantity/Action */}
        {part.inStock ? (
          added ? (
            <button className="w-full px-4 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-none flex items-center justify-center gap-2" disabled>
              <Check className="h-4 w-4" />
              Added to Quote Request
            </button>
          ) : (
            <div className="space-y-2">
              {/* Quantity Selector */}
              <div className="flex items-center justify-center border border-stone-300 rounded-none w-fit mx-auto">
                <button
                  onClick={decrement}
                  disabled={quantity <= 1}
                  className="px-3 py-1.5 text-stone-700 hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-[transform,background-color] duration-150 ease-out"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-3 py-1.5 text-sm font-medium text-stone-900 min-w-[2.5rem] text-center border-x border-stone-300">
                  {quantity}
                </span>
                <button
                  onClick={increment}
                  className="px-3 py-1.5 text-stone-700 hover:bg-stone-100 transition-[transform,background-color] duration-150 ease-out"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAddToQuote}
                className="w-full px-4 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-none hover:bg-stone-700 transition-[transform,background-color] duration-150 ease-out active:scale-95 flex items-center justify-center gap-2"
              >
                <ClipboardList className="h-4 w-4" />
                Add to Quote Request
              </button>
            </div>
          )
        ) : (
          <button className="w-full px-4 py-2.5 bg-stone-200 text-stone-500 text-sm font-medium rounded-none cursor-not-allowed" disabled>
            Unavailable
          </button>
        )}
      </div>
    </article>
  )
}

export default function PartsStore() {
  const categories = [
    { id: 'all', name: 'All Parts' },
    { id: 'bottom-plates', name: 'Bottom Plates' },
    { id: 'bead-chains', name: 'Bead Chains' },
    { id: 'materials', name: 'Blind Materials' },
    { id: 'hardware', name: 'Hardware' },
  ]
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredParts = activeCategory === 'all'
    ? parts
    : parts.filter((part) => {
        if (activeCategory === 'bottom-plates') return part.id.includes('bottom-plate')
        if (activeCategory === 'bead-chains') return part.id.includes('bead-chain')
        if (activeCategory === 'materials') return part.id.includes('material')
        if (activeCategory === 'hardware') return part.id.includes('clutch') || part.id.includes('bracket') || part.id.includes('valance') || part.id.includes('cord') || part.id.includes('tube')
        return true
      })

  return (
    <section id="parts-store" className="py-16 md:py-24 px-6 md:px-16 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-stone-100 text-stone-700 text-sm font-medium tracking-wide mb-4">
                Parts & Components
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-stone-900 leading-tight tracking-tight">
                Parts Store
              </h2>
            </div>
            <p className="text-stone-600 text-sm sm:text-base max-w-xs">
              Professional-grade components for repair, replacement, and custom builds.
              Custom quote based on availability and specification.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Part categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-sm font-medium rounded-none transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredParts.map((part, index) => (
            <PartCard key={part.id} part={part} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredParts.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-stone-600">No parts found in this category.</p>
          </div>
        )}

        {/* View More */}
        {activeCategory === 'all' && filteredParts.length === parts.length && (
          <div className="text-center mt-12">
            <Link href="/parts" className="px-8 py-4 text-base font-medium text-stone-900 border border-stone-300 rounded-none transition-all duration-300 hover:bg-stone-900 hover:border-stone-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2">
              Browse the Full Parts Store &rarr;
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
