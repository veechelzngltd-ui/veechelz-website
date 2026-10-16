'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X, Mail } from 'lucide-react'
import { useCart } from './CartContext'

export default function Header({ onBookConsultation }: { onBookConsultation?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount, openDrawer } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Our Solutions', href: '#solutions' },
    { name: 'Parts Store', href: '/parts' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '#contact' },
  ]

  const handleConsultation = () => {
    setIsMenuOpen(false)
    if (onBookConsultation) {
      onBookConsultation()
    } else {
      window.location.hash = '#contact'
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-[background-color,border-color] duration-300 ease-out ${
        isScrolled || isMenuOpen
          ? 'bg-[#F7F5F0]/95 border-b border-[#E7E3DA]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 md:px-16" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo Brand Lockup */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="block py-2 active:scale-95 transition-transform duration-100 ease-out"
              aria-label="Veechelz Nigeria Limited — Home"
            >
              <img
                src="/logo.svg"
                alt="Veechelz Nigeria Limited"
                className="h-10 sm:h-11 md:h-12 w-auto object-contain flex-shrink-0"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ease-out hover:text-[#B38F5B] ${
                  isScrolled ? 'text-stone-700' : 'text-stone-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Action Utilities */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => (window.location.hash = '#contact')}
              className={`hidden sm:block relative p-2 transition-colors duration-200 ease-out hover:text-[#B38F5B] ${
                isScrolled ? 'text-stone-700' : 'text-stone-100'
              }`}
              aria-label="Contact"
            >
              <Mail className="h-5 w-5 stroke-[1.5]" aria-hidden="true" />
            </button>

            {/* Cart icon opens the quote request drawer */}
            <button
              onClick={openDrawer}
              className={`relative p-2 transition-colors duration-200 ease-out hover:text-[#B38F5B] ${
                isScrolled ? 'text-stone-700' : 'text-stone-100'
              }`}
              aria-label="Your Quote Request"
            >
              <ShoppingCart className="h-5 w-5 stroke-[1.5]" aria-hidden="true" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-4 w-4 bg-[#B38F5B] text-white text-[10px] font-medium rounded-full">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            <button
              onClick={handleConsultation}
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white bg-[#18181B] hover:bg-[#B38F5B] transition-colors rounded-sm shadow-sm"
            >
              Schedule Survey
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 transition-colors hover:text-[#B38F5B] focus:outline-none ${
                isScrolled || isMenuOpen ? 'text-stone-800' : 'text-stone-100'
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-[#F7F5F0] border-b border-[#E7E3DA] px-6 pt-3 pb-6 space-y-1"
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-stone-700 hover:text-[#B38F5B]"
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#E7E3DA]">
            <button
              onClick={handleConsultation}
              className="block w-full text-center px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white bg-[#18181B] hover:bg-[#B38F5B] transition-colors rounded-sm"
            >
              Schedule Survey
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
