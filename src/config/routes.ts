export const ROUTES = {
  HOME: '/',
  CONTACT: '/contact',
  LIST: '/list',
  POST: (postId: string) => `/post/${postId}`,
  PRODUCT: (slug: string) => `/product/${slug}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_SUCCESS: '/checkout/success',
  CHECKOUT_ERROR: '/checkout/error',
  TRACKING: '/tracking',
  TRACKING_ORDER: (orderNumber: string) => `/tracking/${orderNumber}`,
} as const
