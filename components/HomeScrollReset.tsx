'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * On the homepage, a reload always starts at the top (the hero), instead of the
 * browser restoring an old scroll position further down the page.
 * Links with a #section in the URL (e.g. /#contact) still jump to that section.
 */
export default function HomeScrollReset() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') return
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    }
    return () => {
      // Give normal back/forward scroll behaviour back to every other page.
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto'
      }
    }
  }, [pathname])

  return null
}
