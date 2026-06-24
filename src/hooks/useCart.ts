import { useState } from 'react'
import type { Cart } from '../types/cart'

const CART_KEY = 'cart'

const readCart = (): Cart | null => {
  const stored = localStorage.getItem(CART_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored) as Cart
  } catch {
    return null
  }
}

const saveCart = (cart: Cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export const useCart = () => {
  const [cart, setCart] = useState<Cart | null>(readCart)

  const clearCart = () => {
    localStorage.removeItem(CART_KEY)
    setCart(null)
  }

  const addItem = (productId: string) => {
    const current = cart ?? { id: `cart-${Date.now()}`, items: [] }
    const existing = current.items.find((i) => i.productId === productId)
    const updated: Cart = existing
      ? {
          ...current,
          items: current.items.map((i) =>
            i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        }
      : {
          ...current,
          items: [...current.items, { id: `cart-item-${Date.now()}`, productId, quantity: 1 }],
        }
    saveCart(updated)
    setCart(updated)
  }

  const decrementItem = (productId: string) => {
    if (!cart) return
    const updated: Cart = {
      ...cart,
      items: cart.items.map((i) =>
        i.productId === productId ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i,
      ),
    }
    saveCart(updated)
    setCart(updated)
  }

  const removeItem = (productId: string) => {
    if (!cart) return
    const filtered = cart.items.filter((i) => i.productId !== productId)
    if (filtered.length === 0) {
      clearCart()
      return
    }
    const updated: Cart = { ...cart, items: filtered }
    saveCart(updated)
    setCart(updated)
  }

  return {
    cart,
    addItem,
    decrementItem,
    removeItem,
    clearCart,
    isEmpty: !cart || cart.items.length === 0,
  }
}
