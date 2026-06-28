export const ROUTES = {
  HOME: '/',
  CONTACT: '/contact',
  POST: (postId: string) => `/post/${postId}`,
  POST_EDIT: (postId: string) => `/post/${postId}/edit`,
  PROFILE: (userId: string) => `/profile/${userId}`,
  PROFILE_EDIT: '/profile/edit',
  POST_CREATE: '/post/create',
} as const
