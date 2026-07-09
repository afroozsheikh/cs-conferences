import type { Metadata } from 'next'
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display-var',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body-var',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-var',
})

export const metadata: Metadata = {
  title: 'CS Conference Alerts',
  description:
    'Upcoming computer science conferences — deadlines, venues, and CORE rankings. Curated by the Centre for Applied AI, Macquarie University.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body">{children}</body>
    </html>
  )
}
