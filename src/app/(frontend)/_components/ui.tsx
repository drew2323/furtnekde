import Link from 'next/link'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { safeLinkHref } from '@/lib/safe-link'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>
}

export function Section({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return <section className={`section ${className}`} id={id}><Container>{children}</Container></section>
}

export function Heading({ as: Tag = 'h2', children, className = '' }: { as?: ElementType; children: ReactNode; className?: string }) {
  return <Tag className={`heading ${className}`}>{children}</Tag>
}

export function Button({ children, href, variant = 'primary' }: { children: ReactNode; href: string; variant?: 'primary' | 'secondary' | 'text' }) {
  return <Link className={`button button--${variant}`} href={safeLinkHref(href)}>{children}</Link>
}

export function Card({ children, className = '', ...props }: HTMLAttributes<HTMLElement>) {
  return <article className={`card ${className}`} {...props}>{children}</article>
}
