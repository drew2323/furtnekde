import { ArrowDownRight, ArrowUpRight, Inbox } from 'lucide-react'
import type { ReactNode } from 'react'

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl font-semibold leading-none tracking-[-0.03em] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
          {description}
        </p>
      </div>
      {action}
    </header>
  )
}

export function DemoButton({ children }: { children: ReactNode }) {
  return (
    <button
      className="min-h-11 cursor-not-allowed rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--muted)] opacity-75"
      disabled
      title="Akce není v demo režimu dostupná"
    >
      {children}
    </button>
  )
}

export function Panel({
  title,
  eyebrow,
  children,
  className = '',
}: {
  title?: string
  eyebrow?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`panel min-w-0 p-5 sm:p-6 ${className}`}>
      {(title || eyebrow) && (
        <header className="mb-5">
          {eyebrow && (
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.13em] text-[var(--muted)]">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">{title}</h2>
          )}
        </header>
      )}
      {children}
    </section>
  )
}

export function MetricCard({
  label,
  value,
  change,
  tone,
}: {
  label: string
  value: string
  change: string
  tone: 'success' | 'warning' | 'primary'
}) {
  const positive = tone === 'success'
  const Icon = positive ? ArrowUpRight : ArrowDownRight
  return (
    <article className="panel min-w-0 p-5">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-4 truncate text-2xl font-semibold tracking-[-0.03em] sm:text-[1.7rem]">
        {value}
      </p>
      <div className={`mt-4 flex items-center gap-1.5 text-xs font-semibold text-[var(--${tone})]`}>
        <Icon size={15} />
        <span>{change}</span>
      </div>
    </article>
  )
}

export function ChartCard({
  title,
  subtitle,
  children,
  className = '',
}: {
  title: string
  subtitle: string
  children: ReactNode
  className?: string
}) {
  return (
    <Panel className={className}>
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">{subtitle}</p>
        </div>
        <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs text-[var(--muted)]">
          Demo
        </span>
      </div>
      {children}
    </Panel>
  )
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="grid min-h-48 place-items-center rounded-xl border border-dashed border-[var(--border)] p-6 text-center">
      <div>
        <Inbox className="mx-auto mb-3 text-[var(--muted)]" />
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
      </div>
    </div>
  )
}

export function StatusPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-xs font-medium text-[var(--foreground)]">
      {children}
    </span>
  )
}
