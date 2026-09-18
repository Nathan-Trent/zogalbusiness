'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export function useScrollReveal<T extends HTMLElement = HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useLayoutEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setVisible(true)
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(max-width: 768px)').matches) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '-70px 0px 0px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}
