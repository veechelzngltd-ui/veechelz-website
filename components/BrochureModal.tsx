'use client'

import { useState } from 'react'
import { X, CheckCircle, FileText } from 'lucide-react'

interface BrochureModalProps {
  isOpen: boolean
  onClose: () => void
  /** Optional context, e.g. which product/category the request came from. */
  interest?: string
}

const BROCHURE_URL = '/brochure.pdf'
const BROCHURE_FILENAME = 'Veechelz-Architectural-Specs-2026.pdf'

export default function BrochureModal({ isOpen, onClose, interest }: BrochureModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.phone.trim()) newErrors.phone = 'Phone/WhatsApp number is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const triggerDownload = () => {
    // Programmatic, same-origin download — no page navigation/reload.
    const link = document.createElement('a')
    link.href = BROCHURE_URL
    link.download = BROCHURE_FILENAME
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const handleClose = () => {
    onClose()
    setSubmitted(false)
    setSubmitError('')
    setFormData({ name: '', email: '', phone: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, interest: interest || '' }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to submit request')
      }

      setSubmitted(true)
      setIsSubmitting(false)
      triggerDownload()
    } catch (error) {
      console.error('Brochure request error:', error)
      // Even if lead logging fails server-side, don't block the user from
      // getting the document they asked for.
      setSubmitError(
        error instanceof Error
          ? `We couldn't log your request (${error.message}), but here's your download.`
          : "We couldn't log your request, but here's your download."
      )
      setSubmitted(true)
      setIsSubmitting(false)
      triggerDownload()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm transition-[opacity,visibility] duration-300 ease-out"
      role="dialog"
      aria-modal="true"
      aria-labelledby="brochure-modal-title"
    >
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in-up transition-[transform,opacity] duration-300 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-100 rounded-lg">
              <FileText className="h-5 w-5 text-stone-700" aria-hidden="true" />
            </div>
            <h2 id="brochure-modal-title" className="font-serif text-xl font-medium text-stone-900">
              Request Technical Brochure
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-stone-400 hover:text-stone-700 cursor-pointer transition-[transform,color] duration-100 ease-out active:scale-95"
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
            <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">Your Download Has Started</h3>
            <p className="text-stone-600 mb-2">
              Thanks, {formData.name.split(' ')[0] || 'there'} — the technical spec sheet should begin downloading automatically.
            </p>
            {submitError && <p className="text-sm text-amber-600 mb-4">{submitError}</p>}
            <div className="flex gap-3 justify-center mt-4">
              <button
                type="button"
                onClick={triggerDownload}
                className="px-5 py-2.5 border border-stone-300 text-stone-700 text-sm font-medium rounded-none cursor-pointer transition-colors hover:bg-stone-50"
              >
                Download Again
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-none cursor-pointer transition-[transform,background-color] duration-150 ease-out hover:bg-stone-700 active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        {!submitted && (
          <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
            <p className="text-sm text-stone-600">
              Enter your details and we&apos;ll send the technical spec sheet straight to your device — a member of our team may follow up with more details.
            </p>

            <div>
              <label htmlFor="brochure-name" className="block text-sm font-medium text-stone-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="brochure-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-none text-sm transition-[border-color,box-shadow] duration-200 ease-out ${
                  errors.name ? 'border-red-500 focus:border-red-500' : 'border-stone-300 focus:border-stone-900'
                }`}
                placeholder="John Smith"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'brochure-name-error' : undefined}
                disabled={isSubmitting}
              />
              {errors.name && <p id="brochure-name-error" className="mt-1 text-sm text-red-500" role="alert">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="brochure-email" className="block text-sm font-medium text-stone-700 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="brochure-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-none text-sm transition-[border-color,box-shadow] duration-200 ease-out ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-stone-300 focus:border-stone-900'
                }`}
                placeholder="john@example.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'brochure-email-error' : undefined}
                disabled={isSubmitting}
              />
              {errors.email && <p id="brochure-email-error" className="mt-1 text-sm text-red-500" role="alert">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="brochure-phone" className="block text-sm font-medium text-stone-700 mb-1.5">
                Phone / WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="brochure-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-none text-sm transition-[border-color,box-shadow] duration-200 ease-out ${
                  errors.phone ? 'border-red-500 focus:border-red-500' : 'border-stone-300 focus:border-stone-900'
                }`}
                placeholder="0911 111 7575"
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'brochure-phone-error' : undefined}
                disabled={isSubmitting}
              />
              {errors.phone && <p id="brochure-phone-error" className="mt-1 text-sm text-red-500" role="alert">{errors.phone}</p>}
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3.5 border border-stone-300 text-stone-700 font-medium text-sm rounded-none cursor-pointer transition-colors hover:bg-stone-50 disabled:opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3.5 bg-stone-900 text-white font-medium text-sm rounded-none cursor-pointer transition-colors hover:bg-stone-700 disabled:opacity-50 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Preparing...
                  </>
                ) : (
                  'Get Brochure'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
