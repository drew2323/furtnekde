import Link from 'next/link'
import type { ReactNode } from 'react'
import { Container } from './ui'

export function SiteHeader() {
  return <header className="site-header"><Container className="header-inner">
    <Link className="brand" href="/" aria-label="Furt někde – domů"><span className="brand-route" aria-hidden="true">⌁</span><span>Furt někde</span></Link>
    <nav aria-label="Hlavní navigace">
      <Link href="/#pomoc">Jak vám pomůžeme</Link>
      <Link href="/kurzy/letadlem-s-miminkem-a-malymi-detmi">Kurz létání</Link>
      <Link href="/#clanky">Blog</Link>
    </nav>
  </Container></header>
}

export function SiteFooter() {
  return <footer className="site-footer"><Container className="footer-inner">
    <div><strong>Furt někde</strong><p>Praktická pomoc pro cestování s malými dětmi.</p></div>
    <nav aria-label="Navigace v patičce"><Link href="/">Domů</Link><Link href="/#pomoc">Jak vám pomůžeme</Link><Link href="/blog/vzorovy-clanek">Vzorový článek</Link></nav>
  </Container></footer>
}

export function PageShell({ children }: { children: ReactNode }) {
  return <><a className="skip-link" href="#obsah">Přeskočit na obsah</a><SiteHeader /><main id="obsah">{children}</main><SiteFooter /></>
}
