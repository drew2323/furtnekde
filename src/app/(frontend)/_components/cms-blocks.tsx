import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Page } from '@/payload-types'
import { Button, Heading, Section } from './ui'

export function CmsBlocks({ blocks }: { blocks?: Page['layout'] }) {
  if (!blocks?.length) return null
  return <>{blocks.map((block) => {
    if (block.blockType === 'text') return <Section className="cms-text" key={block.id}><Heading>{block.heading}</Heading><div className="prose"><RichText data={block.content} /></div></Section>
    if (block.blockType === 'cta') return <Section className="callout" key={block.id}><div className="callout-inner"><Heading>{block.heading}</Heading><p>{block.text}</p><Button href={block.href}>{block.label}</Button></div></Section>
    return <Section className="faq" key={block.id}><Heading>{block.heading || 'Časté dotazy'}</Heading><div className="faq-list">{block.items.map((item) => <details key={item.id}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></Section>
  })}</>
}
