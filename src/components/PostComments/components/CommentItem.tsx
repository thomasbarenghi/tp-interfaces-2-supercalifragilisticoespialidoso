import { useState } from 'react'
import { Avatar, Link } from '@heroui/react'
import type { PostComment } from '../../../types/post.ts'
import { ROUTES } from '../../../config/routes.ts'

interface CommentItemProps {
  comment: PostComment
  isOwn: boolean
  onEdit: (id: string, text: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

const CommentItem = ({ comment, isOwn, onEdit, onDelete }: CommentItemProps) => {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(comment.text)

  const handleSave = async () => {
    if (!editText.trim()) return
    await onEdit(comment._id, editText.trim())
    setEditing(false)
  }

  return (
    <div className="flex gap-3 group">
      <Avatar size="sm">
        <Avatar.Image
          src={comment.userId.profileImage}
          alt={comment.userId.name}
          className="object-cover"
        />
        <Avatar.Fallback>{comment.userId.name?.[0]}</Avatar.Fallback>
      </Avatar>

      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <Link href={ROUTES.PROFILE(comment.userId.nickName)} className="hover:no-underline">
          <span className="text-sm font-semibold hover:no-underline">{comment.userId.name}</span>
        </Link>
        {editing ? (
          <div className="flex flex-col gap-2">
            <textarea
              className="text-sm w-full rounded-lg border border-current/20 bg-background p-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={2}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div className="flex gap-2">
              <button className="text-xs font-medium text-primary" onClick={handleSave}>
                Guardar
              </button>
              <button className="text-xs text-foreground/50" onClick={() => setEditing(false)}>
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-foreground/80 break-words">{comment.text}</p>
        )}
      </div>

      {isOwn && !editing && (
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button className="text-xs cursor-pointer" onClick={() => setEditing(true)}>
            Editar
          </button>
          <button
            className="text-xs text-accent cursor-pointer"
            onClick={() => onDelete(comment._id)}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  )
}

export default CommentItem
