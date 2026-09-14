import type { Metadata } from 'next'
import { ArrowRight, Info, Plane } from 'lucide-react'
import { CmsBlocks } from '../../_components/cms-blocks'
import { PageShell } from '../../_components/site'
import { Button, Card, Heading, Section } from '../../_components/ui'
import { getPageBySlug } from '../../page-data'

export const metadata: Metadata = { title: 'Co si pohlídat před prvním letem s dítětem | Furt někde', description: 'Vzorová struktura praktického článku o přípravě na první let s malým dítětem.', robots: { index: false, follow: false } }

const fallbackUpdatedAt = '2026-09-14'

function substantiveDate(value?: string | null) {
  const date = value ? new Date(value) : new Date(`${fallbackUpdatedAt}T00:00:00.000Z`)
  const safeDate = Number.isNaN(date.getTime()) ? new Date(`${fallbackUpdatedAt}T00:00:00.000Z`) : date
  return {
    dateTime: safeDate.toISOString().slice(0, 10),
    label: new Intl.DateTimeFormat('cs-CZ', { day: 'numeric', month: 'long', timeZone: 'UTC', year: 'numeric' }).format(safeDate),
  }
}

export default async function SampleArticlePage() {
  const foundPage = await getPageBySlug('blog/vzorovy-clanek')
  const page = foundPage?.pageType === 'article' ? foundPage : undefined
  const updatedAt = substantiveDate(page?.substantiveUpdatedAt)
  const hasCmsLayout = Boolean(page?.layout?.length)
  return <PageShell><article>
    <header className="article-hero"><div className="article-hero-inner"><p className="eyebrow">{page?.eyebrow || 'Létání s dětmi'}</p><h1>{page?.title || 'Co si pohlídat před prvním letem s dítětem'}</h1><p className="lead">{page?.summary || 'Praktický průchod přípravou, díky kterému si rozdělíte velkou neznámou do několika konkrétních rozhodnutí.'}</p><p className="article-meta">Věcně aktualizováno <time dateTime={updatedAt.dateTime}>{updatedAt.label}</time></p></div></header>
    {hasCmsLayout ? <CmsBlocks blocks={page?.layout} /> : <>
    <div className="article-layout"><nav className="toc" aria-label="Obsah článku"><strong>V článku najdete</strong><ol><li><a href="#pred-rezervaci">Před rezervací</a></li><li><a href="#pred-odletem">Před odletem</a></li><li><a href="#na-letisti">Na letišti</a></li><li><a href="#zdroje">Zdroje</a></li></ol></nav><div className="article-body">
      <p className="opening">První let s dítětem obvykle přináší hodně otázek najednou. Začněte tím, co můžete ovlivnit, a proměnlivé podmínky si ověřte tam, kde jsou právě platné.</p>
      <h2 id="pred-rezervaci">Ještě před rezervací letu</h2><p>Promyslete čas odletu, počet přestupů a délku přesunů. Nejlepší varianta není pro každou rodinu stejná; vycházejte z rytmu svého dítěte a z toho, kolik změn během jednoho dne zvládnete.</p>
      <h3>Ověřte podmínky konkrétního dopravce</h3><p>Pravidla pro zavazadla, kočárek, dětské vybavení nebo sezení se mohou měnit. Rozhodující jsou aktuální informace letecké společnosti pro váš konkrétní let.</p>
      <div className="info-box"><Info aria-hidden="true" /><div><strong>Co si zapsat</strong><p>Poznamenejte si, kde jste pravidlo ověřili a kdy. Před odletem se k důležitým bodům vraťte.</p></div></div>
      <h2 id="pred-odletem">Týden a den před odletem</h2><p>Rozdělte přípravu na doklady, věci do odbaveného zavazadla a to, co potřebujete během přesunu. Příruční zavazadlo skládejte podle pořadí, ve kterém věci pravděpodobně použijete.</p>
      <h3>Příruční zavazadlo jako malý systém</h3><ul><li>Doklady a potvrzení mějte dostupné jednou rukou.</li><li>Jídlo, pití a přebalování rozdělte do samostatných částí.</li><li>Přidejte jednu rezervu pro zdržení nebo změnu plánu.</li></ul>
      <h2 id="na-letisti">Na letišti a během letu</h2><p>Nechte si časovou rezervu, ale neplánujte dlouhé čekání bez možnosti pohybu. U bezpečnostní kontroly se řiďte pokyny personálu; u specifických potřeb se ptejte přímo na místě.</p>
      <div className="article-cta"><Plane aria-hidden="true" /><div><h2>Chcete projít celou přípravu krok za krokem?</h2><p>Online kurz spojuje 14 praktických částí, materiály a možnost položit otázku.</p><Button href="/kurzy/letadlem-s-miminkem-a-malymi-detmi">Prohlédnout kurz létání</Button></div></div>
      <h2 id="zdroje">Zdroje a datum kontroly</h2><p>Tento vzorový článek neuvádí proměnlivé limity ani pravidla jako obecně platná. Před cestou použijte primární zdroje:</p><ul><li>aktuální přepravní podmínky vaší letecké společnosti,</li><li>oficiální informace letiště, ze kterého odlétáte,</li><li>platné cestovní informace příslušných státních úřadů.</li></ul><p><strong>Datum poslední věcné kontroly struktury:</strong> 14. září 2026.</p>
      <h2>Časté dotazy</h2><div className="faq-list"><details><summary>Kolik času si nechat na letišti?</summary><p>Řiďte se aktuálním doporučením odletového letiště a dopravce. Přidejte rezervu odpovídající potřebám vaší rodiny.</p></details><details><summary>Mohu vzít kočárek až k letadlu?</summary><p>Postup se liší podle letiště, dopravce a typu kočárku. Ověřte jej přímo pro svůj let.</p></details></div>
    </div></div>
    <Section className="related"><p className="eyebrow">Související čtení</p><Heading>Pokračujte podle toho, co řešíte</Heading><div className="article-grid"><Card><h3>Let s dítětem krok za krokem</h3><p>Projděte všech 14 praktických částí v online kurzu.</p><Button href="/kurzy/letadlem-s-miminkem-a-malymi-detmi" variant="text">Prohlédnout kurz <ArrowRight size={17} /></Button></Card><Card><h3>Další články po schválení směru</h3><p>Obsahové karty doplníme až z ověřeného publikačního plánu.</p></Card></div></Section>
    <Section className="newsletter"><div className="newsletter-inner"><div><p className="eyebrow">E-mailová komunikace</p><Heading>Další praktické čtení do schránky</Heading><p>Přesná frekvence a přihlašovací podmínky budou doplněny s ověřeným napojením na Ecomail.</p></div><Button href="/#zaverecny-rozcestnik" variant="secondary">Prohlédnout další možnosti</Button></div></Section>
    </>}
  </article></PageShell>
}
