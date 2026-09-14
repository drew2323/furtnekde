import { notFound } from 'next/navigation'

import { LandingPage } from '../landing-page'
import { getNavigationPages, getPageBySlug } from '../page-data'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  return { description: page?.title, title: page?.title }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [page, navigation] = await Promise.all([getPageBySlug(slug), getNavigationPages()])
  if (!page) notFound()
  return <LandingPage navigation={navigation} page={page} />
}
