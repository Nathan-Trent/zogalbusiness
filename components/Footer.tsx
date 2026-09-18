import Link from 'next/link'
import { IconMail } from '@tabler/icons-react'
import { Container, Wordmark } from './ui'
import { Leaf } from './Leaf'
import { LeafField } from './motion'
import { APP_URL, CONTACT_EMAIL, DOWNLOAD_URL } from '@/lib/site'

export function Footer() {
  return (
    <footer className="band mt-24">
      <LeafField>
        <Leaf size={520} tone="white" />
      </LeafField>
      <Container className="relative py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark tone="white" />
            <p className="mt-4 max-w-[360px] text-[16px] leading-relaxed text-white/75">Software for Nigerian businesses that would rather know than guess. A Zogal company.</p>
          </div>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-signal">Products</p>
            <ul className="mt-4 grid gap-2.5 text-[15px] text-white/80">
              <li><Link href="/doka" className="hover:text-white">Doka</Link></li>
              <li><a href={APP_URL} className="hover:text-white">Sign in to Doka</a></li>
              <li><a href={DOWNLOAD_URL} className="hover:text-white">Download the till</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-signal">Zogal</p>
            <ul className="mt-4 grid gap-2.5 text-[15px] text-white/80">
              <li><a href="https://getzogal.com" className="hover:text-white">Zogal for you</a></li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-1.5 hover:text-white">
                  <IconMail size={16} /> {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[13px] text-white/50">
          <span>© {new Date().getFullYear()} Zogal</span>
          <span>Doka by Zogal · made in Lagos</span>
        </div>
      </Container>
    </footer>
  )
}
