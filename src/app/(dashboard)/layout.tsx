import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import { AppShell } from './_components/app-shell'
import './dashboard.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' })
const fraunces = Fraunces({ subsets: ['latin', 'latin-ext'], variable: '--font-fraunces' })
export const metadata: Metadata = {
  title: { default: 'EpoFlow Demo', template: '%s · EpoFlow' },
  description: 'Ukázkový přehled firmy a osobních financí.',
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-[var(--font-inter)] antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
