'use client'

import { useState } from 'react'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import { LeafButton } from '@/components/ui'
import { TiltCard } from '@/components/motion'
import type { PricingPlan } from '@/lib/pricing'
import { APP_URL, CONTACT_EMAIL } from '@/lib/site'

/** Doka's plans exactly as set in the Doka back office. Nothing is typed on the site. */
export function Pricing({ plans, onDark = true }: { plans: PricingPlan[]; onDark?: boolean }) {
  const anyYearly = plans.some((p) => p.price_yearly != null)
  const [interval, setInterval] = useState<'month' | 'year'>('month')
  const card = onDark ? 'rounded-[24px] border border-white/12 bg-white/[0.06] p-7 backdrop-blur-[2px]' : 'surface p-7'
  const title = onDark ? 'text-white' : 'text-forest'
  const muted = onDark ? 'text-white/65' : 'text-muted'

  if (plans.length === 0) {
    return (
      <TiltCard strength={5} lift className={`${card} max-w-[520px]`}>
        <h3 className={`text-[26px] font-extrabold tracking-[-0.02em] ${title}`}>Free to start</h3>
        <p className={`mt-2 text-[16px] leading-relaxed ${muted}`}>Create your shop and install Doka today. Plans are being finalised — <a href={`mailto:${CONTACT_EMAIL}`} className="underline">ask us</a>.</p>
        <div className="mt-6"><LeafButton href={APP_URL} tone={onDark ? 'white' : 'green'}>Create your shop <IconArrowRight size={18} /></LeafButton></div>
      </TiltCard>
    )
  }

  const naira = (n: number | string) => `₦${Math.round(Number(n)).toLocaleString('en-NG')}`
  return (
    <div>
      {anyYearly ? (
        <div className={`mb-8 inline-flex rounded-full p-1 ${onDark ? 'bg-white/10' : 'bg-mint-soft'}`} role="tablist" aria-label="Billing period">
          {(['month', 'year'] as const).map((i) => (
            <button key={i} type="button" role="tab" aria-selected={interval === i} onClick={() => setInterval(i)} className={`h-10 rounded-full px-5 text-[14px] font-semibold transition-colors ${interval === i ? 'bg-white text-forest' : onDark ? 'text-white/70' : 'text-muted'}`}>
              {i === 'month' ? 'Monthly' : 'Yearly'}
            </button>
          ))}
        </div>
      ) : null}
      <div className="grid gap-5 md:grid-cols-3">
        {plans.map((p) => {
          const amount = interval === 'year' && p.price_yearly != null ? p.price_yearly : p.price_monthly
          const per = interval === 'year' && p.price_yearly != null ? 'year' : 'month'
          return (
            <TiltCard key={p.id} strength={5} lift className={`${card} flex flex-col ${p.highlight ? (onDark ? 'ring-2 ring-signal' : 'ring-2 ring-action') : ''}`}>
              {p.highlight ? <p className={`mb-2 text-[11px] font-bold uppercase tracking-[0.12em] ${onDark ? 'text-signal' : 'text-action'}`}>Recommended</p> : null}
              <h3 className={`text-[22px] font-extrabold tracking-[-0.02em] ${title}`}>{p.name}</h3>
              {p.tagline ? <p className={`mt-1 text-[15px] leading-relaxed ${muted}`}>{p.tagline}</p> : null}
              <p className={`tabular mt-5 text-[34px] font-extrabold tracking-[-0.02em] ${title}`}>
                {Number(amount) === 0 ? 'Free' : naira(amount)}
                {Number(amount) !== 0 ? <span className={`text-[14px] font-semibold ${muted}`}> / {per}</span> : null}
              </p>
              {p.features.length ? (
                <ul className={`mt-5 grid gap-2 text-[14px] ${onDark ? 'text-white/85' : 'text-ink'}`}>
                  {p.features.map((s) => (
                    <li key={s} className="flex items-start gap-2"><IconCheck size={16} className={`mt-0.5 shrink-0 ${onDark ? 'text-signal' : 'text-action'}`} />{s}</li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-auto pt-7">
                <LeafButton href={`${APP_URL}?plan=${p.key}`} tone={onDark ? 'white' : 'green'} className="w-full">Choose {p.name}</LeafButton>
              </div>
            </TiltCard>
          )
        })}
      </div>
    </div>
  )
}
