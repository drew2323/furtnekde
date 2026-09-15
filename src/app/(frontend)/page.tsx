import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, BookOpen, FileText, Map, Plane, Users } from 'lucide-react'
import { CmsBlocks } from './_components/cms-blocks'
import { PageShell } from './_components/site'
import { Button, Card, Heading, Section } from './_components/ui'
import { getPageBySlug } from './page-data'
const heroImage = '/images/home/hero.webp'
const flightImage = '/images/home/flight.webp'
const planningImage = '/images/home/planning.webp'
const serviceImage = '/images/home/service.webp'
const storyImage = '/images/home/story.webp'
const articleFlightImage = '/images/home/article-flight.webp'
const articlePlanImage = '/images/home/article-plan.webp'
const articleStayImage = '/images/home/article-stay.webp'

export const metadata: Metadata = { title: 'Furt někde | Cestování s dětmi po svém', description: 'Praktická pomoc rodičům, kteří chtějí cestovat s dětmi s menším stresem a chytřejším plánem.', robots: { index: false, follow: false } }

const choices = [
  { icon: Plane, badge: 'Nejčastější', title: 'Čeká nás let s dítětem', text: 'Praktické rady a zkušenosti, které vám usnadní cestu letadlem s dětmi.', href: '/kurzy/letadlem-s-miminkem-a-malymi-detmi', link: 'Kurz létání' },
  { icon: Map, title: 'Chci si dovolenou naplánovat sama', text: 'Ujasněte si, kam jet, co zařídit a na co nezapomenout. Krok za krokem.', href: '#planovani', link: 'Kurz plánování' },
  { icon: Users, title: 'Nemám čas všechno hledat', text: 'Připravíme vám dovolenou na míru vaší rodině. Prakticky a realisticky.', href: '#planovani', link: 'Plánování na míru' },
  { icon: FileText, title: 'Zatím hledám odpověď zdarma', text: 'Články, návody a naše zkušenosti z cest. Bez registrace.', href: '#clanky', link: 'Blog a materiály zdarma' },
]

const articles = [
  { image: articleFlightImage, title: 'Jak se připravit na první let s dítětem', text: 'Praktické kroky před cestou i na letišti.' },
  { image: articlePlanImage, title: 'Co opravdu sbalit na cestu s dítětem', text: 'Jak přemýšlet nad výbavou a co nechat doma.' },
  { image: articleStayImage, title: 'Jak vybírat ubytování pro rodinu', text: 'Na co se zaměřit, když cestujete s dětmi.' },
]

export default async function HomePage() {
  const foundPage = await getPageBySlug('/')
  const page = foundPage?.pageType === 'home' ? foundPage : undefined
  const hasCmsLayout = Boolean(page?.layout?.length)
  const title = page?.title || 'Rodina není brzda. Je to nový směr.'
  const summary = page?.summary || 'Pomáháme rodičům cestovat s dětmi s menším stresem, chytřejším plánem a větší radostí.'
  return <PageShell>
    <Section className="home-hero"><div className="hero-grid"><div className="hero-copy"><p className="eyebrow">{page?.eyebrow || 'Cestování s dětmi po svém'}</p><h1>{title}</h1><p className="lead">{summary}</p><div className="hero-actions"><Button href={page?.primaryCta?.href || '#pomoc'}>{page?.primaryCta?.label || 'Vybrat, s čím potřebujete pomoct'} <ArrowRight size={17} aria-hidden="true" /></Button><Button href="#pomoc" variant="secondary">Zjistit, jak vám pomůžeme</Button></div><div className="proof-row" aria-label="Co na webu najdete"><span><strong>2 kurzy</strong> pro vlastní tempo</span><span><strong>1 služba</strong> plánování na míru</span><span><strong>Zdarma</strong> články a materiály</span></div></div><figure className="hero-photo"><Image src={heroImage} alt="Ilustrační výhled rodiny na přímořskou krajinu; dočasná fotografie" fill priority sizes="(max-width: 760px) 100vw, 52vw" /><figcaption>Stejný svět.<br />Jen s dětmi po svém.</figcaption></figure></div></Section>
    {hasCmsLayout ? <CmsBlocks blocks={page?.layout} /> : <>
      <Section className="chooser" id="pomoc"><div className="centered-intro"><Heading>Co právě potřebujete vyřešit?</Heading><p>Vyberte si podle situace, ve které jste.</p></div><div className="choice-grid">{choices.map(({ icon: Icon, badge, ...choice }) => <Card className="choice-card" key={choice.title}><div className="choice-icon"><Icon aria-hidden="true" /></div>{badge && <span className="choice-badge">{badge}</span>}<h3>{choice.title}</h3><p>{choice.text}</p><Button href={choice.href} variant="text">{choice.link} <ArrowRight size={16} aria-hidden="true" /></Button></Card>)}</div></Section>
      <Section className="flight-feature"><div className="feature-band"><div><p className="eyebrow">Online kurz</p><Heading>První let s dítětem nemusí být stres</Heading><p className="lead">Čtrnáct praktických částí od nákupu letenky až po přistání. S dlouhodobým přístupem a možností položit otázku.</p><Button href="/kurzy/letadlem-s-miminkem-a-malymi-detmi">Chci letět v klidu <ArrowRight size={17} /></Button></div><div className="course-visual"><Image src={flightImage} alt="Ukázka online kurzu a dítě u letištního okna; dočasný obrazový podklad" fill sizes="(max-width: 760px) 100vw, 48vw" /></div></div></Section>
      <Section className="planning" id="planovani"><div className="centered-intro"><Heading>Dovolenou můžete naplánovat po svém. Nebo ji nechat na nás.</Heading></div><div className="planning-grid"><Card className="planning-card"><div><p className="card-kicker">Online kurz</p><h3>Chci se naučit plánovat</h3><p>Naučíte se vybrat destinaci, naplánovat cestu a zvládnout vše krok za krokem.</p><Button href="#pomoc" variant="text">Prohlédnout kurz <ArrowRight size={16} /></Button></div><Image src={planningImage} alt="Ilustrační pracovní stůl s mapou; dočasná fotografie" /></Card><Card className="planning-card planning-card--service"><div><p className="card-kicker">Naše služba</p><h3>Chci ušetřit čas</h3><p>Připravíme vám plán cesty podle potřeb vaší rodiny; rezervace zůstávají ve vašich rukou.</p><Button href="#pomoc" variant="text">Jak služba funguje <ArrowRight size={16} /></Button></div><Image src={serviceImage} alt="Ilustrační cestovní plán; dočasný obrazový podklad" /></Card></div></Section>
      <Section className="story" id="o-nas"><div className="story-grid"><figure><Image src={storyImage} alt="Ilustrační rodinná fotografie z cest; zobrazené osoby nejsou rodina Furt někde" /></figure><div><p className="eyebrow">Náš přístup</p><Heading>Cestování s dětmi může mít váš vlastní rytmus</Heading><p className="lead">Sdílíme praktické zkušenosti, které pomáhají proměnit nejistotu v konkrétní plán. Bez tlaku na dokonalou dovolenou.</p><Button href="#clanky" variant="text">Poznat náš přístup <ArrowRight size={16} /></Button></div></div></Section>
      <Section className="articles" id="clanky"><div className="section-heading-row"><Heading>Praktické odpovědi zdarma</Heading><Button href="/blog/vzorovy-clanek" variant="text">Všechny články <ArrowRight size={16} /></Button></div><div className="articles-grid">{articles.map(article => <Card className="article-card" key={article.title}><Image src={article.image} alt="" width={1200} height={540} /><div><h3>{article.title}</h3><p>{article.text}</p><Button href="/blog/vzorovy-clanek" variant="text">Přečíst článek <ArrowRight size={15} /></Button></div></Card>)}</div></Section>
      <Section className="freebies"><div className="freebie-grid"><div className="lead-magnet"><p className="eyebrow">Zdarma pro vás</p><Heading>Balicí seznam na cesty s dětmi</Heading><p>Praktická pomůcka, díky které na nic podstatného nezapomenete.</p><Button href="#pomoc">Stáhnout zdarma <ArrowRight size={16} /></Button><BookOpen aria-hidden="true" /></div><div className="newsletter-box"><p className="eyebrow">Cestovací úterý</p><Heading>Jeden praktický tip do e-mailu</Heading><p>Zkušenosti, návody a občas i naše chyby. Funkční přihlášení doplníme až po schválení napojení.</p><a className="button button--secondary" href="#pomoc">Zjistit více</a></div></div></Section>
    </>}
  </PageShell>
}
