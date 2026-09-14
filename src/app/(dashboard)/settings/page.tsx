import { Bell, Database, LockKeyhole, Palette } from 'lucide-react'
import { DemoButton, EmptyState, PageHeader, Panel } from '../_components/ui'

const preferences = [
  { icon: Palette, title: 'Vzhled', description: 'Světlé přírodní téma' },
  { icon: Bell, title: 'Upozornění', description: 'Denní souhrn v 8:00' },
  { icon: LockKeyhole, title: 'Soukromí', description: 'Veřejný demo profil' },
  { icon: Database, title: 'Zdroj dat', description: 'Statická ukázková data' },
]

export default function SettingsPage() {
  return (
    <main className="dashboard-page">
      <PageHeader
        eyebrow="Workspace"
        title="Nastavení"
        description="Budoucí správa účtu, vzhledu a napojení datových zdrojů."
        action={<DemoButton>Uložit změny</DemoButton>}
      />
      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        {preferences.map(({ icon: Icon, title, description }) => (
          <Panel key={title}>
            <div className="flex items-center gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--surface-muted)]">
                <Icon size={20} />
              </span>
              <div>
                <h2 className="font-semibold">{title}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
              </div>
            </div>
          </Panel>
        ))}
      </div>
      <Panel title="Integrace" eyebrow="Připraveno na další fázi">
        <EmptyState
          title="Zatím bez připojených služeb"
          description="Později sem lze bezpečně napojit Payload, PostgreSQL nebo externí API."
        />
      </Panel>
    </main>
  )
}
