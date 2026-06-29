import PostCard from '../PostCard'
import PostCardSkeleton from './PostCardSkeleton.tsx'
import type { Post } from '../../types/post.ts'
import PostCardEmptyState from './PostCardEmptyState.tsx'

interface Props {
  posts: Post[]
  isLoading?: boolean
  skeletonCount?: number
}

const PostGrid = ({ posts, isLoading, skeletonCount = 8 }: Props) => (
  <div className="grid grid-cols-1 gap-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
    {isLoading
      ? Array.from({ length: skeletonCount }).map((_, i) => <PostCardSkeleton key={i} />)
      : posts?.length === 0
        ? Array.from({ length: 3 }).map((_, i) => <PostCardEmptyState key={i} />)
        : posts.map((post) => <PostCard key={post._id} post={post} />)}
  </div>
)

export default PostGrid
