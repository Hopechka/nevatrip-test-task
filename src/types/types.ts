export interface ITours {
  id?: number
  title: string
  price: number,
  description: string[]
  duration: string,
  schedule: string[]
  category: string
  image: string
  details?: string
}