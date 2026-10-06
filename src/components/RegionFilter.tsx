import Link from 'next/link'
import { REGIONS } from '@/regions'
import styles from './RegionFilter.module.css'

export function RegionFilter({ active }: { active?: string }) {
  return (
    <nav aria-label="Filter by region" className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <Link href="/" className={styles.pill} aria-current={!active ? 'page' : undefined}>
            All
          </Link>
        </li>
        {REGIONS.map((r) => (
          <li key={r}>
            <Link
              href={`/?region=${encodeURIComponent(r)}`}
              className={styles.pill}
              aria-current={active === r ? 'page' : undefined}
            >
              {r}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}