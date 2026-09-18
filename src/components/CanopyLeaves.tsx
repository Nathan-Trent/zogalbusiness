'use client'

import { useEffect, useRef, useState } from 'react'

const LEAF_FILES = [
  '/leaves/leaves1.webp',
  '/leaves/leaves2.webp',
  '/leaves/leaves3.webp',
  '/leaves/leaves4.webp',
  '/leaves/leaves5.webp',
  '/leaves/leaves6.webp',
]

type CanopyLeafConfig = {
  left?: string
  right?: string
  top: number
  size: number
  rotate: number
  d: number
  leafIndex: number
  shade: string
}

const DESKTOP_CANOPY: CanopyLeafConfig[] = [
  { left: '-12%', top: -220, size: 520, rotate: -28, d: 14, leafIndex: 0, shade: '#1a4a30' },
  { left: '2%', top: -280, size: 480, rotate: 22, d: 18, leafIndex: 1, shade: '#16402b' },
  { left: '14%', top: -180, size: 440, rotate: -12, d: 10, leafIndex: 2, shade: '#1f5538' },
  { left: '28%', top: -260, size: 560, rotate: 35, d: 16, leafIndex: 3, shade: '#143a26' },
  { left: '42%', top: -200, size: 420, rotate: -18, d: 12, leafIndex: 4, shade: '#1a4a30' },
  { left: '55%', top: -240, size: 500, rotate: 28, d: 20, leafIndex: 5, shade: '#16402b' },
  { left: '68%', top: -190, size: 460, rotate: -32, d: 11, leafIndex: 6, shade: '#1f5538' },
  { left: '78%', top: -270, size: 540, rotate: 16, d: 15, leafIndex: 7, shade: '#143a26' },
  { right: '-8%', top: -230, size: 490, rotate: -24, d: 13, leafIndex: 8, shade: '#1a4a30' },
]

const MOBILE_CANOPY: CanopyLeafConfig[] = [
  { left: '-8%', top: -140, size: 320, rotate: 32, d: 14, leafIndex: 0, shade: '#1a4a30' },
  { left: '28%', top: -160, size: 360, rotate: -18, d: 12, leafIndex: 2, shade: '#16402b' },
  { right: '-4%', top: -150, size: 340, rotate: -30, d: 16, leafIndex: 4, shade: '#143a26' },
]

function InlineCanopyLeaf({ size, shade }: { size: number; shade: string }) {
  return (
    <svg
      viewBox="0 0 100 110"
      width={size}
      height={Math.round(size * 1.1)}
      aria-hidden="true"
      style={{ display: 'block', width: size, height: 'auto' }}
    >
      <path
        d="M50 2 C62 14 90 32 95 56 C99 78 74 102 50 108 C26 102 1 78 5 56 C10 32 38 14 50 2 Z"
        fill={shade}
      />
      <path d="M50 8 L50 104" stroke="#2a6b48" strokeWidth="1.6" fill="none" />
      <path
        d="M50 26 L26 20 M50 26 L74 20 M50 46 L20 42 M50 46 L80 42 M50 66 L24 66 M50 66 L76 66"
        stroke="#235a3c"
        strokeWidth="0.9"
        fill="none"
        opacity="0.8"
      />
    </svg>
  )
}

export function CanopyLeaves() {
  const leafRefs = useRef<(HTMLDivElement | null)[]>([])
  const baseTransforms = useRef<string[]>([])
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const useLeafFiles = LEAF_FILES.length > 0
  const canopy = mounted && isMobile ? MOBILE_CANOPY : DESKTOP_CANOPY

  useEffect(() => {
    setMounted(true)
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!mounted) return

    baseTransforms.current = canopy.map((leaf) => `rotate(${leaf.rotate}deg)`)
    leafRefs.current.forEach((el, i) => {
      if (el) el.style.transform = baseTransforms.current[i]
    })
  }, [mounted, canopy])

  useEffect(() => {
    if (!mounted) return

    if (isMobile) {
      leafRefs.current.forEach((el, i) => {
        if (el) el.style.transform = baseTransforms.current[i] ?? ''
      })
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      const px = e.clientX / window.innerWidth
      const py = e.clientY / window.innerHeight

      canopy.forEach((leaf, i) => {
        const el = leafRefs.current[i]
        if (!el) return
        const dx = (px - 0.5) * leaf.d
        const dy = (py - 0.5) * leaf.d
        el.style.transform = `translate(${dx}px, ${dy}px) rotate(${leaf.rotate}deg)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mounted, isMobile, canopy])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: mounted && isMobile ? '280px' : '420px',
        zIndex: 2,
        pointerEvents: 'none',
        overflow: 'hidden',
        visibility: mounted ? 'visible' : 'hidden',
      }}
    >
      {canopy.map((leaf, i) => (
        <div
          key={`${isMobile ? 'm' : 'd'}-${i}`}
          ref={(el) => {
            leafRefs.current[i] = el
          }}
          data-d={leaf.d}
          style={{
            position: 'absolute',
            ...(leaf.left !== undefined ? { left: leaf.left } : {}),
            ...(leaf.right !== undefined ? { right: leaf.right } : {}),
            top: `${leaf.top}px`,
            transform: `rotate(${leaf.rotate}deg)`,
            transition: 'transform 0.3s ease-out',
            willChange: 'transform',
          }}
        >
          {useLeafFiles ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={LEAF_FILES[leaf.leafIndex % LEAF_FILES.length]}
              alt=""
              width={leaf.size}
              height={Math.round(leaf.size * 1.1)}
              decoding="async"
              draggable={false}
              style={{ width: leaf.size, height: 'auto', display: 'block' }}
            />
          ) : (
            <InlineCanopyLeaf size={leaf.size} shade={leaf.shade} />
          )}
        </div>
      ))}
    </div>
  )
}
