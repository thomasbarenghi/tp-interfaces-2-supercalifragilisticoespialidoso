import type { PostTag } from '../../types/post'

interface PostTagsProps {
  tags: PostTag[]
}

const PostTags = ({ tags }: PostTagsProps) => {
  if (!tags?.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag._id}
          className="px-3 py-1 text-sm rounded-full border border-current/20 text-foreground/70"
        >
          {tag.name}
        </span>
      ))}
    </div>
  )
}

export default PostTags
