import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Splash } from '@/components/motion'
import { getContent, str } from '@/lib/content'
import { HOME } from '@/lib/content-schema'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-manrope', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://business.getzogal.com'),
  title: { default: 'Zogal Business — Run the business on facts.', template: '%s · Zogal Business' },
  description: 'Software for Nigerian businesses that would rather know than guess. Starting with Doka: point of sale, stock and true profit for retail shops.',
  openGraph: { type: 'website', siteName: 'Zogal Business', images: ['/brand/zogal-512.png'] },
  icons: { icon: '/brand/zogal-512.png' },
}
export const viewport: Viewport = { themeColor: '#0E1B2B' }

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const c = await getContent(HOME)
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans">
        <Splash />
        <Header />
        <main>{children}</main>
        <Footer blurb={str(c, 'footer.blurb')} made={str(c, 'footer.made')} />
      </body>
    </html>
  )
}
