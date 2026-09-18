import type { Metadata } from 'next'
import { IconArrowRight, IconBarcode, IconCamera, IconChartBar, IconDeviceDesktop, IconDownload, IconPackage, IconReceipt, IconShieldCheck, IconWifiOff } from '@tabler/icons-react'
import { Leaf } from '@/components/Leaf'
import { Container, Eyebrow, GhostButton, LeafButton } from '@/components/ui'
import { Branch, Flourish, HeroPhone, LeafField, Reveal, Stem, TiltCard, WordPullUp } from '@/components/motion'
import { Accordion } from '@/components/Accordion'
import { Pricing } from '@/components/Pricing'
import { fetchPricing } from '@/lib/pricing'
import { APP_URL, DOWNLOAD_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Doka — sales, stock and true profit for your shop',
  description: 'A till that works offline, stock that knows its cost, and a dashboard that shows the owner real profit from anywhere. Doka by Zogal.',
}

/** Pricing is edited in the Doka back office; this page re-reads it every minute. */
export const revalidate = 60

const FEATURES = [
  { Icon: IconWifiOff, t: 'Works offline', b: 'Sales queue on the shop computer and upload when the network returns. The till never stops.' },
  { Icon: IconPackage, t: 'Stock that knows its cost', b: 'Every delivery is its own batch at its own price. Old stock keeps its cost; profit per sale is exact.' },
  { Icon: IconReceipt, t: 'True profit', b: 'Selling price minus what that unit cost you, minus expenses. Today, this month, any period.' },
  { Icon: IconBarcode, t: 'Barcodes', b: 'Scan what has a barcode. Print one for what doesn’t. One tap for the rest.' },
  { Icon: IconCamera, t: 'Notebook photos', b: 'Still writing sales by hand? Photograph the page — Doka reads it into rows you confirm.' },
  { Icon: IconDeviceDesktop, t: 'Owner dashboard', b: 'Takings, profit, stock, staff and terminals from your phone, anywhere.' },
  { Icon: IconShieldCheck, t: 'Staff and permissions', b: 'Cashiers sell. Managers restock. Only the owner sees cost prices. Every override is logged.' },
  { Icon: IconChartBar, t: 'Tax, already counted', b: 'VAT and income-tax status update as you sell. When you file, the figures are there.' },
]

const STEPS = [
  { title: 'Install the till on the shop computer', body: 'Windows or Mac. Activate it with a code from your dashboard. It updates itself.' },
  { title: 'Add your items and what they cost', body: 'Or scan the barcodes. Set a floor price nobody can sell below.' },
  { title: 'Sell', body: 'Scan or tap, take the money, done. With or without network.' },
  { title: 'Open your phone', body: 'Takings, profit after cost and expenses, what’s running low, who sold what — any day, any month.' },
]

const FAQS = [
  { q: 'Does it work without internet?', a: 'Yes. The till keeps selling from what it last downloaded; sales queue on the computer and upload when the connection returns. Stock and today’s figures update locally in the meantime.' },
  { q: 'What do I need?', a: 'A Windows or Mac computer at the counter and any phone for the dashboard. A barcode scanner is optional.' },
  { q: 'Can my staff see cost prices?', a: 'Only if you let them. Cashiers see selling prices and stock; cost, profit and reports are for the owner and whoever you choose.' },
  { q: 'Is my data safe?', a: 'Each shop is completely separate. Nothing is ever overwritten — every sale, price change and correction is kept with who did it and when.' },
]

export default async function DokaPage() {
  const plans = await fetchPricing()
  return (
    <>
      <section className="relative overflow-hidden pt-6 pb-20 sm:pt-10 sm:pb-28">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <div className="md:-mt-10">
              <Reveal><Eyebrow>Doka by Zogal</Eyebrow></Reveal>
              <WordPullUp text="The till that knows your profit." className="mt-4 text-[40px] font-extrabold leading-[1.02] tracking-[-0.03em] text-forest sm:text-[58px] lg:text-[66px]" />
              <Reveal delay={0.35}>
                <p className="mt-6 max-w-[520px] text-[18px] leading-relaxed text-muted sm:text-[20px]">Point of sale, stock control and a ledger in one. Sell at the counter, restock at cost, and see real profit on your phone — even when the network is off.</p>
              </Reveal>
              <Reveal delay={0.5}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <LeafButton href={APP_URL} size="lg">Create your shop <IconArrowRight size={18} /></LeafButton>
                  <GhostButton href={DOWNLOAD_URL} size="lg"><IconDownload size={18} /> Download the till</GhostButton>
                </div>
                <p className="mt-4 text-[13px] text-muted">Free to start. Set up in an afternoon. No card needed.</p>
              </Reveal>
            </div>
            <Reveal delay={0.25} className="mx-auto w-full max-w-[420px]">
              <HeroPhone><TillMock /></HeroPhone>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <div className="relative">
            <Branch />
            <div className="relative grid gap-4 sm:grid-cols-3">
              {FEATURES.slice(0, 3).map((f, i) => (
                <Reveal key={f.t} delay={i * 0.08}>
                  <div className="surface surface-hover leaf-card h-full p-6">
                    <span className={`leaf-rest ${i === 1 ? 'at-tr' : ''}`}><Leaf size={128} /></span>
                    <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-mint-soft text-action"><f.Icon size={22} /></span>
                    <h3 className="relative mt-4 text-[17px] font-extrabold tracking-[-0.01em] text-forest">{f.t}</h3>
                    <p className="relative mt-1.5 text-[15px] leading-relaxed text-muted">{f.b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <Eyebrow>Everything the shop needs</Eyebrow>
            <h2 className="mt-3 max-w-[640px] text-[34px] font-extrabold leading-[1.08] tracking-[-0.025em] text-forest sm:text-[46px]">Built for the counter, not the boardroom.</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.slice(3).map((f, i) => (
              <Reveal key={f.t} delay={i * 0.06}>
                <TiltCard strength={5} className="surface surface-hover leaf-card h-full p-6">
                  <span className={`leaf-rest ${i % 2 ? 'at-tr' : ''}`}><Leaf size={128} /></span>
                  <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-mint-soft text-action"><f.Icon size={22} /></span>
                  <h3 className="relative mt-4 text-[17px] font-extrabold tracking-[-0.01em] text-forest">{f.t}</h3>
                  <p className="relative mt-1.5 text-[15px] leading-relaxed text-muted">{f.b}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <Eyebrow>How it works</Eyebrow>
              <h2 className="mt-3 text-[34px] font-extrabold leading-[1.08] tracking-[-0.025em] text-forest sm:text-[46px]">An afternoon to set up. A minute to sell.</h2>
              <p className="mt-4 max-w-[380px] text-[17px] leading-relaxed text-muted">No accountant, no training day. If you can use a phone, you can run Doka.</p>
            </Reveal>
            <Stem steps={STEPS} />
          </div>
        </Container>
      </section>

      <section id="pricing" className="band py-20 sm:py-28">
        <LeafField><Leaf size={520} tone="white" /></LeafField>
        <Container className="relative">
          <Reveal>
            <Eyebrow tone="white">Pricing</Eyebrow>
            <h2 className="mt-3 max-w-[640px] text-[34px] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-[46px]">Priced for a shop, not a corporation.</h2>
            <p className="mt-4 text-[16px] text-white/70">Per shop, per month. Change or cancel any time.</p>
          </Reveal>
          <div className="mt-12"><Pricing plans={plans} onDark /></div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="mt-3 text-[34px] font-extrabold leading-[1.08] tracking-[-0.025em] text-forest sm:text-[46px]">Before you start</h2>
            </Reveal>
            <Reveal delay={0.1}><Accordion items={FAQS} /></Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <Reveal className="text-center">
            <h2 className="mx-auto max-w-[760px] text-[40px] font-extrabold leading-[1.04] tracking-[-0.03em] text-forest sm:text-[60px]">Stop guessing what the shop made.</h2>
            <Flourish />
            <p className="mx-auto mt-2 max-w-[520px] text-[18px] leading-relaxed text-muted">Create your shop in a minute. Install the till when you&apos;re ready.</p>
            <div className="mt-8 flex justify-center"><LeafButton href={APP_URL} size="lg">Start with Doka <IconArrowRight size={18} /></LeafButton></div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}

/** A still of the till, on the surface level — the product's own solid card. */
function TillMock() {
  const rows = [['Peak Milk 400g', '2 × ₦1,800', '₦3,600'], ['Indomie Chicken', '10 × ₦250', '₦2,500'], ['Golden Penny Semo 1kg', '1 × ₦1,400', '₦1,400']]
  return (
    <div className="surface p-6 text-[14px]">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-extrabold text-forest">Sale</span>
        <span className="rounded-full bg-mint-soft px-2.5 py-1 text-[11px] font-bold text-action">● Offline — saved locally</span>
      </div>
      {rows.map(([n, q, t]) => (
        <div key={n} className="grid grid-cols-[1fr_auto_auto] gap-3 border-t border-hair py-2.5">
          <span className="font-semibold text-forest">{n}</span><span className="text-muted">{q}</span><span className="tabular font-extrabold text-forest">{t}</span>
        </div>
      ))}
      <div className="mt-4 flex items-baseline justify-between border-t border-hair pt-4">
        <span className="text-muted">Total</span><span className="tabular text-[28px] font-extrabold tracking-[-0.02em] text-forest">₦7,500</span>
      </div>
      <div className="mt-4 rounded-2xl bg-action py-3 text-center font-bold text-white shadow-[0_8px_24px_rgba(217,142,30,0.3)]">Record sale</div>
    </div>
  )
}
