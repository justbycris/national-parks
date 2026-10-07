import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { ParksChart, type ChartPark } from '@/components/ParksChart'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Stats',
  description:
    'Size and popularity don’t track each other. Compare every park by acres and annual visitors.',
}

const CHART_QUERY = `*[_type == "park" && defined(acres) && defined(annualVisitors)]{
  _id, name, acres, annualVisitors
}`

export default async function StatsPage() {
  const chartParks = await client.fetch<ChartPark[]>(
    CHART_QUERY,
    {},
    { next: { revalidate: 60 } }
  )

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Big isn&apos;t the same as busy</h1>
        <p className={styles.lede}>
          Toggle between size and visitors and watch the ranking reshuffle. The biggest parks are
          often among the quietest.
        </p>
      </header>

      <ParksChart parks={chartParks} />

      <p className={styles.source}><small>Acreage and visitor counts based on data from 2025: National Park Service. https://www.nps.gov/subjects/socialscience/visitor-use-statistics-dashboard.htm</small></p>
    </main>
  )
}