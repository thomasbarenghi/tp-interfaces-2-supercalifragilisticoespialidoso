import type { Tag } from './tag.ts'

export interface PostImage {
  _id: string
  id: string
  url: string
}

export interface PostAuthor {
  _id: string
  id: string
  nickName: string
  name: string
  profileImage: string
}

export interface PostComment {
  _id: string
  id: string
  text: string
  isVisible: boolean
  postId: string
  userId: PostAuthor
  createdAt: string
  updatedAt: string
}

export interface Post {
  _id: string
  id: string
  description: string
  author: PostAuthor
  images: PostImage[]
  tags: Tag[]
  comments: PostComment[]
  createdAt: string
  updatedAt: string
}
