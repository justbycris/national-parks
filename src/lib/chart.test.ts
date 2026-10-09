import { describe, expect, it } from 'vitest'
import { barWidth, niceMax, rankParks, type ChartPark } from './chart'

const park = (name: string, acres: number, annualVisitors: number): ChartPark => ({
  _id: name,
  name,
  acres,
  annualVisitors,
})

describe('niceMax', () => {
  it('rounds up to 1, 2, 5, or 10 times a power of ten', () => {
    expect(niceMax(1)).toBe(1)
    expect(niceMax(1.5)).toBe(2)
    expect(niceMax(4_000_000)).toBe(5_000_000)
    expect(niceMax(70_000)).toBe(100_000)
    expect(niceMax(13_200_000)).toBe(20_000_000)
  })

  it('never returns less than the input', () => {
    for (const v of [1, 3, 49, 520, 1_200_000, 13_200_000]) {
      expect(niceMax(v)).toBeGreaterThanOrEqual(v)
    }
  })

  it('returns 1 for zero or negative input instead of NaN', () => {
    expect(niceMax(0)).toBe(1)
    expect(niceMax(-5)).toBe(1)
  })
})

describe('rankParks', () => {
  const parks = [
    park('Small busy', 50_000, 4_000_000),
    park('Big quiet', 13_000_000, 70_000),
    park('Middle', 500_000, 12_000_000),
  ]

  it('orders largest first by the chosen metric', () => {
    expect(rankParks(parks, 'annualVisitors').map((p) => p.name)).toEqual([
      'Middle',
      'Small busy',
      'Big quiet',
    ])
    expect(rankParks(parks, 'acres').map((p) => p.name)).toEqual([
      'Big quiet',
      'Middle',
      'Small busy',
    ])
  })

  it('does not mutate the input array', () => {
    const before = parks.map((p) => p.name)
    rankParks(parks, 'acres')
    expect(parks.map((p) => p.name)).toEqual(before)
  })

  it('keeps input order for ties', () => {
    const tied = [park('A', 10, 5), park('B', 20, 5)]
    expect(rankParks(tied, 'annualVisitors').map((p) => p.name)).toEqual(['A', 'B'])
  })
})

describe('barWidth', () => {
  it('scales linearly with the value', () => {
    expect(barWidth(50, 100, 600)).toBe(300)
    expect(barWidth(100, 100, 600)).toBe(600)
  })

  it('never goes below 2px, so tiny values stay visible', () => {
    expect(barWidth(0.0001, 100, 600)).toBe(2)
  })
})