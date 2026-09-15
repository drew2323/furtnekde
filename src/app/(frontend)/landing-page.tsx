import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'

import type { Page } from '@/payload-types'

const hrefForSlug = (slug: string) => (slug === '/' ? '/' : `/${slug}`)

export function LandingPage({ navigation, page }: { navigation: Page[]; page: Page }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link aria-label="Home" className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" />
          <span>{navigation.find(({ slug }) => slug === '/')?.title ?? page.title}</span>
        </Link>
        <nav aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              className={item.id === page.id ? 'active' : ''}
              href={hrefForSlug(item.slug)}
              key={item.id}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="eyebrow" aria-hidden="true" />
          <h1>{page.title}</h1>
          <div className="hero-rule" aria-hidden="true" />
        </section>
        {page.content && <article className="page-content"><RichText data={page.content} /></article>}
      </main>

      <footer>
        <span>{page.title}</span>
        <span aria-hidden="true" />
      </footer>
    </div>
  )
}
