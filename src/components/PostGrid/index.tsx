import PostCard from '../PostCard'
import type { Post } from '../../types/post'
import PostCardPlaceholder from './components/PostCardPlaceholder.tsx'

interface Props {
  posts: Post[]
  isLoading?: boolean
  skeletonCount?: number
}

const gridClassName = 'grid grid-cols-1 gap-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3'

const PostGrid = ({ posts, isLoading = false, skeletonCount = 8 }: Props) => {
  if (isLoading) {
    return (
      <div className={gridClassName}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <PostCardPlaceholder key={index} />
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className={gridClassName}>
        {Array.from({ length: 3 }).map((_, index) => (
          <PostCardPlaceholder key={index} useShimmer={false} />
        ))}
      </div>
    )
  }

  return (
    <div className={gridClassName}>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}

export default PostGrid
