const BASE = import.meta.env.VITE_API_URL ?? ''

export const API = {
  PRODUCTS: `${BASE}/products`,
  PRODUCT: (id: string) => `${BASE}/products/${id}`,
  ORDERS: `${BASE}/orders`,
  ORDER_BY_NUMBER: (orderNumber: string) => `${BASE}/orders?orderNumber=${orderNumber}`,
} as const
