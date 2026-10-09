export type Metric = 'annualVisitors' | 'acres'

export type ChartPark = {
  _id: string
  name: string
  acres: number
  annualVisitors: number
}

export const LAYOUT = {
  W: 800,
  LABEL: 170,
  PAD_R: 24,
  TOP: 8,
  ROW: 34,
  BAR: 20,
  AXIS: 28,
  TICKS: 4,
} as const

/** Round up to 1, 2, 5, or 10 times a power of ten, for a clean axis maximum. */
export function niceMax(v: number): number {
  if (v <= 0) return 1
  const pow = 10 ** Math.floor(Math.log10(v))
  const n = v / pow
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * pow
}

/** Largest first. Returns a new array and leaves the input untouched. */
export function rankParks(parks: ChartPark[], metric: Metric): ChartPark[] {
  return [...parks].sort((a, b) => b[metric] - a[metric])
}

/** Bar width in px, with a 2px floor so tiny values stay visible. */
export function barWidth(value: number, max: number, plotW: number): number {
  return Math.max(2, (value / max) * plotW)
}