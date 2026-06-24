const BASE = import.meta.env.VITE_API_URL ?? ''

export const API = {
  USER_POSTS_BY_ID: (userId: string) => `${BASE}/users/${userId}/posts`,
  USER_BY_ID: (userId: string) => `${BASE}/users/${userId}`,
  POST_BY_ID: (postId: string) => `${BASE}/posts/${postId}`,
  PRODUCTS: `${BASE}/products`,
  PRODUCT: (id: string) => `${BASE}/products/${id}`,
  ORDERS: `${BASE}/orders`,
  ORDER_BY_NUMBER: (orderNumber: string) => `${BASE}/orders?orderNumber=${orderNumber}`,
  LOGIN: `${BASE}/auth/login`,
  FOLLOW: (userId: string, targetId: string) => `${BASE}/users/${userId}/follow/${targetId}`,
  UNFOLLOW: (userId: string, targetId: string) => `${BASE}/users/${userId}/unfollow/${targetId}`,
  FOLLOWERS: (userId: string) => `${BASE}/users/${userId}/followers`,
  COMMENTS: `${BASE}/comments`,
  COMMENT_BY_ID: (id: string) => `${BASE}/comments/${id}`,
} as const
