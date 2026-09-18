import type { Metadata } from 'next'
import { IconArrowRight, IconBrandApple, IconBrandWindows, IconDownload, IconWifiOff } from '@tabler/icons-react'
import { Container, GhostButton, LeafButton } from '@/components/ui'
import { Reveal } from '@/components/motion'
import { Pricing } from '@/components/Pricing'
import { fetchPricing } from '@/lib/pricing'
import { fetchLatestRelease } from '@/lib/release'
import { APP_URL, DOWNLOAD_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Doka — the till that knows your profit',
  description: 'Point of sale, stock control and a ledger in one. Works offline. Doka by Zogal.',
}

/** Pricing is edited in the Doka back office; this page re-reads it every minute. */
export const revalidate = 60

/**
 * The Doka page — a PRODUCT SHEET, not the sub-brand's prospectus and not a
 * phone-tilt landing. Coral is Doka's own colour (data-product="doka").
 * Structure: name plate → the till, full width, in a desktop window →
 * "at the counter / on your phone" split → specification list → a four-
 * step timeline → pricing on paper (not a dark band) → questions.
 */
const SPEC: [string, string][] = [
  ['Selling', 'Scan a barcode or tap an item. Price may go above the suggested price, never below the floor you set. Optional customer on any sale.'],
  ['Stock', 'Every delivery is a batch at its own cost. Old stock keeps its cost; the sale takes the oldest first. Two-step restock: quantity and cost, then your new selling price with the margin shown.'],
  ['Profit', 'Selling price minus what that exact unit cost, minus expenses. Today, yesterday, this month, any range.'],
  ['Offline', 'The till runs from what it last downloaded. Sales queue on the computer and upload when the network returns; stock and today’s figures update locally meanwhile.'],
  ['Staff', 'Owner, manager, salesperson — or roles you define from a fixed list. Cashiers never see cost prices. Overrides need a manager PIN and are logged.'],
  ['Notebook photos', 'Still writing sales by hand? Photograph the page. Doka reads it into rows you check before anything is recorded.'],
  ['Tax', 'VAT and income-tax status update as you sell. Mark a period filed with the FIRS reference; the period locks and later entries become amendments.'],
  ['Terminals', 'Activate each shop computer with a one-time code from the dashboard. See which are online. Installed apps update themselves.'],
]

const STEPS: [string, string][] = [
  ['Create the shop', 'A minute on your phone. No card.'],
  ['Install the till', 'Windows or Mac. One activation code.'],
  ['Add items and cost', 'Or scan the barcodes.'],
  ['Sell', 'Everything else follows.'],
]

const FAQS: [string, string][] = [
  ['Does it work without internet?', 'Yes. Sales queue on the computer and upload when the connection returns. Stock and today’s figures keep updating locally.'],
  ['What do I need?', 'A Windows or Mac computer at the counter, any phone for the dashboard. A barcode scanner is optional.'],
  ['Can staff see cost prices?', 'Only if you allow it. Cashiers see selling prices and stock; cost, profit and reports are the owner’s.'],
  ['Is my data mine?', 'Yes. Each shop is separate, nothing is ever overwritten, and every change is kept with who made it.'],
]

export default async function DokaPage() {
  const [plans, release] = await Promise.all([fetchPricing(), fetchLatestRelease()])
  return (
    <div data-product="doka">
      <section className="pt-10 pb-10 sm:pt-16">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.16em] text-muted"><span className="stamp text-action">Product 01</span> by Zogal</p>
                <h1 className="mt-5 text-[64px] font-extrabold leading-[0.95] tracking-[-0.04em] text-forest sm:text-[96px] lg:text-[128px]">Doka</h1>
                <p className="mt-3 max-w-[560px] text-[22px] font-semibold leading-snug tracking-[-0.01em] text-forest sm:text-[28px]">The till that knows your profit.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <LeafButton href={APP_URL} size="lg">Create your shop <IconArrowRight size={18} /></LeafButton>
                <GhostButton href="#download" size="lg"><IconDownload size={18} /> Download the till</GhostButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <Reveal delay={0.15}><TillWindow /></Reveal>
          <p className="mt-4 text-[13px] text-muted">The Doka till on the shop computer. Free to start · set up in an afternoon · no card needed.</p>
        </Container>
      </section>

      <section className="band py-20 sm:py-24">
        <Container className="relative">
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-signal">At the counter</p>
              <h2 className="mt-3 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[44px]">Scan. Tap. Take the money.</h2>
              <p className="mt-4 max-w-[440px] text-[17px] leading-relaxed text-white/70">Nothing on the screen a cashier doesn&apos;t need. Prices can&apos;t go below your floor. The network can go; the till doesn&apos;t.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-signal">On your phone</p>
              <h2 className="mt-3 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[44px]">Takings, profit, stock — any day.</h2>
              <p className="mt-4 max-w-[440px] text-[17px] leading-relaxed text-white/70">Profit after what the stock cost and what you spent. Who sold what, on which terminal. What&apos;s running low. What the tax office will ask for.</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-action">Specification</p>
            <h2 className="mt-3 text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-forest sm:text-[48px]">What it does, in full.</h2>
          </Reveal>
          <div className="mt-10">
            {SPEC.map(([k, v], i) => (
              <Reveal key={k} delay={Math.min(i * 0.04, 0.2)}>
                <div className="spec">
                  <span className="text-[16px] font-extrabold tracking-[-0.01em] text-forest">{k}</span>
                  <p className="text-[16px] leading-relaxed text-muted">{v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <Reveal>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-action">Getting started</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-4">
              {STEPS.map(([t, b], i) => (
                <div key={t} className="relative border-t-2 border-action pt-5">
                  <span className="tabular text-[13px] font-extrabold text-action">0{i + 1}</span>
                  <h3 className="mt-1 text-[18px] font-extrabold tracking-[-0.01em] text-forest">{t}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted">{b}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="download" className="pb-20 sm:pb-28">
        <Container>
          <Reveal>
            <div className="rule-strong pt-8">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-action">Download the till</p>
              <h2 className="mt-3 text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-forest sm:text-[48px]">For the shop computer.</h2>
              <p className="mt-3 max-w-[560px] text-[16px] text-muted">
                {release.version ? `Version ${release.version}. ` : ''}Install once; it updates itself. You&apos;ll need an activation code from your dashboard the first time.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {release.installers.length === 0 ? (
                <a href={release.page} className="surface surface-hover p-6 block"><p className="text-[17px] font-extrabold text-forest">All downloads</p><p className="mt-1 text-[14px] text-muted">Windows and Mac installers on the releases page.</p></a>
              ) : release.installers.map((i) => (
                <a key={i.label} href={i.url} className="surface surface-hover p-6 block">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-mint-soft text-action">{i.label.startsWith('Windows') ? <IconBrandWindows size={22} /> : <IconBrandApple size={22} />}</span>
                  <p className="mt-4 text-[17px] font-extrabold tracking-[-0.01em] text-forest">{i.label}</p>
                  <p className="mt-1 text-[14px] text-muted">{i.note}{i.size ? ` · ${i.size}` : ''}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-bold text-action"><IconDownload size={16} /> Download</p>
                </a>
              ))}
            </div>
            <p className="mt-4 text-[13px] text-muted">On a Mac the first time: right-click the app → Open → Open. After that it opens normally.</p>
          </Reveal>
        </Container>
      </section>

      <section id="pricing" className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="rule-strong pt-8">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-action">Pricing</p>
              <h2 className="mt-3 text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-forest sm:text-[48px]">Per shop, per month.</h2>
              <p className="mt-3 text-[16px] text-muted">Change or cancel any time. Prices are set by Zogal and shown here as they stand.</p>
            </div>
          </Reveal>
          <div className="mt-10"><Pricing plans={plans} onDark={false} /></div>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container>
          <Reveal>
            <div className="rule-strong pt-8">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-action">Questions</p>
            </div>
            <dl className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
              {FAQS.map(([q, a]) => (
                <div key={q} className="rule pt-5">
                  <dt className="text-[17px] font-extrabold tracking-[-0.01em] text-forest">{q}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-muted">{a}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-14 flex flex-wrap items-center gap-3">
              <LeafButton href={APP_URL} size="lg">Start with Doka <IconArrowRight size={18} /></LeafButton>
              <span className="text-[14px] text-muted">or <a href={DOWNLOAD_URL} className="font-semibold text-forest underline">download the till</a> first</span>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  )
}

/** The till in a desktop window: item grid on the left, the sale on the right — the real layout. */
function TillWindow() {
  const items = [['Peak Milk 400g', '₦1,800', '24'], ['Indomie Chicken', '₦250', '186'], ['Golden Penny Semo 1kg', '₦1,400', '9'], ['Dangote Sugar 1kg', '₦1,650', '31'], ['Milo 400g', '₦2,900', '12'], ['Titus Sardine', '₦1,100', '58'], ['Ariel 1kg', '₦2,400', '7'], ['Coke 50cl', '₦350', '96']]
  const cart = [['Peak Milk 400g', '2', '₦3,600'], ['Indomie Chicken', '10', '₦2,500'], ['Golden Penny Semo 1kg', '1', '₦1,400']]
  return (
    <div className="window">
      <div className="window-bar"><i /><i /><i /><span className="ml-3 text-[12px] font-semibold text-muted">Doka — Nathan Shop · Front counter</span><span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-mint-soft px-2.5 py-1 text-[11px] font-bold text-action"><IconWifiOff size={12} /> Offline — 3 sales waiting to upload</span></div>
      <div className="grid md:grid-cols-[1fr_320px]">
        <div className="p-5">
          <div className="mb-4 h-10 rounded-xl border border-hair bg-ground px-3 text-[13px] leading-10 text-muted">Scan a barcode or search…</div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {items.map(([n, p, s]) => (
              <div key={n} className="rounded-xl border border-hair p-3">
                <p className="truncate text-[13px] font-semibold text-forest">{n}</p>
                <p className="tabular mt-1 text-[16px] font-extrabold text-forest">{p}</p>
                <p className="text-[11px] text-muted">{s} in stock</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-hair bg-ground p-5 md:border-l md:border-t-0">
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted">Sale</p>
          <div className="mt-3 rounded-xl border border-hair bg-white px-3 py-2 text-[12px] text-muted">Customer · <span className="font-semibold text-forest">Walk-in</span></div>
          <div className="mt-3">
            {cart.map(([n, q, t]) => (
              <div key={n} className="grid grid-cols-[1fr_auto_auto] gap-3 border-t border-hair py-2 text-[13px]"><span className="font-semibold text-forest">{n}</span><span className="text-muted">×{q}</span><span className="tabular font-extrabold text-forest">{t}</span></div>
            ))}
          </div>
          <div className="mt-4 flex items-baseline justify-between border-t-2 border-forest pt-3"><span className="text-[13px] text-muted">Total</span><span className="tabular text-[26px] font-extrabold tracking-[-0.02em] text-forest">₦7,500</span></div>
          <div className="mt-4 rounded-xl bg-action py-3 text-center text-[14px] font-bold text-white">Record sale</div>
        </div>
      </div>
    </div>
  )
}
