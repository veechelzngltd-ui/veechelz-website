'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import ConsultationModal from '@/components/ConsultationModal'

type Category = 'all' | 'residential' | 'commercial' | 'motorized'

interface Project {
  id: string
  title: string
  category: Exclude<Category, 'all'>
  location: string
  blindTypes: string[]
  image: string
  description: string
}

const projects: Project[] = [
  {
    id: 'wuse-penthouse',
    title: 'Wuse II Penthouse Residence',
    category: 'residential',
    location: 'Abuja, FCT',
    blindTypes: ['Day & Night Blinds', 'Blackout Roller'],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    description: 'Full-floor penthouse fit-out combining zebra blinds in living areas with blackout roller systems across all bedrooms.',
  },
  {
    id: 'victoria-island-hq',
    title: 'Victoria Island Corporate HQ',
    category: 'commercial',
    location: 'Lagos',
    blindTypes: ['Motorized Blackout Roller', 'Venetian Blinds'],
    image: 'https://images.unsplash.com/photo-1505843513577-22bbc9b4e96a?w=800&q=80',
    description: 'Twelve-floor office fit-out with centrally controlled motorized blackout systems for conference rooms and executive suites.',
  },
  {
    id: 'asokoro-villa',
    title: 'Asokoro Family Villa',
    category: 'residential',
    location: 'Abuja, FCT',
    blindTypes: ['Venetian & Wooden Blinds'],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    description: 'Executive residence with natural wood Venetian blinds across the reception and study.',
  },
  {
    id: 'ph-conference-center',
    title: 'Port Harcourt Conference Center',
    category: 'commercial',
    location: 'Port Harcourt',
    blindTypes: ['Motorized Blackout Roller'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    description: "Fully motorized blackout system across six event halls, integrated with the venue's smart building controls.",
  },
  {
    id: 'lekki-smart-home',
    title: 'Lekki Phase 1 Smart Home',
    category: 'motorized',
    location: 'Lagos',
    blindTypes: ['Motorized Day & Night', 'Tuya Smart Integration'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    description: 'Whole-home motorization project with voice control and app scheduling across 22 windows.',
  },
  {
    id: 'maitama-office-park',
    title: 'Maitama Office Park',
    category: 'commercial',
    location: 'Abuja, FCT',
    blindTypes: ['Blackout Roller Blinds'],
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    description: 'Multi-tenant office park fit-out with light-filtering roller systems in shared spaces.',
  },
  {
    id: 'ikoyi-residence',
    title: 'Ikoyi Waterfront Residence',
    category: 'motorized',
    location: 'Lagos',
    blindTypes: ['Motorized Venetian Blinds', 'RF Remote Control'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    description: 'Waterfront residence with motorized aluminum Venetian blinds engineered for high-humidity coastal conditions.',
  },
  {
    id: 'garki-clinic',
    title: 'Garki Medical Center',
    category: 'commercial',
    location: 'Abuja, FCT',
    blindTypes: ['Light Filtering Roller Blinds'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    description: 'Light-filtering roller blinds specified for patient comfort and glare control across consultation rooms.',
  },
]

const filters: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'motorized', label: 'Motorized Systems' },
]

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('all')
  const [modalOpen, setModalOpen] = useState(false)

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Breadcrumb/Back Link */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
            <span className="mr-2">←</span> Back to Home
          </Link>
        </div>

        <div className="max-w-2xl mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-stone-900 mb-4">
            Project Portfolio
          </h1>
          <p className="text-stone-600 leading-relaxed">
            A selection of luxury residential and commercial installations across Nigeria — from bespoke
            window treatments to fully motorized smart-home systems.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Project categories">
          {filters.map((filter) => (
            <button
              key={filter.id}
              role="tab"
              aria-selected={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 text-sm font-medium rounded-none transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200 transition-[transform,shadow,border-color] duration-300 ease-out hover:shadow-lg hover:border-stone-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-stone-500 mb-3">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {project.location}
                </div>
                <p className="text-stone-600 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.blindTypes.map((type) => (
                    <span key={type} className="px-2 py-0.5 text-xs text-stone-600 bg-stone-100 rounded-none">
                      {type}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full py-3 text-sm font-medium text-stone-700 border border-stone-300 rounded-none transition-[background-color,border-color,color] duration-150 ease-out hover:bg-stone-900 hover:border-stone-900 hover:text-white"
                >
                  Request Similar Fit-Out
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-stone-600">No projects found in this category.</p>
          </div>
        )}
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
