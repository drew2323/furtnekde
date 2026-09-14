'use client'

import { BarChart3, CircleUserRound, Gauge, ListChecks, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentType } from 'react'

type Item = {
  href: string
  label: string
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
}
const items: Item[] = [
  { href: '/dashboard', label: 'Přehled', icon: Gauge },
  { href: '/analytics', label: 'Analýzy', icon: BarChart3 },
  { href: '/activity', label: 'Aktivita', icon: ListChecks },
  { href: '/personal', label: 'Osobní', icon: CircleUserRound },
  { href: '/settings', label: 'Nastavení', icon: Settings },
]

export function NavigationItem({ item, compact = false }: { item: Item; compact?: boolean }) {
  const pathname = usePathname()
  const active = pathname === item.href
  const Icon = item.icon
  return (
    <Link
      aria-current={active ? 'page' : undefined}
      className={`group flex min-h-12 items-center rounded-xl transition ${compact ? 'flex-1 flex-col justify-center gap-1 px-1 py-2 text-[0.65rem]' : 'gap-3 px-3 text-sm'} ${active ? 'bg-[var(--primary)] text-white shadow-sm' : 'text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]'}`}
      href={item.href}
    >
      <Icon size={compact ? 20 : 18} strokeWidth={active ? 2.4 : 1.8} />
      <span>{item.label}</span>
    </Link>
  )
}

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-[var(--border)] bg-[var(--surface)] p-5 md:flex">
      <Link className="mb-9 flex items-center gap-3 rounded-xl" href="/dashboard">
        <span className="grid size-10 place-items-center rounded-xl bg-[var(--primary)] font-semibold text-[var(--accent)]">
          E
        </span>
        <span>
          <strong className="font-display block text-xl font-semibold">EpoFlow</strong>
          <small className="text-[var(--muted)]">business workspace</small>
        </span>
      </Link>
      <nav aria-label="Hlavní navigace" className="flex flex-col gap-1.5">
        {items.map((item) => (
          <NavigationItem item={item} key={item.href} />
        ))}
      </nav>
      <div className="mt-auto rounded-2xl bg-[var(--surface-muted)] p-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
          Demo režim
        </p>
        <p className="text-xs leading-5 text-[var(--muted)]">
          Všechna data jsou smyšlená. Změny se neukládají.
        </p>
      </div>
    </aside>
  )
}

export function BottomNavigation() {
  return (
    <nav
      aria-label="Mobilní navigace"
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_94%,transparent)] px-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_28px_rgba(24,51,45,0.08)] backdrop-blur md:hidden"
    >
      {items.map((item) => (
        <NavigationItem compact item={item} key={item.href} />
      ))}
    </nav>
  )
}
