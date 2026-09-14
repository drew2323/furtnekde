import { CircleDollarSign, ClipboardCheck, FileSignature, PackageCheck } from 'lucide-react'
import { DemoButton, PageHeader, Panel, StatusPill } from '../_components/ui'
import { recentActivity } from '../_lib/data'

const orders = [
  {
    id: 'ZK-184',
    name: 'Jídelní stůl Aurora',
    customer: 'Ateliér Novák',
    state: 'Ve výrobě',
    deadline: '26. 9.',
  },
  {
    id: 'ZK-181',
    name: 'Recepční pult Linea',
    customer: 'Studio Forma',
    state: 'Finalizace',
    deadline: '20. 9.',
  },
  {
    id: 'ZK-177',
    name: 'Konferenční stolek Moss',
    customer: 'Petra K.',
    state: 'Čeká na materiál',
    deadline: '4. 10.',
  },
]

export default function ActivityPage() {
  const icons = [CircleDollarSign, PackageCheck, FileSignature, ClipboardCheck]
  return (
    <main className="dashboard-page">
      <PageHeader
        eyebrow="Provoz"
        title="Aktivita a zakázky"
        description="Chronologický přehled změn a rozpracované výroby."
        action={<DemoButton>Přidat poznámku</DemoButton>}
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_1.25fr]">
        <Panel title="Časová osa" eyebrow="Poslední události">
          <ol>
            {recentActivity.map((item, index) => {
              const Icon = icons[index]
              return (
                <li className="relative flex gap-4 pb-7 last:pb-0" key={item.title}>
                  <span className="absolute bottom-0 left-5 top-10 w-px bg-[var(--border)] last:hidden" />
                  <span className="z-10 grid size-10 shrink-0 place-items-center rounded-full bg-[var(--surface-muted)]">
                    <Icon size={18} />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold">{item.title}</h2>
                      <StatusPill>{item.time}</StatusPill>
                    </div>
                    <p className="mt-1 text-sm text-[var(--muted)]">{item.detail}</p>
                    {item.amount && <p className="mt-2 text-sm font-semibold">{item.amount}</p>}
                  </div>
                </li>
              )
            })}
          </ol>
        </Panel>
        <Panel title="Aktivní zakázky" eyebrow="Výroba">
          <div className="space-y-3">
            {orders.map((order) => (
              <article
                className="rounded-xl border border-[var(--border)] p-4 transition hover:border-[var(--primary)]"
                key={order.id}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-[var(--muted)]">{order.id}</p>
                    <h3 className="mt-1 font-semibold">{order.name}</h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">{order.customer}</p>
                  </div>
                  <StatusPill>{order.state}</StatusPill>
                </div>
                <div className="mt-4 flex justify-between text-xs">
                  <span className="text-[var(--muted)]">Termín</span>
                  <strong>{order.deadline}</strong>
                </div>
              </article>
            ))}
          </div>
        </Panel>
      </div>
    </main>
  )
}
