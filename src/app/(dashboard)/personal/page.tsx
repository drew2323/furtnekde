import { Building2, CreditCard, Landmark, WalletCards } from 'lucide-react'
import { DonutChart, MonthlyBarChart } from '../_components/charts'
import { ChartCard, DemoButton, MetricCard, PageHeader, Panel, StatusPill } from '../_components/ui'
import { expenseCategories, personalMetrics, personalSpending } from '../_lib/data'

const assets = [
  { name: 'Běžný účet', value: '184 230 Kč', icon: CreditCard },
  { name: 'Spořicí účet', value: '426 700 Kč', icon: Landmark },
  { name: 'Investice', value: '591 340 Kč', icon: WalletCards },
  { name: 'Hotovost', value: '82 230 Kč', icon: Building2 },
]
const wishlist = [
  { name: 'Cestovní fotoaparát', price: '46 900 Kč', saved: 68 },
  { name: 'Japonsko 2027', price: '120 000 Kč', saved: 42 },
  { name: 'Silniční kolo', price: '78 000 Kč', saved: 24 },
]

export default function PersonalPage() {
  return (
    <main className="dashboard-page">
      <PageHeader
        eyebrow="Osobní finance"
        title="Peníze s nadhledem"
        description="Soukromý přehled rozpočtu, majetku a věcí, na které se těšíte."
        action={<DemoButton>+ Přidat výdaj</DemoButton>}
      />
      <section aria-label="Osobní ukazatele" className="grid gap-4 md:grid-cols-3">
        {personalMetrics.map((metric) => (
          <MetricCard {...metric} key={metric.label} />
        ))}
      </section>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <ChartCard title="Příjmy a výdaje" subtitle="Měsíční souhrn · tisíce Kč">
          <MonthlyBarChart data={personalSpending} personal />
        </ChartCard>
        <ChartCard title="Výdaje podle kategorií" subtitle="Září 2026">
          <DonutChart data={expenseCategories} />
        </ChartCard>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel title="Majetek a zůstatky" eyebrow="Celkem 1 284 500 Kč">
          <div className="grid gap-3 sm:grid-cols-2">
            {assets.map(({ name, value, icon: Icon }) => (
              <div className="rounded-xl bg-[var(--surface-muted)] p-4" key={name}>
                <Icon className="mb-5 text-[var(--primary)]" size={20} />
                <p className="text-xs text-[var(--muted)]">{name}</p>
                <p className="mt-1 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Seznam přání" eyebrow="Věci, na které spoříte">
          <div className="space-y-5">
            {wishlist.map((item) => (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold">{item.name}</h3>
                    <p className="text-xs text-[var(--muted)]">Cíl {item.price}</p>
                  </div>
                  <StatusPill>{item.saved} %</StatusPill>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                  <div
                    className="h-full rounded-full bg-[var(--primary)]"
                    style={{ width: `${item.saved}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </main>
  )
}
