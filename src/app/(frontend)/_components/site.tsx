import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, Menu } from 'lucide-react'
import { Container } from './ui'

export function SiteHeader() {
  return <header className="site-header"><Container className="header-inner">
    <Link className="brand" href="/" aria-label="Furt někde – domů"><span>furt někde</span><small>malá dobrodružství,<br />velký svět</small></Link>
    <nav aria-label="Hlavní navigace"><Link href="/#pomoc">Kurzy</Link><Link href="/#planovani">Plánování na míru</Link><Link href="/#clanky">Zdarma</Link><Link href="/#clanky">Blog</Link><Link href="/#o-nas">O nás</Link></nav>
    <Link className="header-cta" href="/#pomoc">Vybrat si pomoc <ArrowRight size={15} aria-hidden="true" /></Link>
    <details className="mobile-menu"><summary aria-label="Otevřít navigaci"><Menu /></summary><nav aria-label="Mobilní navigace"><Link href="/#pomoc">Kurzy a pomoc</Link><Link href="/#planovani">Plánování</Link><Link href="/#clanky">Články zdarma</Link></nav></details>
  </Container></header>
}

export function SiteFooter() {
  return <footer className="site-footer"><Container><div className="footer-main"><div><Link className="brand" href="/"><span>furt někde</span></Link><p>Malá dobrodružství, velký svět.</p></div><nav aria-label="Navigace v patičce"><Link href="/#pomoc">Kurzy</Link><Link href="/#planovani">Plánování na míru</Link><Link href="/#clanky">Zdarma</Link><Link href="/blog/vzorovy-clanek">Blog</Link></nav><div className="socials" aria-hidden="true"><span>IG</span><span>YT</span></div></div><div className="footer-bottom"><span>© 2026 Furt někde</span><span>Schvalovací prototyp · testovací prostředí</span></div></Container></footer>
}

export function PageShell({ children }: { children: ReactNode }) { return <><a className="skip-link" href="#obsah">Přeskočit na obsah</a><SiteHeader /><main id="obsah">{children}</main><SiteFooter /></> }
