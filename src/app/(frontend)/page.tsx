import { LandingPage } from './landing-page'
import { getNavigationPages, getPageBySlug } from './page-data'
import './styles.css'

export async function generateMetadata() {
  const page = await getPageBySlug('/')
  return { description: page?.title ?? 'Hello world', title: page?.title ?? 'Hello world' }
}

export default async function HomePage() {
  const [page, navigation] = await Promise.all([getPageBySlug('/'), getNavigationPages()])
  return page ? (
    <LandingPage navigation={navigation} page={page} />
  ) : (
    <div className="home">Hello world</div>
  )
}
