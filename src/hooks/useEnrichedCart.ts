import useSWR from 'swr'
import { useCart } from './useCart'
import { fetcher } from '../lib/fetcher'
import { API } from '../config/api'
import type { Product } from '../types/product'

export const useEnrichedCart = () => {
  const { cart, clearCart, isEmpty, addItem, decrementItem, removeItem } = useCart()
  const productIds = (cart?.items ?? []).map((item) => item.productId)
  const { data: products, isLoading } = useSWR<Product[]>(
    productIds.length > 0 ? `products:${productIds.join(',')}` : null,
    () => Promise.all(productIds.map((id) => fetcher<Product>(API.PRODUCT(id)))),
  )

  const items = (cart?.items ?? []).map((item) => {
    const product = products?.find((p) => p.id === item.productId)
    return {
      id: item.id,
      productId: item.productId,
      name: product?.name ?? '',
      category: product?.category ?? '',
      image: product?.images[0] ?? '',
      quantity: item.quantity,
      stock: product?.totalStock ?? Infinity,
      unitPrice: product?.price ?? 0,
      price: (product?.price ?? 0) * item.quantity,
    }
  })

  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    items,
    subtotal,
    totalItems,
    isEmpty,
    isLoading,
    cart,
    clearCart,
    addItem,
    decrementItem,
    removeItem,
  }
}
