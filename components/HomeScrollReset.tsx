'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Homepage only: a browser RELOAD always starts at the top (the hero).
 * - ignores the browser's saved scroll position
 * - drops any #section from the address bar on reload (e.g. /#projects)
 * Clicking a link like /#contact still jumps to that section as normal.
 */
export default function HomeScrollReset() {
  const pathname = usePathname()
  const firstRun = useRef(true)

  useEffect(() => {
    if (pathname !== '/') return

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    let handledReload = false
    if (firstRun.current) {
      firstRun.current = false
      const nav = performance.getEntriesByType('navigation')[0] as
        | PerformanceNavigationTiming
        | undefined
      if (nav?.type === 'reload') {
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search)
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
        handledReload = true
      }
    }

    if (!handledReload && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    }

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto'
      }
    }
  }, [pathname])

  return null
}
