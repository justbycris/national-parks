import Image from 'next/image'
import Link from 'next/link'
import type { Park } from '@/types'
import styles from './ParkCard.module.css'

export function ParkCard({ park, priority = false }: { park: Park; priority?: boolean }) {
  
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {park.imageUrl && (
          <Image
            src={park.imageUrl}
            alt={park.imageAlt ?? ''}
            fill
            priority={priority}
            sizes="(min-width: 960px) 33vw, (min-width: 600px) 50vw, 100vw"
            className={styles.image}
          />
        )}
      </div>
      <div className={styles.body}>
        <p className={styles.region}>{park.region}</p>
        <h2 className={styles.title}>
          <Link href={`/parks/${park.slug}`} className={styles.link}>
            {park.name}
          </Link>
        </h2>
        <p className={styles.summary}>{park.summary}</p>
        <span className={styles.cta} aria-hidden="true">Explore →</span>
      </div>

    </article>
  )
}