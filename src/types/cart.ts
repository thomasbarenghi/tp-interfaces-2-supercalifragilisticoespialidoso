export interface CartItem {
  id: string
  productId: string
  quantity: number
}

export interface Cart {
  id: string
  items: CartItem[]
}
