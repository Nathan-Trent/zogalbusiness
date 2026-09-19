import Link from 'next/link'
import { IconArrowRight, IconArrowUpRight } from '@tabler/icons-react'
import { Container, GhostButton, LeafButton } from '@/components/ui'
import { Reveal } from '@/components/motion'
import { APP_URL } from '@/lib/site'
import { getContent, pairs, rows3, str, strs } from '@/lib/content'
import { HOME } from '@/lib/content-schema'

/** Copy is edited in the Zogal Business back office (Marketing); re-read every minute and on publish. */
export const revalidate = 60

/**
 * business.getzogal.com — Zogal Business.
 *
 * Not getzogal's page in different clothes. getzogal is a soft, leafy,
 * phone-in-hand page; this one is a PROSPECTUS: an ink hero that reads like
 * the cover of a ledger, a numbered product index, a manifesto in
 * numerals, and a ruled day-book as the only illustration. The leaf lives
 * in the header button and nowhere else here.
 */
export default async function BusinessHome() {
  const c = await getContent(HOME)
  const titleLines = str(c, 'hero.title').split('\n').filter(Boolean)
  const lastLine = titleLines[titleLines.length - 1] ?? ''
  const lastWord = lastLine.split(' ').pop() ?? ''
  const lastHead = lastLine.slice(0, lastLine.length - lastWord.length)
  return (
    <>
      {/* Cover: ink, full-bleed, first — the reverse of getzogal's light hero. */}
      <section className="band">
        <Container className="relative">
          <div className="grid gap-12 py-20 sm:py-28 md:grid-cols-[1fr_minmax(320px,420px)] md:items-end">
            <div>
              <Reveal>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-signal">{str(c, 'hero.eyebrow')}</p>
                <h1 className="mt-6 text-[48px] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-[72px] lg:text-[96px]">
                  {titleLines.slice(0, -1).map((l, i) => <span key={i}>{l}<br /></span>)}{lastHead}<span className="text-signal">{lastWord}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-[480px] text-[18px] leading-relaxed text-white/70 sm:text-[20px]">{str(c, 'hero.body')}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <LeafButton href="/doka" size="lg" tone="white">{str(c, 'hero.cta_primary')} <IconArrowRight size={18} /></LeafButton>
                  <GhostButton href="#products" size="lg" tone="white">{str(c, 'hero.cta_secondary')}</GhostButton>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.3}><DayBook rows={rows3(c, 'daybook.rows')} /></Reveal>
          </div>
        </Container>
      </section>

      {/* Product index: a numbered list, like a contents page. Each product carries its own colour. */}
      <section id="products" className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 md:grid-cols-[260px_1fr]">
            <Reveal>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-action">{str(c, 'index.eyebrow')}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{str(c, 'index.body')}</p>
            </Reveal>
            <div>
              <Reveal>
                <Link href="/doka" data-product="doka" className="rule-strong group block py-8">
                  <div className="grid gap-4 sm:grid-cols-[72px_1fr_auto] sm:items-start">
                    <span className="tabular text-[14px] font-extrabold text-muted">01</span>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[36px] font-extrabold leading-none tracking-[-0.03em] text-forest sm:text-[48px]">Doka</span>
                        <span className="stamp text-action">{str(c, 'index.doka.stamp')}</span>
                      </div>
                      <p className="mt-3 max-w-[560px] text-[17px] leading-relaxed text-muted">{str(c, 'index.doka.body')}</p>
                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[13px] font-semibold text-forest/70">
                        {strs(c, 'index.doka.tags').map((t) => <span key={t}>{t}</span>)}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[15px] font-bold text-action transition-transform group-hover:translate-x-1">Open <IconArrowUpRight size={18} /></span>
                  </div>
                </Link>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rule py-8 opacity-60">
                  <div className="grid gap-4 sm:grid-cols-[72px_1fr]">
                    <span className="tabular text-[14px] font-extrabold text-muted">02</span>
                    <div>
                      <span className="text-[28px] font-extrabold leading-none tracking-[-0.03em] text-forest/50">{str(c, 'index.next.title')}</span>
                      <p className="mt-2 max-w-[560px] text-[15px] leading-relaxed text-muted">{str(c, 'index.next.body')}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Manifesto: numerals and rules, no cards. */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-action">{str(c, 'manifesto.eyebrow')}</p>
            <h2 className="mt-3 max-w-[720px] text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-forest sm:text-[52px]">{str(c, 'manifesto.title')}</h2>
          </Reveal>
          <div className="mt-14 grid gap-x-12 md:grid-cols-3">
            {pairs(c, 'manifesto.items').map(([t, b], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="rule py-7">
                  <span className="tabular text-[48px] font-extrabold leading-none tracking-[-0.04em] text-action">0{i + 1}</span>
                  <h3 className="mt-4 text-[20px] font-extrabold tracking-[-0.01em] text-forest">{t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Sign-off: a short ruled block, not a centred flourish. */}
      <section className="pb-8">
        <Container>
          <Reveal>
            <div className="rule-strong grid gap-6 py-10 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] text-forest sm:text-[40px]">{str(c, 'signoff.title')}</h2>
                <p className="mt-2 max-w-[520px] text-[16px] text-muted">{str(c, 'signoff.body')}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <LeafButton href="/doka">{str(c, 'signoff.cta_primary')} <IconArrowRight size={18} /></LeafButton>
                <GhostButton href={APP_URL}>{str(c, 'signoff.cta_secondary')}</GhostButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}

/** The day-book: a ruled ledger of one shop's day. The only picture on the page. */
function DayBook({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="rounded-[18px] border border-white/15 bg-white/[0.04] p-6 text-white backdrop-blur-[2px]">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">Day book</span>
        <span className="stamp text-signal">Balanced</span>
      </div>
      <div className="mt-4">
        {rows.map(([t, d, v], i) => (
          <div key={i} className={`ledger-row ${i === rows.length - 1 ? 'border-t-2 border-white/40' : 'border-white/10'}`}>
            <span className="tabular text-[12px] text-white/45">{t}</span>
            <span className={`text-[14px] ${i === rows.length - 1 ? 'font-extrabold' : 'text-white/85'}`}>{d}</span>
            <span className={`tabular text-[14px] font-extrabold ${i === rows.length - 1 ? 'text-signal' : ''}`}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
