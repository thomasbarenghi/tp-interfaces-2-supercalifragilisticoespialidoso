import type { Post } from './post'

export interface User {
    _id: string
    id: string
    nickName: string
    email: string
    name: string
    profileImage: string
    bio: string
    followers: string[]
    following: string[]
    posts: Post[]
    createdAt: string
    updatedAt: string
}