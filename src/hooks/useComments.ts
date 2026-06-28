import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { API } from '../config/api'

export const useComments = (postId: string) => {
  const { mutate } = useSWRConfig()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const revalidate = () => mutate(API.POST_BY_ID(postId))

  const withSubmission = async <T>(fn: () => Promise<T>) => {
    setIsSubmitting(true)
    try {
      return await fn()
    } finally {
      setIsSubmitting(false)
    }
  }

  const addComment = (text: string, userId: string) =>
    withSubmission(async () => {
      const res = await fetch(API.COMMENTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, userId, postId }),
      })

      if (!res.ok) throw new Error('Error al comentar')
      await revalidate()
    })

  const editComment = (commentId: string, text: string) =>
    withSubmission(async () => {
      const res = await fetch(API.COMMENT_BY_ID(commentId), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      if (!res.ok) throw new Error('Error al editar')
      await revalidate()
    })

  const deleteComment = (commentId: string) =>
    withSubmission(async () => {
      const res = await fetch(API.COMMENT_BY_ID(commentId), {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Error al eliminar')
      await revalidate()
    })

  return { addComment, editComment, deleteComment, isSubmitting }
}
