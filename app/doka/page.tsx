import type { Metadata } from 'next'
import { IconArrowRight, IconBrandApple, IconBrandWindows, IconDownload, IconWifiOff } from '@tabler/icons-react'
import { Container, GhostButton, LeafButton } from '@/components/ui'
import { Reveal, Stem } from '@/components/motion'
import { Pricing } from '@/components/Pricing'
import { fetchPricing } from '@/lib/pricing'
import { fetchLatestRelease } from '@/lib/release'
import { GetDoka } from '@/components/GetDoka'
import { APP_URL } from '@/lib/site'
import { getContent, pairs, str } from '@/lib/content'
import { DOKA } from '@/lib/content-schema'
import { ContactForm } from '@/components/ContactForm'

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent(DOKA)
  return { title: str(c, 'meta.title'), description: str(c, 'meta.description') }
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
export default async function DokaPage() {
  const [plans, release, c] = await Promise.all([fetchPricing(), fetchLatestRelease(), getContent(DOKA)])
  return (
    <div data-product="doka">
      <section className="pt-10 pb-10 sm:pt-16">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-muted">{str(c, 'head.eyebrow')}</p>
                <h1 className="mt-5 text-[64px] font-extrabold leading-[0.95] tracking-[-0.04em] text-forest sm:text-[96px] lg:text-[128px]">Doka</h1>
                <p className="mt-3 max-w-[560px] text-[22px] font-semibold leading-snug tracking-[-0.01em] text-forest sm:text-[28px]">{str(c, 'head.tagline')}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <LeafButton href={APP_URL} size="lg">{str(c, 'head.cta_primary')} <IconArrowRight size={18} /></LeafButton>
                <GhostButton href="#download" size="lg"><IconDownload size={18} /> {str(c, 'head.cta_secondary')}</GhostButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <Reveal delay={0.15}><TillWindow /></Reveal>
          <p className="mt-4 text-[13px] text-muted">{str(c, 'till.caption')}</p>
        </Container>
      </section>

      <section className="band py-20 sm:py-24">
        <Container className="relative">
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-signal">{str(c, 'counter.eyebrow')}</p>
              <h2 className="mt-3 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[44px]">{str(c, 'counter.title')}</h2>
              <p className="mt-4 max-w-[440px] text-[17px] leading-relaxed text-white/70">{str(c, 'counter.body')}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-signal">{str(c, 'phone.eyebrow')}</p>
              <h2 className="mt-3 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[44px]">{str(c, 'phone.title')}</h2>
              <p className="mt-4 max-w-[440px] text-[17px] leading-relaxed text-white/70">{str(c, 'phone.body')}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-action">{str(c, 'spec.eyebrow')}</p>
            <h2 className="mt-3 text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-forest sm:text-[48px]">{str(c, 'spec.title')}</h2>
          </Reveal>
          <div className="mt-10">
            {pairs(c, 'spec.items').map(([k, v], i) => (
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
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-action">{str(c, 'start.eyebrow')}</p>
              <h2 className="mt-3 text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-forest sm:text-[48px]">{str(c, 'start.title')}</h2>
              <p className="mt-4 max-w-[380px] text-[16px] leading-relaxed text-muted">{str(c, 'start.body')}</p>
            </Reveal>
            <Stem steps={pairs(c, 'start.steps').map(([title, body]) => ({ title, body }))} />
          </div>
        </Container>
      </section>

      <section id="download" className="pb-20 sm:pb-28">
        <Container>
          <Reveal>
            <div className="rule-strong pt-8">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-action">{str(c, 'download.eyebrow')}</p>
              <h2 className="mt-3 text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-forest sm:text-[48px]">{str(c, 'download.title')}</h2>
              <p className="mt-3 max-w-[560px] text-[16px] text-muted">{str(c, 'download.body')}</p>
            </div>
            <div className="mt-8"><GetDoka installers={release.installers} version={release.version} page={release.page} /></div>
            <p className="mt-6 text-[13px] text-muted">{str(c, 'download.mac_note')}</p>
          </Reveal>
        </Container>
      </section>

      <section id="pricing" className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="rule-strong pt-8">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-action">{str(c, 'pricing.eyebrow')}</p>
              <h2 className="mt-3 text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-forest sm:text-[48px]">{str(c, 'pricing.title')}</h2>
              <p className="mt-3 text-[16px] text-muted">{str(c, 'pricing.body')}</p>
            </div>
          </Reveal>
          <div className="mt-10"><Pricing plans={plans} onDark={false} /></div>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container>
          <Reveal>
            <div className="rule-strong pt-8">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-action">{str(c, 'faq.eyebrow')}</p>
            </div>
            <dl className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
              {pairs(c, 'faq.items').map(([q, a]) => (
                <div key={q} className="rule pt-5">
                  <dt className="text-[17px] font-extrabold tracking-[-0.01em] text-forest">{q}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-muted">{a}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-14 flex flex-wrap items-center gap-3">
              <LeafButton href={APP_URL} size="lg">{str(c, 'end.cta')} <IconArrowRight size={18} /></LeafButton>
              <a href="#download" className="text-[14px] font-semibold text-forest underline">{str(c, 'end.aside')}</a>
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="contact" className="pb-24 sm:pb-32">
        <Container>
          <Reveal>
            <div className="rule-strong grid gap-10 pt-8 md:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 className="text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-forest sm:text-[48px]">{str(c, 'contact.title')}</h2>
                <p className="mt-3 max-w-[380px] text-[16px] text-muted">{str(c, 'contact.body')}</p>
              </div>
              <ContactForm product="doka" source="doka" button={str(c, 'contact.button')} thanks={str(c, 'contact.thanks')} />
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  )
}

/** Doka in a desktop window: item grid on the left, the sale on the right — the real layout. */
function TillWindow() {
  const items = [['Full cream milk 400g', '₦1,800', '24'], ['Noodles (chicken)', '₦250', '186'], ['Semolina 1kg', '₦1,400', '9'], ['Sugar 1kg', '₦1,650', '31'], ['Cocoa drink 400g', '₦2,900', '12'], ['Sardines', '₦1,100', '58'], ['Detergent 1kg', '₦2,400', '7'], ['Soft drink 50cl', '₦350', '96']]
  const cart = [['Full cream milk 400g', '2', '₦3,600'], ['Noodles (chicken)', '10', '₦2,500'], ['Semolina 1kg', '1', '₦1,400']]
  return (
    <div className="window">
      <div className="window-bar"><i /><i /><i /><span className="ml-3 text-[12px] font-semibold text-muted">Doka — Sunrise Provisions · Front counter</span><span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-mint-soft px-2.5 py-1 text-[11px] font-bold text-action"><IconWifiOff size={12} /> Offline — 3 sales waiting to upload</span></div>
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
