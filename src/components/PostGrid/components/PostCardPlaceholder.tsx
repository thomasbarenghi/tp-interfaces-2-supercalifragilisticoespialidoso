import { Skeleton } from '@heroui/react'

interface PostCardPlaceholderProps {
  useShimmer?: boolean
}

const HeroBlock = ({ className }: { className: string }) => <Skeleton className={className} />

const PlainBlock = ({ className }: { className: string }) => (
  <div className={`skeleton ${className}`} />
)

const PostCardPlaceholder = ({ useShimmer = true }: PostCardPlaceholderProps) => {
  const Block = useShimmer ? HeroBlock : PlainBlock

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-center gap-2">
        <Block className="h-6 w-6 rounded-full" />
        <Block className="h-3 w-1/4 rounded" />
      </div>

      <Block className="aspect-3/4 w-full rounded-2xl" />

      <div className="space-y-2 py-3">
        <Block className="h-3 w-4/5 rounded" />
        <Block className="h-3 w-3/5 rounded" />
        <Block className="h-3 w-1/3 rounded" />
      </div>
    </div>
  )
}

export default PostCardPlaceholder
