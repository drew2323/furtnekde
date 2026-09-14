import type { Metadata } from 'next'
import { ArrowRight, Compass, Map, Plane, Sparkles } from 'lucide-react'
import { CmsBlocks } from './_components/cms-blocks'
import { RouteMap } from './_components/decorations'
import { PageShell } from './_components/site'
import { Button, Card, Heading, Section } from './_components/ui'
import { getPageBySlug } from './page-data'

export const metadata: Metadata = {
  title: 'Furt někde | Cestování s malými dětmi, krok za krokem',
  description: 'Praktická pomoc rodičům, kteří chtějí cestovat s miminkem nebo malými dětmi a potřebují se zorientovat v dalším kroku.',
  robots: { index: false, follow: false },
}

const paths = [
  { icon: Plane, kicker: 'Čeká vás let', title: 'Připravte se na cestu letadlem', text: 'Praktický online kurz vás provede přípravou, letištěm i samotným letem.', href: '/kurzy/letadlem-s-miminkem-a-malymi-detmi', link: 'Prohlédnout kurz létání', tone: 'apricot' },
  { icon: Compass, kicker: 'Chcete plánovat sami', title: 'Poskládejte si dovolenou po svém', text: 'Kurz plánování vám dá systém pro výběr destinace, dopravy i ubytování.', href: '#zaverecny-rozcestnik', link: 'Zjistit, zda je kurz pro vás', tone: 'sage' },
  { icon: Map, kicker: 'Chcete konkrétní návrh', title: 'Nechte si připravit plán na míru', text: 'Vy popíšete potřeby rodiny, Furt někde připraví konkrétní doporučení k vlastní rezervaci.', href: '#zaverecny-rozcestnik', link: 'Poznat službu na míru', tone: 'sand' },
]

export default async function HomePage() {
  const foundPage = await getPageBySlug('/')
  const page = foundPage?.pageType === 'home' ? foundPage : undefined
  const title = page?.title || 'S malými dětmi můžete cestovat. Pomůžeme vám vědět, co řešit dál.'
  const summary = page?.summary || 'Ať vás čeká první let, samostatné plánování nebo hledáte konkrétní návrh dovolené, dostanete praktický další krok bez zbytečného chaosu.'
  const cta = page?.primaryCta?.label || 'Vybrat, s čím potřebujete pomoct'
  const ctaHref = page?.primaryCta?.href || '#pomoc'
  const hasCmsLayout = Boolean(page?.layout?.length)
  return <PageShell>
    <Section className="home-hero"><div className="hero-grid"><div className="hero-copy"><p className="eyebrow">{page?.eyebrow || 'Cestování s miminkem a malými dětmi'}</p><h1>{title}</h1><p className="lead">{summary}</p><Button href={ctaHref}>{cta}</Button><p className="microcopy">Vyberete si kurz, pomoc na míru, nebo začnete článkem zdarma.</p></div><RouteMap /></div></Section>
    {hasCmsLayout ? <CmsBlocks blocks={page?.layout} /> : <>
    <Section className="path-section" id="pomoc"><div className="section-intro"><p className="eyebrow">Tři různé cesty</p><Heading>Co právě potřebujete vyřešit?</Heading><p>Nemusíte pročítat celý web. Začněte situací, která je vám nejbližší.</p></div><div className="card-grid">{paths.map(({ icon: Icon, ...path }) => <Card className={`path-card path-card--${path.tone}`} key={path.title}><Icon aria-hidden="true" /><p className="card-kicker">{path.kicker}</p><h3>{path.title}</h3><p>{path.text}</p><Button href={path.href} variant="text">{path.link} <ArrowRight size={17} aria-hidden="true" /></Button></Card>)}</div></Section>
    <Section className="featured"><div className="featured-grid"><div><p className="eyebrow">Začněte připraveně</p><Heading>Let s dítětem nemusí být jedna velká neznámá</Heading><p>Čtrnáct praktických částí vás provede od výběru letu a balení přes letiště až po jídlo, zabavení a krizové situace.</p><ul className="check-list"><li>Dlouhodobý přístup bez časového tlaku</li><li>Praktické materiály k použití před cestou</li><li>Možnost položit otázku ke kurzu</li></ul><Button href="/kurzy/letadlem-s-miminkem-a-malymi-detmi">Zjistit, co kurz obsahuje</Button></div><div className="ticket" aria-label="Online kurz Letadlem s miminkem a malými dětmi"><span><Plane aria-hidden="true" /> online kurz</span><strong>Letadlem s miminkem a malými dětmi</strong><small>Od přípravy až po přistání</small></div></div></Section>
    <Section className="articles" id="clanky"><div className="section-heading-row"><div><p className="eyebrow">Čtení na cestu</p><Heading>Vybrané články</Heading></div><Sparkles aria-hidden="true" /></div><div className="article-grid"><Card><p className="card-kicker">Létání</p><h3>Co si pohlídat před prvním letem s dítětem</h3><p>Vzorová redakční struktura s praktickými kroky a odkazy na aktuální zdroje.</p><Button href="/blog/vzorovy-clanek" variant="text">Přečíst vzorový článek <ArrowRight size={17} /></Button></Card><Card className="article-note"><p className="card-kicker">Obsah zdarma</p><h3>Hledáte odpověď na jednu konkrétní otázku?</h3><p>V první schvalovací etapě ukazujeme princip znalostního centra. Další témata doplníme až po schválení směru.</p></Card></div></Section>
    <Section className="newsletter"><div className="newsletter-inner"><div><p className="eyebrow">E-mailová komunikace</p><Heading>Praktické cestovní čtení do schránky</Heading><p>Tento prototyp ukazuje jeden klidný vstup do e-mailové komunikace. Přihlášení a jeho přesné podmínky se napojí až po schválení.</p></div><a className="button button--secondary" href="#zaverecny-rozcestnik">Podívat se na možnosti</a></div></Section>
    <Section className="final-paths" id="zaverecny-rozcestnik"><p className="eyebrow">Kam dál?</p><Heading>Vyberte si další krok podle své situace</Heading><div className="final-links"><LinkCard href="/kurzy/letadlem-s-miminkem-a-malymi-detmi" title="Připravit se na let" /><LinkCard href="#pomoc" title="Naučit se plánovat" /><LinkCard href="#pomoc" title="Získat návrh na míru" /></div></Section>
    </>}
  </PageShell>
}

function LinkCard({ href, title }: { href: string; title: string }) { return <a className="final-link" href={href}><span>{title}</span><ArrowRight aria-hidden="true" /></a> }
