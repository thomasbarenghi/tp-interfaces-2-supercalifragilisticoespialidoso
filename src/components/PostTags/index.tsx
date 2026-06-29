import type { PostTag } from '../../types/post'
import { Chip } from '@heroui/react'

interface PostTagsProps {
  tags: PostTag[]
}

const PostTags = ({ tags }: PostTagsProps) => {
  if (!tags?.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Chip key={tag._id}>{tag.name}</Chip>
      ))}
    </div>
  )
}

export default PostTags
