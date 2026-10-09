'use client'

import styles from './ParksChart.module.css'
import { useEffect, useRef, useState } from 'react'
import { LAYOUT, barWidth, niceMax, rankParks, type ChartPark, type Metric } from '@/lib/chart'

export type { ChartPark } from '@/lib/chart' // keeps the import in stats/page.tsx working
const { W, LABEL, PAD_R, TOP, ROW, BAR, AXIS, TICKS } = LAYOUT

// export type ChartPark = { _id: string; name: string; acres: number; annualVisitors: number }
// type Metric = 'annualVisitors' | 'acres'

const METRICS: Record<Metric, { label: string; unit: string }> = {
  annualVisitors: { label: 'Annual visitors', unit: 'visitors' },
  acres: { label: 'Acres', unit: 'acres' },
}


const full = new Intl.NumberFormat('en-US')
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 })


export function ParksChart({ parks }: { parks: ChartPark[] }) {

  const wrapRef = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [intro, setIntro] = useState(true)
  const [metric, setMetric] = useState<Metric>('annualVisitors')
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
  const el = wrapRef.current
  if (!el) return
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) { setShown(true); io.disconnect() }
    },
    { threshold: 0.25 }
  )
  io.observe(el)
  return () => io.disconnect()
}, [])

  if (parks.length === 0) return null

  const ranked = rankParks(parks, metric)
  const rank = new Map(ranked.map((p, i) => [p._id, i]))
  const max = niceMax(ranked[0][metric])
  const plotW = W - LABEL - PAD_R
  const H = TOP + parks.length * ROW + AXIS
  const barW = (v: number) => (shown ? barWidth(v, max, plotW) : 0)

     const { unit } = METRICS[metric]

  const active = parks.find((p) => p._id === activeId)
  const tip = active && {
    left: ((LABEL + barW(active[metric])) / W) * 100,
    top: ((TOP + rank.get(active._id)! * ROW + ROW / 2) / H) * 100,
    flip: barW(active[metric]) / plotW > 0.6,
  }

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div role="radiogroup" aria-label="Chart metric" className={styles.toggle}>
        {(Object.keys(METRICS) as Metric[]).map((m) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={metric === m}
            className={styles.option}
            onClick={() => { setIntro(false); setMetric(m) }}
          >
            {METRICS[m].label}
          </button>
        ))}
      </div>
      <p className={styles.caption} aria-live="polite">
        Ranked by {METRICS[metric].label.toLowerCase()}
      </p>

      <div className={styles.scroll}>
        <div className={styles.plot}>
          <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} aria-label="Bar chart of national parks">
            {Array.from({ length: TICKS + 1 }, (_, i) => {
              const x = LABEL + (i / TICKS) * plotW
              return (
                <g key={i}>
                  <line className={styles.grid} x1={x} x2={x} y1={TOP} y2={TOP + parks.length * ROW} />
                  <text className={styles.tick} x={x} y={H - 8} textAnchor="middle">
                    {compact.format((max * i) / TICKS)}
                  </text>
                </g>
              )
            })}

            {parks.map((p) => (
              <g
                key={p._id}
                className={styles.row}
                style={{ transform: `translateY(${TOP + rank.get(p._id)! * ROW}px)` }}
                tabIndex={0}
                role="img"
                aria-label={`${p.name}: ${full.format(p[metric])} ${unit}`}
                onMouseEnter={() => setActiveId(p._id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(p._id)}
                onBlur={() => setActiveId(null)}
              >
                <rect className={styles.hit} x={0} y={0} width={W} height={ROW} />
                <text className={styles.label} x={LABEL - 12} y={ROW / 2} textAnchor="end" dominantBaseline="central">
                  {p.name}
                </text>
                <rect
                  className={p._id === activeId ? `${styles.bar} ${styles.barActive}` : styles.bar}
                  x={LABEL}
                  y={(ROW - BAR) / 2}
                  height={BAR}
                  rx={3}
                  style={{
                    width: barW(p[metric]),
                    transitionDelay: intro ? `${rank.get(p._id)! * 40}ms, 0ms, 0ms` : '0ms',
                  }}
                />
              </g>
            ))}
          </svg>

          {active && tip && (
            <div
              className={tip.flip ? `${styles.tooltip} ${styles.flip}` : styles.tooltip}
              style={{ left: `${tip.left}%`, top: `${tip.top}%` }}
              role="status"
            >
              <strong>{active.name}</strong>
              <span>{full.format(active[metric])} {unit}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}