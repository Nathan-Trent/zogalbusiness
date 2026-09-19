'use client'

import { useState, type FormEvent } from 'react'
import { createClient } from '@supabase/supabase-js'
import { IconArrowRight } from '@tabler/icons-react'

/**
 * The contact form. Writes straight to contact_messages through
 * submit_contact() (anon key; shape and rate checked in Postgres) and lands
 * in the Zogal Business back office inbox. Every state is visible: sending,
 * sent, or exactly what was wrong.
 */
type Phase = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string }

export function ContactForm({ product, source, button, thanks }: { product?: string; source: string; button: string; thanks: string }) {
  const [f, setF] = useState({ name: '', email: '', phone: '', message: '', company: '' })
  const [phase, setPhase] = useState<Phase>({ kind: 'idle' })
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((s) => ({ ...s, [k]: e.target.value }))

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (phase.kind === 'sending') return
    if (f.company) { setPhase({ kind: 'sent' }); return } // honeypot: bots fill it, people never see it
    setPhase({ kind: 'sending' })
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) { setPhase({ kind: 'error', message: 'The form is not connected yet — email hello@getzogal.com instead.' }); return }
    const db = createClient(url, key, { auth: { persistSession: false } })
    const { error } = await db.rpc('submit_contact', { p_name: f.name, p_email: f.email, p_phone: f.phone || null, p_message: f.message, p_source: source, p_product: product ?? null })
    if (error) {
      const m = error.message
      setPhase({ kind: 'error', message: m === 'name' ? 'Tell us your name (2 letters or more).' : m === 'email' ? 'That email address doesn’t look right.' : m === 'message' ? 'Say a little more — at least 10 characters.' : /too many/.test(m) ? 'That’s a few messages in a row — give it an hour, or email hello@getzogal.com.' : 'Could not send. Try again, or email hello@getzogal.com.' })
      return
    }
    setPhase({ kind: 'sent' })
  }

  if (phase.kind === 'sent') return <div className="surface p-7"><p className="text-[18px] font-extrabold text-forest">{thanks}</p><p className="mt-2 text-[15px] text-muted">We reply to {f.email || 'your email'}.</p></div>

  const input = 'h-12 w-full rounded-xl border border-hair bg-white px-4 text-[15px] text-forest outline-none focus:border-forest'
  return (
    <form onSubmit={submit} className="surface grid gap-4 p-7" aria-busy={phase.kind === 'sending'}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-[13px] font-semibold text-forest">Your name<input className={input} required minLength={2} value={f.name} onChange={set('name')} autoComplete="name" /></label>
        <label className="grid gap-1.5 text-[13px] font-semibold text-forest">Email<input className={input} type="email" required value={f.email} onChange={set('email')} autoComplete="email" /></label>
      </div>
      <label className="grid gap-1.5 text-[13px] font-semibold text-forest">Phone <span className="font-normal text-muted">(optional)</span><input className={input} value={f.phone} onChange={set('phone')} autoComplete="tel" inputMode="tel" /></label>
      <label className="grid gap-1.5 text-[13px] font-semibold text-forest">Message<textarea className={`${input} h-auto min-h-[120px] py-3`} required minLength={10} value={f.message} onChange={set('message')} /></label>
      <input tabIndex={-1} autoComplete="off" value={f.company} onChange={set('company')} className="hidden" aria-hidden name="company" />
      {phase.kind === 'error' && <p role="alert" className="text-[14px] font-semibold text-[#B91C1C]">{phase.message}</p>}
      <div className="flex items-center gap-4">
        <button type="submit" disabled={phase.kind === 'sending'} className="inline-flex h-12 items-center gap-2 rounded-full bg-action px-6 text-[15px] font-bold text-white transition-opacity disabled:opacity-70">
          {phase.kind === 'sending' ? 'Sending…' : button} <IconArrowRight size={18} />
        </button>
        <span aria-live="polite" className="text-[13px] text-muted">{phase.kind === 'sending' ? 'One moment.' : ''}</span>
      </div>
    </form>
  )
}
