import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Splash } from '@/components/motion'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-manrope', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://business.getzogal.com'),
  title: { default: 'Zogal Business — Know your numbers. Every day.', template: '%s · Zogal Business' },
  description: 'Tools for Nigerian businesses that want to know their numbers. Starting with Doka: sales, stock and true profit for retail shops.',
  openGraph: { type: 'website', siteName: 'Zogal Business', images: ['/brand/zogal-512.png'] },
  icons: { icon: '/brand/zogal-512.png' },
}
export const viewport: Viewport = { themeColor: '#062C1A' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans">
        <Splash />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
