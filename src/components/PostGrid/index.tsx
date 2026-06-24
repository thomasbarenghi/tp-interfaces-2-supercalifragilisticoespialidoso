import PostCard from '../PostCard'
import ProductCardSkeleton from './ProductCardSkeleton'
import type {Post} from "../../types/post.ts";

interface Props {
  posts: Post[]
  isLoading?: boolean
  skeletonCount?: number
}

const PostGrid = ({ posts, isLoading, skeletonCount = 8 }: Props) => (
  <div className="grid grid-cols-2 gap-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
    {isLoading
      ? Array.from({ length: skeletonCount }).map((_, i) => <ProductCardSkeleton key={i} />)
      : posts.map((post) => <PostCard key={post._id} post={post} />)}
  </div>
)

export default PostGrid
