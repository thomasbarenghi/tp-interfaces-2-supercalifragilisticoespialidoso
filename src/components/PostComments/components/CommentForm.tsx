import { useState } from 'react'
import { Avatar, Button } from '@heroui/react'

interface CommentFormProps {
  authorName: string
  authorImage: string
  isSubmitting: boolean
  onSubmit: (text: string) => Promise<void>
}

const CommentForm = ({ authorName, authorImage, isSubmitting, onSubmit }: CommentFormProps) => {
  const [text, setText] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    await onSubmit(text.trim())
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Avatar size="sm">
        <Avatar.Image src={authorImage} alt={authorName} className="object-cover" />
        <Avatar.Fallback>{authorName?.[0]}</Avatar.Fallback>
      </Avatar>
      <div className="flex flex-1 gap-2">
        <input
          className="flex-1 text-sm rounded-full border border-current/20 bg-background px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Agregar comentario..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button isDisabled={!text.trim() || isSubmitting} variant="outline" type="submit">
          Publicar
        </Button>
      </div>
    </form>
  )
}

export default CommentForm
