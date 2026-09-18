'use client'

import Link from 'next/link'
import { useState } from 'react'
import { IconMenu2, IconX } from '@tabler/icons-react'
import { LeafButton, Wordmark } from './ui'
import { APP_URL, NAV } from '@/lib/site'

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 bg-ground/90 backdrop-blur-md border-b border-hair`}>
      <div className="mx-auto flex h-[64px] w-full max-w-[1120px] items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Zogal Business home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-[15px] font-semibold text-forest/80 transition-colors hover:text-forest">
              {n.label}
            </Link>
          ))}
          <LeafButton href={APP_URL}>Sign in to Doka</LeafButton>
        </nav>
        <button type="button" className="grid h-11 w-11 place-items-center rounded-full text-forest md:hidden" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
          {open ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-hair bg-ground px-5 pb-6 pt-3 md:hidden">
          <nav className="grid gap-1" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-[17px] font-semibold text-forest">
                {n.label}
              </Link>
            ))}
            <div className="mt-3">
              <LeafButton href={APP_URL} className="w-full">Sign in to Doka</LeafButton>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
