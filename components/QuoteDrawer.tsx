'use client'

import { useState } from 'react'
import { X, Minus, Plus, Trash2, CheckCircle, ClipboardList } from 'lucide-react'
import { useCart } from './CartContext'

interface ContactInfo {
  name: string
  phone: string
  email: string
  city: string
}

const emptyContact: ContactInfo = { name: '', phone: '', email: '', city: '' }

type DrawerView = 'cart' | 'details' | 'success'

export default function QuoteDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity, clearCart } = useCart()
  const [view, setView] = useState<DrawerView>('cart')
  const [contact, setContact] = useState<ContactInfo>(emptyContact)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  if (!isDrawerOpen) return null

  const handleClose = () => {
    closeDrawer()
    // Reset transient view state after the close animation would finish
    setTimeout(() => {
      if (view === 'success') {
        setView('cart')
        setContact(emptyContact)
      }
    }, 200)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const validateContact = () => {
    const newErrors: Record<string, string> = {}
    if (!contact.name.trim()) newErrors.name = 'Full name is required'
    if (!contact.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!contact.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) newErrors.email = 'Invalid email format'
    if (!contact.city.trim()) newErrors.city = 'Delivery/installation city is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleProceed = () => {
    const detailsAlreadyFilled = contact.name && contact.phone && contact.email && contact.city
    if (detailsAlreadyFilled) {
      void handleSubmit()
    } else {
      setView('details')
    }
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!validateContact()) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          city: contact.city,
          items: items.map((i) => ({
            title: i.name,
            finish: i.finish || 'Not specified',
            quantity: i.quantity,
            specifications: i.specs || [],
          })),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to submit quote request')
      }

      clearCart()
      setView('success')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="quote-drawer-title">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity duration-300 ease-out"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <h2 id="quote-drawer-title" className="font-serif text-2xl font-medium text-stone-900">
            {view === 'success' ? 'Request Sent' : 'Your Quote Request'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-stone-400 hover:text-stone-700 transition-[transform,color] duration-100 ease-out active:scale-95"
            aria-label="Close quote request"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success View */}
        {view === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="mx-auto mb-4 p-3 bg-green-50 rounded-full w-fit">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">Quote Request Sent</h3>
            <p className="text-stone-600 max-w-xs">
              Our team will verify material availability and follow up via email/phone with full pricing.
            </p>
            <button
              onClick={handleClose}
              className="mt-8 px-6 py-3 bg-stone-900 text-white text-sm font-medium rounded-none hover:bg-stone-700 transition-colors"
            >
              Close
            </button>
          </div>
        )}

        {/* Cart View */}
        {view === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-stone-500">
                  <ClipboardList className="h-10 w-10 mb-3 text-stone-300" aria-hidden="true" />
                  <p className="text-sm">Your quote request is empty.</p>
                  <p className="text-xs mt-1">Add items from the Parts Store to get started.</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 pb-4 border-b border-stone-100 last:border-0">
                      {item.image && (
                        <div className="flex-shrink-0 w-16 h-16 bg-stone-50 rounded-lg overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-stone-900 truncate">{item.name}</h4>
                        {item.finish && <p className="text-xs text-stone-500 mt-0.5">Finish: {item.finish}</p>}
                        {item.specs && item.specs.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {item.specs.map((spec) => (
                              <span key={spec} className="px-1.5 py-0.5 text-[11px] text-stone-600 bg-stone-100 rounded-none">
                                {spec}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-stone-300 rounded-none">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="px-2 py-1 text-stone-700 hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="px-3 py-1 text-xs font-medium text-stone-900 min-w-[2rem] text-center border-x border-stone-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-stone-700 hover:bg-stone-100"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-stone-200 bg-stone-50">
                <p className="text-sm text-stone-600 leading-relaxed mb-4">
                  Final pricing determined by dimensions, fabric grade, and site survey.
                </p>
                <button
                  onClick={handleProceed}
                  className="w-full py-3.5 bg-stone-900 text-white font-medium text-sm rounded-none hover:bg-stone-700 transition-colors"
                >
                  Submit for Availability & Quote
                </button>
              </div>
            )}
          </>
        )}

        {/* Details View */}
        {view === 'details' && (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col" noValidate>
            <p className="text-sm text-stone-600 mb-6">
              Almost there — share your details so our team can confirm availability and prepare your quote.
            </p>

            <div className="space-y-4 flex-1">
              <div>
                <label htmlFor="quote-name" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="quote-name"
                  name="name"
                  value={contact.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-none text-sm transition-colors ${
                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-stone-300 focus:border-stone-900'
                  }`}
                  placeholder="John Smith"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500" role="alert">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="quote-phone" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="quote-phone"
                  name="phone"
                  value={contact.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-none text-sm transition-colors ${
                    errors.phone ? 'border-red-500 focus:border-red-500' : 'border-stone-300 focus:border-stone-900'
                  }`}
                  placeholder="0911 111 7575"
                  disabled={isSubmitting}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500" role="alert">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="quote-email" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="quote-email"
                  name="email"
                  value={contact.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-none text-sm transition-colors ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-stone-300 focus:border-stone-900'
                  }`}
                  placeholder="john@example.com"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500" role="alert">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="quote-city" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Delivery / Installation City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="quote-city"
                  name="city"
                  value={contact.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-none text-sm transition-colors ${
                    errors.city ? 'border-red-500 focus:border-red-500' : 'border-stone-300 focus:border-stone-900'
                  }`}
                  placeholder="Abuja, Lagos, Port Harcourt..."
                  disabled={isSubmitting}
                />
                {errors.city && <p className="mt-1 text-sm text-red-500" role="alert">{errors.city}</p>}
              </div>

              {submitError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2" role="alert">
                  {submitError}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-6 mt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setView('cart')}
                className="flex-1 px-4 py-3.5 border border-stone-300 text-stone-700 font-medium text-sm rounded-none hover:bg-stone-50 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3.5 bg-stone-900 text-white font-medium text-sm rounded-none hover:bg-stone-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Submit for Availability & Quote'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
