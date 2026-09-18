import Link from 'next/link'
import { IconArrowRight, IconBuildingStore, IconReceipt, IconWifiOff, IconCamera } from '@tabler/icons-react'
import { Leaf } from '@/components/Leaf'
import { Container, Eyebrow, GhostButton, LeafButton } from '@/components/ui'
import { Branch, Flourish, LeafField, Reveal, TiltCard, WordPullUp } from '@/components/motion'
import { APP_URL } from '@/lib/site'

/**
 * business.getzogal.com — the Zogal Business sub-brand, in the getzogal.com
 * design: light ground, white surfaces, forest bands, the leaf. What it is,
 * and the products under it. Today: Doka. A product card goes to its page,
 * never straight to the app.
 */
export default function BusinessHome() {
  return (
    <>
      <section className="relative overflow-hidden pt-6 pb-16 sm:pt-10 sm:pb-24">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <div className="md:-mt-6">
              <Reveal><Eyebrow>Zogal Business</Eyebrow></Reveal>
              <WordPullUp text="Know your numbers. Every day." className="mt-4 text-[44px] font-extrabold leading-[1.02] tracking-[-0.03em] text-forest sm:text-[64px] lg:text-[76px]" />
              <Reveal delay={0.35}>
                <p className="mt-6 max-w-[520px] text-[18px] leading-relaxed text-muted sm:text-[20px]">
                  Zogal helps people see their money coming. Zogal Business does the same for the businesses they run — starting with the shop on the corner.
                </p>
              </Reveal>
              <Reveal delay={0.5}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <LeafButton href="/doka" size="lg">Meet Doka <IconArrowRight size={18} /></LeafButton>
                  <GhostButton href="#products" size="lg">Our products</GhostButton>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.25}><Composition /></Reveal>
          </div>
        </Container>
      </section>

      <section id="products" className="py-8 sm:py-12">
        <Container>
          <Reveal>
            <Eyebrow>Products</Eyebrow>
            <h2 className="mt-3 max-w-[640px] text-[34px] font-extrabold leading-[1.08] tracking-[-0.025em] text-forest sm:text-[46px]">One so far. Built properly.</h2>
            <p className="mt-4 max-w-[520px] text-[17px] leading-relaxed text-muted">We would rather ship one tool a shop owner uses every day than five they open once.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/doka" className="mt-10 block">
              <TiltCard strength={5} lift className="surface surface-hover leaf-card p-7 sm:p-10">
                <span className="leaf-rest lg"><Leaf size={220} /></span>
                <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-mint-soft text-action"><IconBuildingStore size={28} /></span>
                  <div>
                    <p className="flex items-baseline gap-2"><span className="text-[28px] font-extrabold tracking-[-0.02em] text-forest">Doka</span><span className="text-[14px] font-semibold text-muted">by Zogal</span></p>
                    <p className="mt-2 max-w-[560px] text-[16px] leading-relaxed text-muted">Sales, stock and true profit for retail shops. A till that keeps working when the network doesn&apos;t, and a dashboard that shows the owner the real numbers from anywhere.</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[15px] font-bold text-action">Learn more <IconArrowRight size={18} /></span>
                </div>
              </TiltCard>
            </Link>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="relative">
            <Branch />
            <div className="relative grid gap-4 sm:grid-cols-3">
              {[
                { Icon: IconWifiOff, t: 'Works without the network', b: 'A till that stops when the data finishes is not a till. Ours keeps selling and catches up later.' },
                { Icon: IconReceipt, t: 'True profit, not a guess', b: 'Every sale knows exactly what that stock cost. Profit is a fact, not a feeling.' },
                { Icon: IconCamera, t: 'Meets people where they are', b: 'Barcodes if you have them. A photo of the notebook page if you don’t.' },
              ].map((x, i) => (
                <Reveal key={x.t} delay={i * 0.08}>
                  <div className="surface surface-hover leaf-card h-full p-6">
                    <span className={`leaf-rest ${i === 1 ? 'at-tr' : ''}`}><Leaf size={128} /></span>
                    <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-mint-soft text-action"><x.Icon size={22} /></span>
                    <h3 className="relative mt-4 text-[17px] font-extrabold tracking-[-0.01em] text-forest">{x.t}</h3>
                    <p className="relative mt-1.5 text-[15px] leading-relaxed text-muted">{x.b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="band py-20 sm:py-28">
        <LeafField><Leaf size={520} tone="white" /></LeafField>
        <Container className="relative">
          <Reveal>
            <Eyebrow tone="white">Why business</Eyebrow>
            <h2 className="mt-3 max-w-[680px] text-[34px] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-[46px]">Most small businesses in Nigeria run on a notebook and a feeling.</h2>
            <p className="mt-6 max-w-[600px] text-[17px] leading-relaxed text-white/75">Sales go in a book. Stock is whatever is on the shelf. Profit is what&apos;s left at the end of the month — if anything is. When it&apos;s time to file, the numbers have to be invented from memory.</p>
            <p className="mt-4 max-w-[600px] text-[17px] leading-relaxed text-white/75">Zogal Business builds tools that record the truth as it happens — every unit bought, every naira sold, every expense — so the owner sees real profit any day, and the tax figures are already there.</p>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <Reveal className="text-center">
            <h2 className="mx-auto max-w-[760px] text-[40px] font-extrabold leading-[1.04] tracking-[-0.03em] text-forest sm:text-[60px]">See it. Don&apos;t guess it.</h2>
            <Flourish />
            <p className="mx-auto mt-2 max-w-[520px] text-[18px] leading-relaxed text-muted">The same idea as Zogal for your own money, applied to the business you run.</p>
            <div className="mt-8 flex justify-center gap-3">
              <LeafButton href="/doka" size="lg">Meet Doka <IconArrowRight size={18} /></LeafButton>
              <GhostButton href={APP_URL} size="lg">Sign in</GhostButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}

/** Three tiles, stacked and tilted — the business system at a glance. */
function Composition() {
  return (
    <div className="relative mx-auto h-[300px] w-full max-w-[400px] select-none" aria-hidden>
      <TiltCard strength={10} lift baseRotate={-6} className="absolute left-2 top-10 w-[62%] rounded-2xl bg-white p-5 shadow-[var(--shadow-surface-hover)] ring-1 ring-hair">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">Takings today</p>
        <p className="tabular mt-2 text-[28px] font-extrabold text-forest">₦184,500</p>
        <div className="mt-3 h-2 w-full rounded bg-mint-soft"><div className="h-2 w-[68%] rounded bg-action" /></div>
      </TiltCard>
      <TiltCard strength={10} lift baseRotate={5} className="absolute right-0 top-0 w-[58%] rounded-2xl bg-forest p-5 text-white shadow-[var(--shadow-surface-hover)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-signal">Sale</p>
        <ul className="mt-2 grid gap-1.5 text-[13px]">
          <li className="flex justify-between gap-3"><span>Peak Milk ×2</span><span className="tabular text-white/70">₦3,600</span></li>
          <li className="flex justify-between gap-3"><span>Indomie ×10</span><span className="tabular text-white/70">₦2,500</span></li>
          <li className="flex justify-between gap-3"><span>Total</span><span className="tabular text-signal">₦6,100</span></li>
        </ul>
      </TiltCard>
      <TiltCard strength={10} lift baseRotate={-2} className="absolute bottom-0 right-8 w-[60%] rounded-2xl bg-white p-5 shadow-[var(--shadow-surface-hover)] ring-1 ring-hair">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">Gross profit</p>
        <p className="tabular mt-2 text-[22px] font-extrabold text-forest">₦41,200</p>
        <p className="mt-1 text-[12px] text-muted">after what the stock cost</p>
      </TiltCard>
    </div>
  )
}
