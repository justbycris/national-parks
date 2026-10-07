import Link from 'next/link'
import styles from './SiteHeader.module.css'

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>National Parks</Link>
        <nav aria-label="Main">
          <ul className={styles.links}>
            <li><Link href="/" className={styles.link}>Parks</Link></li>
            <li><Link href="/stats" className={styles.link}>Stats</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}