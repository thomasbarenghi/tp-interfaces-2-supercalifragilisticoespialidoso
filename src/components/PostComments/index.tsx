import type { PostComment } from '../../types/post'
import { useAuth } from '../../hooks/useAuth'
import { useComments } from '../../hooks/useComments'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'

interface PostCommentsProps {
  postId: string
  comments: PostComment[]
}

const PostComments = ({ postId, comments }: PostCommentsProps) => {
  const { user: authUser } = useAuth()
  const { addComment, editComment, deleteComment, isSubmitting } = useComments(postId)

  const handleAdd = (text: string) => {
    const userId = authUser?._id || authUser?.id
    if (!userId) return Promise.resolve()
    return addComment(text, userId)
  }

  return (
    <div className="flex flex-col gap-4 pt-2 border-t border-current/10">
      <h3 className="font-semibold text-sm text-foreground/60 uppercase tracking-wide">
        Comentarios ({comments.length})
      </h3>

      {comments.map((comment) => {
        const isOwn =
          !!authUser &&
          (comment.userId._id === authUser._id ||
            comment.userId._id === authUser.id ||
            comment.userId.id === authUser.id)
        return (
          <CommentItem
            key={comment._id}
            comment={comment}
            isOwn={isOwn}
            onEdit={editComment}
            onDelete={deleteComment}
          />
        )
      })}

      {authUser && (
        <CommentForm
          authorName={authUser.name}
          authorImage={authUser.profileImage}
          isSubmitting={isSubmitting}
          onSubmit={handleAdd}
        />
      )}
    </div>
  )
}

export default PostComments
