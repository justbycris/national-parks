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
            alt={park.imageAlt ?? 'Picture of ' + park.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 33vw "
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