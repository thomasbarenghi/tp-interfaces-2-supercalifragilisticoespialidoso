export interface PostImage {
    url: string
}

export interface Post {
    _id: string
    description: string
    userId: string
    images: PostImage[]
    tags: string[]
    createdAt: string
    updatedAt: string
}