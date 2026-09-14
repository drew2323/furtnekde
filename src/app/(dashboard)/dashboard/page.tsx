import { CheckCircle2, Clock3 } from 'lucide-react'
import { ChartCard, DemoButton, MetricCard, PageHeader, Panel } from '../_components/ui'
import { DonutChart, MonthlyBarChart } from '../_components/charts'
import { businessMetrics, monthlySales, orderCategories, recentActivity } from '../_lib/data'

export default function DashboardPage() {
  return (
    <main className="dashboard-page">
      <PageHeader
        eyebrow="Pondělí 14. září"
        title="Dobré ráno, Davide."
        description="Firma je v dobrém tempu. Tady je vše důležité pro dnešní rozhodování."
        action={<DemoButton>+ Nová zakázka</DemoButton>}
      />
      <div className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--accent)]/55 px-4 py-3 text-sm">
        <strong>Veřejná ukázka:</strong> pracujete se smyšlenými daty a všechny zapisovací akce jsou
        vypnuté.
      </div>
      <section aria-label="Klíčové ukazatele" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {businessMetrics.map((metric) => (
          <MetricCard {...metric} key={metric.label} />
        ))}
      </section>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <ChartCard title="Vývoj tržeb" subtitle="Tržby a náklady · tisíce Kč">
          <MonthlyBarChart data={monthlySales} />
        </ChartCard>
        <ChartCard title="Zakázky podle typu" subtitle="Podíl aktuálního portfolia">
          <DonutChart data={orderCategories} />
          <div className="grid grid-cols-2 gap-2">
            {orderCategories.map((item) => (
              <div className="flex items-center justify-between text-xs" key={item.name}>
                <span className="text-[var(--muted)]">{item.name}</span>
                <strong>{item.value} %</strong>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Poslední aktivita" eyebrow="Dnes a včera">
          <ol className="divide-y divide-[var(--border)]">
            {recentActivity.map((item) => (
              <li className="flex gap-3 py-4 first:pt-0 last:pb-0" key={item.title + item.time}>
                <span className={`mt-1 size-2.5 shrink-0 rounded-full bg-[var(--${item.tone})]`} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap justify-between gap-1">
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <strong className="text-sm">{item.amount}</strong>
                  </div>
                  <p className="mt-1 truncate text-xs text-[var(--muted)]">{item.detail}</p>
                  <p className="mt-1 text-[0.7rem] text-[var(--muted)]">{item.time}</p>
                </div>
              </li>
            ))}
          </ol>
        </Panel>
        <Panel className="subtle-grid" title="Měsíční cíl" eyebrow="Září 2026">
          <div className="mt-8 text-center">
            <p className="font-display text-5xl font-semibold">81 %</p>
            <p className="mt-2 text-sm text-[var(--muted)]">486 200 Kč z 600 000 Kč</p>
          </div>
          <div className="my-6 h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]">
            <div className="h-full w-[81%] rounded-full bg-[var(--primary)]" />
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <p className="flex items-center gap-2">
              <CheckCircle2 className="text-[var(--success)]" size={16} />
              Plán plněn
            </p>
            <p className="flex items-center gap-2">
              <Clock3 className="text-[var(--warning)]" size={16} />
              16 dní zbývá
            </p>
          </div>
        </Panel>
      </div>
    </main>
  )
}
