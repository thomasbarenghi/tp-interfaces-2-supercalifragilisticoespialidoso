export interface Product {
  id: string
  name: string
  slug: string
  category: string
  price: number
  badge: string | null
  description: string
  features: string[]
  images: string[]
  totalStock: number
  rating: {
    average: number
    count: number
  }
  salesCount: number
}
