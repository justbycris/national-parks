import { client } from '@/sanity/lib/client'
import { ParkCard } from '@/components/ParkCard'
import { RegionFilter } from '@/components/RegionFilter'
import { REGIONS } from '@/regions'
import type { Park } from '@/types'
import styles from './page.module.css'
import { StatsTeaser } from '@/components/StatsTeaser'



const PARKS_QUERY = `*[_type == "park" && (!defined($region) || region == $region)] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  summary,
  region,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt
}`

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>
}) {
  const { region } = await searchParams
  const activeRegion = REGIONS.find((r) => r === region) // ignore unknown values

const parks = await client.fetch<Park[]>(
  PARKS_QUERY,
  { region: activeRegion ?? null },
  { next: { revalidate: 60 } }
)

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.heading}>National Parks</h1>
        <p className={styles.lede}>Explore America's protected landscapes.</p>
      </header>

      <StatsTeaser />


      <RegionFilter active={activeRegion} />

      {parks.length === 0 ? (
        <p>No parks in this region yet.</p>
      ) : (
        <ul className={styles.grid}>
          {parks.map((park, index) => (
            <li key={park._id} style={{ '--i': index } as React.CSSProperties}>
              <ParkCard park={park} priority={index < 3} />
            </li>
          ))}
        </ul>
      )}
      
    </main>
  )
}