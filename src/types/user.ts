import type { Post } from './post'

export interface FollowUser {
  _id: string
  id: string
  nickName: string
  name: string
  profileImage: string
}

export interface User {
  _id: string
  id: string
  nickName: string
  email: string
  name: string
  profileImage: string
  bio: string
  followers: FollowUser[]
  following: FollowUser[]
  posts: Post[]
  createdAt: string
  updatedAt: string
}
