import Link from 'next/link'
import styles from './StatsTeaser.module.css'

export function StatsTeaser() {
  return (
    <section className={styles.teaser} aria-labelledby="stats-teaser-heading">
      <div className={styles.text}>
        <h2 id="stats-teaser-heading" className={styles.heading}>
          Big isn&apos;t the same as busy
        </h2>
        <p className={styles.copy}>
          Some of the largest parks get a fraction of the visitors that much smaller ones do.
          See all 20 ranked by size and by crowds.
        </p>
      </div>
      <Link href="/stats" className={styles.button}>
        Explore the stats <span aria-hidden="true" className={styles.arrow}>→</span>
      </Link>
    </section>
  )
}