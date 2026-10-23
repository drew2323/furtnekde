import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, BookOpen, FileText, Map, Plane, Users } from 'lucide-react'
import { CmsBlocks } from './_components/cms-blocks'
import { PageShell } from './_components/site'
import { Button, Card, Heading, Section } from './_components/ui'
import { getPageBySlug } from './page-data'
const heroImage = '/images/home/hero.webp'
const flightImage = '/images/home/flight.webp'
const storyImage = '/images/home/story.webp'

export const metadata: Metadata = { title: 'Furt někde | Cestování s dětmi po svém', description: 'Praktická pomoc rodičům, kteří chtějí cestovat s dětmi s menším stresem a chytřejším plánem.', robots: { index: false, follow: false } }

const choices = [
  { icon: Plane, title: 'Čeká nás let s dítětem', text: 'Praktické rady a zkušenosti, které vám usnadní cestu letadlem s dětmi.', href: '/kurzy/letadlem-s-miminkem-a-malymi-detmi', link: 'Kurz létání' },
  { icon: Map, title: 'Chci si dovolenou naplánovat sama', text: 'Ujasněte si, kam jet, co zařídit a na co nezapomenout. Krok za krokem.', href: '#planovani', link: 'Kurz plánování' },
  { icon: Users, title: 'Nemám čas všechno hledat', text: 'Připravíme vám dovolenou na míru vaší rodině. Prakticky a realisticky.', href: '#planovani', link: 'Plánování na míru' },
  { icon: FileText, title: 'Zatím hledám odpověď zdarma', text: 'Články, návody a naše zkušenosti z cest. Bez registrace.', href: '#clanky', link: 'Blog a materiály zdarma' },
]

const offers = [
  { image: flightImage, kicker: 'Online kurz · vlastní tempo', title: 'Kurz létání', text: 'Připravíte se na cestu letadlem od výběru letu až po přistání. Čtrnáct praktických částí a možnost položit otázku.', href: '/kurzy/letadlem-s-miminkem-a-malymi-detmi', link: 'Prohlédnout kurz létání', alt: 'Malý chlapec pozoruje letadlo z letištní haly' },
  { image: storyImage, kicker: 'Online kurz · rozhodujete sami', title: 'Kurz plánování', text: 'Naučíte se vybrat destinaci, dopravu i ubytování a poskládat cestu tak, aby vaší rodině dávala smysl.', href: '#pomoc', link: 'Zjistit, co se v kurzu naučíte', alt: 'Rodina Furt někde na společné cestě' },
  { image: heroImage, kicker: 'Služba · konkrétní návrh pro vás', title: 'Plánování na míru', text: 'Připravíme doporučení podle rozpočtu, termínu a potřeb vaší rodiny. Rezervace zůstávají ve vašich rukou.', href: '#pomoc', link: 'Zjistit, jak služba funguje', alt: 'Rodina s dítětem během společné cesty' },
]

const articles = [
  { image: flightImage, title: 'Jak se připravit na první let s dítětem', text: 'Praktické kroky před cestou i na letišti.' },
  { image: storyImage, title: 'Co opravdu sbalit na cestu s dítětem', text: 'Jak přemýšlet nad výbavou a co nechat doma.' },
  { image: heroImage, title: 'Jak vybírat ubytování pro rodinu', text: 'Na co se zaměřit, když cestujete s dětmi.' },
]

export default async function HomePage() {
  const foundPage = await getPageBySlug('/')
  const page = foundPage?.pageType === 'home' ? foundPage : undefined
  const hasCmsLayout = Boolean(page?.layout?.length)
  const title = page?.title || 'Rodina není brzda. Je to nový směr.'
  const summary = page?.summary || 'Pomáháme rodičům cestovat s dětmi s menším stresem, chytřejším plánem a větší radostí.'
  return <PageShell>
    <Section className="home-hero"><div className="hero-grid"><div className="hero-copy"><p className="eyebrow">{page?.eyebrow || 'Cestování s miminkem a malými dětmi'}</p><h1>{title}</h1><p className="lead">{summary}</p><div className="hero-actions"><Button href={page?.primaryCta?.href || '#pomoc'}>{page?.primaryCta?.label || 'Vybrat, s čím potřebujete pomoct'} <ArrowRight size={17} aria-hidden="true" /></Button></div><p className="microcopy">Kurzy pro vlastní rozhodování, konkrétní plán na míru i praktické zkušenosti zdarma.</p></div><figure className="hero-photo"><Image src={heroImage} alt="Rodina s dítětem pozoruje panorama města" fill priority sizes="(max-width: 760px) 100vw, 55vw" /><figcaption>Skutečné cesty.<br />Praktická pomoc.</figcaption></figure></div></Section>
    {hasCmsLayout ? <CmsBlocks blocks={page?.layout} /> : <>
      <div className="trust-strip"><div className="container"><p><strong>Vycházíme z vlastních cest</strong><span>Praktické zkušenosti, ne dokonalé scénáře.</span></p><p><strong>Pomáháme vám rozhodnout se</strong><span>Konkrétní kroky místo informačního chaosu.</span></p><p><strong>Tempo zůstává na vás</strong><span>Kurz, služba nebo odpověď zdarma.</span></p></div></div>
      <Section className="chooser" id="pomoc"><div className="section-intro section-intro--split"><div><p className="eyebrow">Začněte svou situací</p><Heading>Co právě potřebujete vyřešit?</Heading></div><p>Vyberte si nejbližší situaci. Každá vede k jinému dalšímu kroku.</p></div><div className="choice-grid">{choices.map(({ icon: Icon, ...choice }) => <Card className="choice-card" key={choice.title}><div className="choice-icon"><Icon aria-hidden="true" /></div><div><h3>{choice.title}</h3><p>{choice.text}</p></div><Button href={choice.href} variant="text">{choice.link} <ArrowRight size={16} aria-hidden="true" /></Button></Card>)}</div></Section>
      <Section className="offers" id="planovani"><div className="centered-intro"><p className="eyebrow">Kurzy a plánování na míru</p><Heading>Tři cesty k rodinnému cestování po vašem</Heading><p>Vyberte si podle toho, jestli chcete získat jistotu pro let, naučit se plánovat sami, nebo dostat konkrétní návrh.</p></div><div className="offer-grid">{offers.map(offer => <article className="offer-card" key={offer.title}><div className="offer-photo"><Image src={offer.image} alt={offer.alt} fill sizes="(max-width: 760px) 100vw, 33vw" /></div><div className="offer-copy"><p className="card-kicker">{offer.kicker}</p><h3>{offer.title}</h3><p>{offer.text}</p><Button href={offer.href} variant="text">{offer.link} <ArrowRight size={16} /></Button></div></article>)}</div></Section>
      <Section className="story" id="o-nas"><div className="story-grid"><figure><Image src={storyImage} alt="Rodinná fotografie rodičů se synem na cestách" width={1200} height={900} /></figure><div><p className="eyebrow">Náš přístup</p><Heading>Cestování s dětmi může mít váš vlastní rytmus</Heading><p className="lead">Sdílíme praktické zkušenosti, které pomáhají proměnit nejistotu v konkrétní plán. Bez tlaku na dokonalou dovolenou.</p><Button href="#clanky" variant="text">Poznat náš přístup <ArrowRight size={16} /></Button></div></div></Section>
      <Section className="articles" id="clanky"><div className="section-heading-row"><Heading>Praktické odpovědi zdarma</Heading><Button href="/blog/vzorovy-clanek" variant="text">Všechny články <ArrowRight size={16} /></Button></div><div className="articles-grid">{articles.map(article => <Card className="article-card" key={article.title}><Image src={article.image} alt="" width={1200} height={540} /><div><h3>{article.title}</h3><p>{article.text}</p><Button href="/blog/vzorovy-clanek" variant="text">Přečíst článek <ArrowRight size={15} /></Button></div></Card>)}</div></Section>
      <Section className="freebies"><div className="freebie-grid"><div className="lead-magnet"><p className="eyebrow">Zdarma pro vás</p><Heading>Balicí seznam na cesty s dětmi</Heading><p>Praktická pomůcka, díky které na nic podstatného nezapomenete.</p><Button href="#pomoc">Stáhnout zdarma <ArrowRight size={16} /></Button><BookOpen aria-hidden="true" /></div><div className="newsletter-box"><p className="eyebrow">Cestovací úterý</p><Heading>Jeden praktický tip do e-mailu</Heading><p>Zkušenosti, návody a občas i naše chyby. Funkční přihlášení doplníme až po schválení napojení.</p><a className="button button--secondary" href="#pomoc">Zjistit více</a></div></div></Section>
    </>}
  </PageShell>
}
