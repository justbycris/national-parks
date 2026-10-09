import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
      <h1>Park not found</h1>
      <p>That trail doesn&apos;t lead anywhere. <Link href="/">Back to all parks</Link>.</p>
    </main>
  )
}