import { Calculator, FileText, Percent, Users } from 'lucide-react'
import { MonthlyBarChart } from '../_components/charts'
import { ChartCard, DemoButton, PageHeader, Panel, StatusPill } from '../_components/ui'
import { invoices, monthlySales, pipeline } from '../_lib/data'

export default function AnalyticsPage() {
  return (
    <main className="dashboard-page">
      <PageHeader
        eyebrow="Business"
        title="Firma v číslech"
        description="Zakázky, obchod, zákazníci a finance na jednom místě."
        action={<DemoButton>Export přehledu</DemoButton>}
      />
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <ChartCard title="Výkon firmy" subtitle="Posledních šest měsíců · tisíce Kč">
          <MonthlyBarChart data={monthlySales} />
        </ChartCard>
        <Panel title="Obchodní pipeline" eyebrow="Příležitosti">
          <div className="space-y-3">
            {pipeline.map((stage, index) => (
              <div className="rounded-xl bg-[var(--surface-muted)] p-3" key={stage.label}>
                <div className="flex justify-between gap-2">
                  <strong className="text-sm">{stage.label}</strong>
                  <span className="text-sm">{stage.value}</span>
                </div>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {stage.count} {index === 0 ? 'nových kontaktů' : 'případů'}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Panel className="mt-5 overflow-hidden" title="Faktury a platby" eyebrow="Cash flow">
        <div className="-mx-5 overflow-x-auto sm:-mx-6">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="border-y border-[var(--border)] bg-[var(--surface-muted)] text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th className="px-6 py-3">Doklad</th>
                <th className="px-4 py-3">Zákazník</th>
                <th className="px-4 py-3">Splatnost</th>
                <th className="px-4 py-3">Částka</th>
                <th className="px-6 py-3">Stav</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 font-semibold">{invoice.id}</td>
                  <td className="px-4 py-4">{invoice.customer}</td>
                  <td className="px-4 py-4 text-[var(--muted)]">{invoice.due}</td>
                  <td className="px-4 py-4 font-medium">{invoice.total}</td>
                  <td className="px-6 py-4">
                    <StatusPill>{invoice.status}</StatusPill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: Users, title: 'Zákazníci', value: '126 kontaktů', detail: '8 aktivních firem' },
          { icon: FileText, title: 'Nabídky', value: '11 otevřených', detail: 'Úspěšnost 46 %' },
          { icon: Percent, title: 'DPH', value: '64 820 Kč', detail: 'Odhad za Q3' },
          {
            icon: Calculator,
            title: 'Epoxid kalkulátor',
            value: '18,4 kg',
            detail: 'Odhad 9 016 Kč',
          },
        ].map(({ icon: Icon, title, value, detail }) => (
          <Panel key={title}>
            <Icon className="mb-5 text-[var(--primary)]" size={22} />
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-3 text-xl font-semibold">{value}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">{detail}</p>
          </Panel>
        ))}
      </div>
    </main>
  )
}
