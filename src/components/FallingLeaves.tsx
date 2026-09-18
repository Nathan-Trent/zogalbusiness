'use client'

import { useEffect, useRef } from 'react'

const LEAF_FILES = [
  '/leaves/leaves1.webp',
  '/leaves/leaves2.webp',
  '/leaves/leaves3.webp',
  '/leaves/leaves4.webp',
  '/leaves/leaves5.webp',
  '/leaves/leaves6.webp',
]

const SHADES = ['#1a4a30', '#16402b', '#1f5538']

const INTERACT_RADIUS_DESKTOP = 120
const INTERACT_RADIUS_MOBILE = 140

type LeafState = {
  progress: number
  pushX: number
  pushY: number
  targetPushX: number
  targetPushY: number
}

function isMobileViewport() {
  return window.matchMedia('(max-width: 768px)').matches
}

export function FallingLeaves() {
  const fallRef = useRef<HTMLDivElement>(null)
  const leafIndexRef = useRef(0)
  const pointerRef = useRef({ x: -9999, y: -9999, active: false })
  const useLeafFiles = LEAF_FILES.length > 0

  useEffect(() => {
    const fall = fallRef.current
    if (!fall) return

    let cancelled = false
    let cycleTimeout: ReturnType<typeof setTimeout>

    const updatePointer = (x: number, y: number, active = true) => {
      pointerRef.current = { x, y, active }
    }

    const handleMouseMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY, true)
    }

    const handleMouseLeave = () => {
      pointerRef.current = { x: -9999, y: -9999, active: false }
    }

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) updatePointer(touch.clientX, touch.clientY, true)
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) updatePointer(touch.clientX, touch.clientY, true)
    }

    const handleTouchEnd = () => {
      pointerRef.current = { x: -9999, y: -9999, active: false }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true })

    function getFullHeight() {
      return Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight
      )
    }

    function dropLeaf() {
      if (cancelled || !fall) return

      const mobile = isMobileViewport()
      const fullH = getFullHeight()
      const el = document.createElement('div')
      const size = mobile
        ? 220 + Math.random() * 100
        : 300 + Math.random() * 120
      const sx = Math.random() * Math.max(window.innerWidth - size * 0.5, 0)

      el.style.position = 'absolute'
      el.style.left = `${sx}px`
      el.style.top = '-100px'
      el.style.pointerEvents = 'none'
      el.style.willChange = 'transform, opacity'

      if (useLeafFiles) {
        const img = document.createElement('img')
        img.src = LEAF_FILES[leafIndexRef.current % LEAF_FILES.length]
        leafIndexRef.current += 1
        img.alt = ''
        img.draggable = false
        img.decoding = 'async'
        img.loading = 'lazy'
        img.style.display = 'block'
        img.style.width = `${size}px`
        img.style.height = 'auto'
        el.appendChild(img)
      } else {
        const fill = SHADES[Math.floor(Math.random() * SHADES.length)]
        el.innerHTML = `<svg viewBox="0 0 40 46" width="${size}" height="${size * 1.15}" aria-hidden="true"><path d="M20 1 C25 6 37 15 39 26 C40 36 30 45 20 45 C10 45 0 36 1 26 C3 15 15 6 20 1 Z" fill="${fill}"/><path d="M20 5 L20 42" stroke="#2f7a52" stroke-width="1.2" fill="none"/><path d="M20 14 L11 10 M20 14 L29 10 M20 24 L9 21 M20 24 L31 21 M20 34 L13 33 M20 34 L27 33" stroke="#2f7a52" stroke-width="0.8" fill="none" opacity="0.7"/></svg>`
      }

      fall.appendChild(el)

      const dur = mobile
        ? 16000 + Math.random() * 8000
        : 20000 + Math.random() * 10000
      const driftAmp = 50 + Math.random() * 60
      const rotAmt = Math.random() * 300 - 150
      const endY = fullH + 100
      const interactRadius = mobile ? INTERACT_RADIUS_MOBILE : INTERACT_RADIUS_DESKTOP
      const state: LeafState = {
        progress: 0,
        pushX: 0,
        pushY: 0,
        targetPushX: 0,
        targetPushY: 0,
      }

      let lastT = performance.now()

      function anim(t: number) {
        if (cancelled) {
          el.remove()
          return
        }

        const delta = Math.min(t - lastT, 50)
        lastT = t

        const sway = Math.sin(state.progress * Math.PI * 3) * driftAmp
        const wind = state.progress * 40
        const baseX = sx + sway + wind
        const baseY = -100 + state.progress * endY
        const centerX = baseX + state.pushX + size / 2
        const centerY = baseY + state.pushY + size / 2

        const { x: pointerX, y: pointerY, active: pointerActive } = pointerRef.current
        const dist = Math.hypot(centerX - pointerX, centerY - pointerY)
        const isPaused = pointerActive && dist < interactRadius

        if (isPaused) {
          const strength = ((interactRadius - dist) / interactRadius) * 45
          const angle = Math.atan2(centerY - pointerY, centerX - pointerX)
          state.targetPushX = Math.cos(angle) * strength
          state.targetPushY = Math.sin(angle) * strength
        } else {
          state.progress += delta / dur
          state.targetPushX = 0
          state.targetPushY = 0
        }

        state.pushX += (state.targetPushX - state.pushX) * 0.12
        state.pushY += (state.targetPushY - state.pushY) * 0.12

        if (state.progress >= 1) {
          el.remove()
          return
        }

        el.style.transform = `translate(${baseX + state.pushX}px, ${baseY + state.pushY}px) rotate(${rotAmt * state.progress + Math.sin(state.progress * Math.PI * 4) * 15}deg)`
        el.style.opacity = String(
          state.progress < 0.05
            ? state.progress * 17
            : state.progress > 0.9
              ? (1 - state.progress) * 8.5
              : 0.85
        )

        requestAnimationFrame(anim)
      }

      requestAnimationFrame(anim)
    }

    function cycle() {
      if (cancelled) return
      dropLeaf()
      const mobile = isMobileViewport()
      const delay = mobile
        ? 14000 + Math.random() * 2000
        : 7000 + Math.random() * 4000
      cycleTimeout = setTimeout(cycle, delay)
    }

    const initialTimeout = setTimeout(cycle, isMobileViewport() ? 1500 : 700)

    return () => {
      cancelled = true
      clearTimeout(initialTimeout)
      clearTimeout(cycleTimeout)
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [useLeafFiles])

  return (
    <div
      ref={fallRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 39,
        overflow: 'hidden',
      }}
    />
  )
}
