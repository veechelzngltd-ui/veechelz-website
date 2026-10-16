'use client'

import { useState, useEffect } from 'react'
import { X, Calendar, MapPin, Phone, Mail, CheckCircle } from 'lucide-react'

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: FormData) => void
  initialNotes?: string
  /** Values captured elsewhere (e.g. the homepage quick form) to pre-fill empty fields */
  initialValues?: { name?: string; email?: string; phone?: string; notes?: string }
}

export default function ConsultationModal({ isOpen, onClose, onSubmit, initialNotes, initialValues }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    projectType: '',
    preferredDate: '',
    notes: '',
  })

  // Pre-fill the notes field when the modal is opened with a suggested product interest
  useEffect(() => {
    if (isOpen && initialNotes) {
      setFormData((prev) => ({
        ...prev,
        notes: !prev.notes || prev.notes.startsWith('Interested in:') ? initialNotes : prev.notes,
      }))
    }
  }, [isOpen, initialNotes])

  // Pre-fill contact details typed into the homepage quick form so they are not lost
  useEffect(() => {
    if (isOpen && initialValues) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || initialValues.name || '',
        email: prev.email || initialValues.email || '',
        phone: prev.phone || initialValues.phone || '',
        notes: prev.notes || initialValues.notes || '',
      }))
    }
  }, [isOpen, initialValues])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required for in-home consultation'
    if (!formData.projectType) newErrors.projectType = 'Please select a project type'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setIsSubmitting(true)
      
      try {
        const response = await fetch('/api/consultation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            projectDetails: formData.notes,
          }),
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to submit consultation')
        }
        
        setSubmitted(true)
        setIsSubmitting(false)
        
        setTimeout(() => {
          onClose()
          setSubmitted(false)
          setFormData({ name: '', email: '', phone: '', address: '', projectType: '', preferredDate: '', notes: '' })
        }, 3000)
      } catch (error) {
        console.error('Consultation submission error:', error)
        // You could set an error state here to display to the user
        setIsSubmitting(false)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm transition-[opacity,visibility] duration-300 ease-out" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in-up transition-[transform,opacity] duration-300 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <h2 id="modal-title" className="font-serif text-2xl font-medium text-stone-900">
            Book a Consultation
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 transition-[transform,color] duration-100 ease-out active:scale-95"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success State */}
        {submitted && (
          <div className="p-8 text-center transition-[opacity,transform] duration-300 ease-out">
            <div className="mx-auto mb-4 p-3 bg-green-50 rounded-full w-fit transition-[transform,opacity] duration-300 ease-out">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">Request Submitted</h3>
            <p className="text-stone-600 mb-6">We&apos;ll contact you within 24 hours to confirm your appointment.</p>
            <button onClick={onClose} className="px-6 py-3 bg-stone-900 text-white text-sm font-medium rounded-none hover:bg-stone-700 transition-[transform,background-color] duration-150 ease-out active:scale-95">
              Close
            </button>
          </div>
        )}

        {/* Form */}
        {!submitted && (
          <form onSubmit={handleSubmit} className="p-6 space-y-6" noValidate>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-none text-sm transition-[border-color,box-shadow] duration-200 ease-out ${
                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-stone-300 focus:border-stone-900'
                  }`}
                  placeholder="John Smith"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  disabled={isSubmitting}
                />
                {errors.name && <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-none text-sm transition-[border-color,box-shadow] duration-200 ease-out ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-stone-300 focus:border-stone-900'
                  }`}
                  placeholder="john@example.com"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  disabled={isSubmitting}
                />
                {errors.email && <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">{errors.email}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-none text-sm transition-[border-color,box-shadow] duration-200 ease-out ${
                    errors.phone ? 'border-red-500 focus:border-red-500' : 'border-stone-300 focus:border-stone-900'
                  }`}
                  placeholder="(503) 555-0187"
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  disabled={isSubmitting}
                />
                {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-500" role="alert">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Project Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-none text-sm transition-[border-color,box-shadow] duration-200 ease-out appearance-none bg-white ${
                    errors.projectType ? 'border-red-500 focus:border-red-500' : 'border-stone-300 focus:border-stone-900'
                  }`}
                  aria-invalid={errors.projectType ? 'true' : 'false'}
                  aria-describedby={errors.projectType ? 'projectType-error' : undefined}
                  disabled={isSubmitting}
                >
                  <option value="">Select project type</option>
                  <option value="survey-abuja-free">On-Site Survey (Abuja Municipal - Free)</option>
                  <option value="survey-interstate-rebated">Interstate / Outskirts Survey (100% Rebated on Order)</option>
                  <option value="b2b-tender">Commercial / B2B Tender</option>
                  <option value="new-construction">New Construction</option>
                  <option value="renovation">Renovation/Remodel</option>
                  <option value="replacement">Replacement Only</option>
                  <option value="commercial">Commercial Project</option>
                  <option value="motorization">Motorization Upgrade</option>
                  <option value="repair">Repair/Parts</option>
                </select>
                {errors.projectType && <p id="projectType-error" className="mt-1 text-sm text-red-500" role="alert">{errors.projectType}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-stone-700 mb-1.5">
                Installation Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-3 border rounded-none text-sm transition-colors resize-none ${
                  errors.address ? 'border-red-500 focus:border-red-500' : 'border-stone-300 focus:border-stone-900'
                }`}
                placeholder="123 Main Street, City, State ZIP"
                aria-invalid={errors.address ? 'true' : 'false'}
                aria-describedby={errors.address ? 'address-error' : undefined}
                disabled={isSubmitting}
              />
              {errors.address && <p id="address-error" className="mt-1 text-sm text-red-500" role="alert">{errors.address}</p>}
              <p className="mt-1 text-xs text-stone-500">For accurate measurement & quote</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-stone-300 rounded-none text-sm focus:border-stone-900 transition-colors"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Contact Method
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="contactMethod" value="phone" defaultChecked className="h-4 w-4 text-stone-900 border-stone-300 focus:ring-stone-900" />
                    <span className="text-sm text-stone-700">Phone</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="contactMethod" value="email" className="h-4 w-4 text-stone-900 border-stone-300 focus:ring-stone-900" />
                    <span className="text-sm text-stone-700">Email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="contactMethod" value="text" className="h-4 w-4 text-stone-900 border-stone-300 focus:ring-stone-900" />
                    <span className="text-sm text-stone-700">Text</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-stone-700 mb-1.5">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-3 border rounded-none text-sm transition-[border-color,box-shadow] duration-200 ease-out ${
                  errors.notes ? 'border-red-500 focus:border-red-500' : 'border-stone-300 focus:border-stone-900'
                }`}
                placeholder="Window count, style preferences, special requirements..."
                disabled={isSubmitting}
              />
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-stone-200">
              {[
                { icon: Calendar, label: 'Free Consultation', desc: 'No obligation' },
                { icon: MapPin, label: 'In-Home Measure', desc: 'We come to you' },
                { icon: Phone, label: 'Same-Day Quote', desc: 'Transparent pricing' },
              ].map((benefit) => (
                <div key={benefit.label} className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
                  <div className="flex-shrink-0 p-1.5 bg-stone-100 rounded-lg">
                    <benefit.icon className="h-4 w-4 text-stone-700" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-stone-900">{benefit.label}</p>
                    <p className="text-xs text-stone-500">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3.5 border border-stone-300 text-stone-700 font-medium text-sm rounded-none hover:bg-stone-50 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3.5 bg-stone-900 text-white font-medium text-sm rounded-none hover:bg-stone-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                    Submitting...
                  </>
                ) : (
                  'Book Consultation'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}