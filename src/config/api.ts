const BASE = import.meta.env.VITE_API_URL ?? ''

export const API = {
  USER_POSTS_BY_ID: (userId: string) => `${BASE}/users/${userId}/posts`,
  USER_BY_ID: (userId: string) => `${BASE}/users/${userId}`,
  USER_BY_NICKNAME: (nickname: string) => `${BASE}/users/nickname/${nickname}`,
  POST_BY_ID: (postId: string) => `${BASE}/posts/${postId}`,
  POSTS: `${BASE}/posts`,
  LOGIN: `${BASE}/auth/login`,
  FOLLOW: (userId: string, targetId: string) => `${BASE}/users/${userId}/follow/${targetId}`,
  UNFOLLOW: (userId: string, targetId: string) => `${BASE}/users/${userId}/unfollow/${targetId}`,
  FOLLOWERS: (userId: string) => `${BASE}/users/${userId}/followers`,
  COMMENTS: `${BASE}/comments`,
  COMMENT_BY_ID: (id: string) => `${BASE}/comments/${id}`,
} as const
