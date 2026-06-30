import { Avatar, Chip } from '@heroui/react'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../config/routes.ts'
import { formatRelativeDate } from '../../utils/format.ts'
import PostComments from '../../components/PostComments'
import type { Post } from '../../types/post.ts'
import EditPostModal from '../../pages/post-detail/components/EditPostModal.tsx'

type PostDetailContentProps = {
  post: Post
  isAuthor: boolean
  onClose?: () => void
  compact?: boolean
}

const PostDetailContent = ({
  post,
  isAuthor,
  onClose,
  compact = false,
}: PostDetailContentProps) => {
  const navigate = useNavigate()
  const author = post.author

  return (
    <div className={compact ? 'flex flex-col gap-4' : 'flex flex-col gap-6'}>
      <div className="flex items-center justify-between pt-2">
        <button
          className="flex items-center gap-3 text-left w-fit cursor-pointer"
          onClick={() => navigate(ROUTES.PROFILE(author.nickName))}
        >
          <Avatar size="md">
            <Avatar.Image src={author.profileImage} alt={author.name} className="object-cover" />
            <Avatar.Fallback>{author.name?.[0]}</Avatar.Fallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-semibold text-base">{author.name}</span>
            <span className="text-sm text-gray-400">{formatRelativeDate(post.createdAt)}</span>
          </div>
        </button>

        <div className="flex gap-2">
          {isAuthor && (
            <EditPostModal
              postId={post._id}
              initialDescription={post.description ?? ''}
              initialImageUrl={post.images?.[0]?.url ?? null}
              onSuccess={onClose}
              postTags={post.tags ?? []}
            />
          )}

          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl text-sm bg-secondary/10 hover:bg-secondary/20"
            >
              Cerrar
            </button>
          )}
        </div>
      </div>

      <p className="text-base leading-relaxed">{post.description}</p>

      {Array.isArray(post.tags) && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Chip key={tag._id}>{tag.name}</Chip>
          ))}
        </div>
      )}

      <PostComments postId={post._id} comments={post.comments ?? []} />
    </div>
  )
}

export default PostDetailContent
