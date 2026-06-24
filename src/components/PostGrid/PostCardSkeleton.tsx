import { Skeleton } from '@heroui/react'

const PostCardSkeleton = () => (
  <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 w-full">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-3 rounded w-1/4" />
      </div>


      <Skeleton className="w-full aspect-3/4 rounded-2xl" />
    <div className="py-3 gap-1 space-y-2">
        <Skeleton className="h-3 w-4/5 rounded" />
           <Skeleton className="h-3 w-3/5 rounded" />
      <Skeleton className="h-3 w-1/3 rounded" />
    </div>
  </div>
)

export default PostCardSkeleton
