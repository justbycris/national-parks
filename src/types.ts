export type Park = {
  _id: string
  name: string
  slug: string
  summary: string
  region: string
  imageUrl?: string
  imageAlt?: string
}

export type ParkDetail = Park & {
  states?: string[]
  established?: number
  acres?: number
  annualVisitors?: number
  highlights?: string[]
  bestSeason?: string
}