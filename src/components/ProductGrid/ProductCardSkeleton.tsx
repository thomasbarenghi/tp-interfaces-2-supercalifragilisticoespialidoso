import { Skeleton } from '@heroui/react'

const ProductCardSkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="w-full aspect-3/4 rounded-2xl" />
    <div className="py-3 gap-1 space-y-2">
      <Skeleton className="h-3 w-2/5 rounded" />
      <Skeleton className="h-3 w-4/5 rounded" />
      <Skeleton className="h-4 w-1/3 rounded" />
    </div>
  </div>
)

export default ProductCardSkeleton
