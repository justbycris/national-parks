import { cache } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import type { ParkDetail } from '@/types'
import styles from './page.module.css'

const PARK_QUERY = `*[_type == "park" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  summary,
  region,
  states,
  established,
  acres,
  annualVisitors,
  highlights,
  bestSeason,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt
}`

const SLUGS_QUERY = `*[_type == "park" && defined(slug.current)]{ "slug": slug.current }`

// cache() lets generateMetadata and the page share one fetch per request
const getPark = cache((slug: string) =>
  client.fetch<ParkDetail | null>(PARK_QUERY, { slug }, { next: { revalidate: 60 } })
)

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(SLUGS_QUERY)
  return slugs
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const park = await getPark(slug)
  if (!park) return {}

  const ogImage = park.imageUrl ? `${park.imageUrl}?w=1200&h=630&fit=crop` : undefined

  return {
    title: park.name,
    description: park.summary,
    openGraph: {
      title: park.name,
      description: park.summary,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: park.imageAlt ?? park.name }] : [],
    },
    twitter: { card: 'summary_large_image' },
  }
}

const fmt = (n?: number) => (n != null ? n.toLocaleString('en-US') : '—')

export default async function ParkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const park = await getPark(slug)
  if (!park) notFound()

  return (
  <main>
    <section className={styles.hero}>
      {park.imageUrl && (
        <Image
          src={park.imageUrl}
          alt={park.imageAlt ?? ''}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
      )}
      <div className={styles.heroText}>
        <Link href="/" className={styles.back}>← All parks</Link>
        <p className={styles.region}>{park.region}</p>
        <h1 className={styles.title}>{park.name}</h1>
        {park.states && <p className={styles.states}>{park.states.join(', ')}</p>}
      </div>
    </section>

    <div className={styles.content}>
      <p className={styles.summary}>{park.summary}</p>

      <dl className={styles.stats}>
        <div><dt>Established</dt><dd>{park.established ?? '—'}</dd></div>
        <div><dt>Acres</dt><dd>{fmt(park.acres)}</dd></div>
        <div><dt>Annual visitors</dt><dd>{fmt(park.annualVisitors)}</dd></div>
        <div><dt>Best season</dt><dd>{park.bestSeason ?? '—'}</dd></div>
      </dl>

      {park.highlights && park.highlights.length > 0 && (
        <section>
          <h2 className={styles.subheading}>Highlights</h2>
          <ul className={styles.highlights}>
            {park.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </section>
      )}
    </div>
  </main>
)
}