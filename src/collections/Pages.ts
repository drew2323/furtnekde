import type { Block, CollectionConfig } from 'payload'
import { validateLinkHref } from '@/lib/safe-link'

const TextBlock: Block = {
  slug: 'text',
  labels: { singular: 'Textová sekce', plural: 'Textové sekce' },
  fields: [
    { name: 'heading', type: 'text', required: true, label: 'Nadpis' },
    { name: 'content', type: 'richText', required: true, label: 'Obsah' },
  ],
}

const CtaBlock: Block = {
  slug: 'cta',
  labels: { singular: 'Výzva k akci', plural: 'Výzvy k akci' },
  fields: [
    { name: 'heading', type: 'text', required: true, label: 'Nadpis' },
    { name: 'text', type: 'textarea', required: true, label: 'Text' },
    { name: 'label', type: 'text', required: true, label: 'Text tlačítka' },
    { name: 'href', type: 'text', required: true, label: 'Cíl odkazu', validate: validateLinkHref },
  ],
}

const FaqBlock: Block = {
  slug: 'faq',
  labels: { singular: 'Časté dotazy', plural: 'Časté dotazy' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Časté dotazy', label: 'Nadpis' },
    {
      name: 'items', type: 'array', required: true, minRows: 1, label: 'Otázky a odpovědi',
      fields: [
        { name: 'question', type: 'text', required: true, label: 'Otázka' },
        { name: 'answer', type: 'textarea', required: true, label: 'Odpověď' },
      ],
    },
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Stránka', plural: 'Stránky' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'pageType', 'slug', 'updatedAt'] },
  access: {
    read: ({ req }) => req.user ? true : { _status: { equals: 'published' } },
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Domovská stránka používá /, ostatní celou cestu bez úvodního lomítka.',
      },
      validate: (value: null | string | undefined) => {
        if (value === '/') return true
        if (typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(value)) return true
        return 'Použijte / nebo URL cestu malými písmeny, například blog/vzorovy-clanek.'
      },
    },
    {
      name: 'pageType', type: 'select', required: true, defaultValue: 'standard', label: 'Typ stránky',
      options: [
        { label: 'Homepage', value: 'home' }, { label: 'Prodejní stránka kurzu', value: 'course' },
        { label: 'Článek', value: 'article' }, { label: 'Standardní stránka', value: 'standard' },
      ],
    },
    { name: 'eyebrow', type: 'text', label: 'Text nad nadpisem' },
    {
      name: 'title',
      type: 'text',
      label: 'Hlavní nadpis',
      required: true,
    },
    { name: 'summary', type: 'textarea', label: 'Perex / úvod' },
    {
      name: 'content',
      type: 'richText',
      label: 'Původní obsah',
      admin: { description: 'Pole zůstává kvůli kompatibilitě starších stránek.' },
    },
    {
      name: 'primaryCta', type: 'group', label: 'Hlavní CTA', fields: [
        { name: 'label', type: 'text', label: 'Text tlačítka' },
        { name: 'href', type: 'text', label: 'Cíl odkazu', validate: validateLinkHref },
      ],
    },
    {
      name: 'coursePrice', type: 'number', min: 0, label: 'Cena kurzu v Kč',
      admin: {
        condition: (_, siblingData) => siblingData.pageType === 'course',
        description: 'Jediný zdroj ceny pro celou prodejní stránku.',
      },
    },
    { name: 'substantiveUpdatedAt', type: 'date', label: 'Datum věcné aktualizace' },
    { name: 'layout', type: 'blocks', blocks: [TextBlock, CtaBlock, FaqBlock], label: 'Obsahové bloky' },
  ],
  versions: { drafts: true, maxPerDoc: 20 },
}
