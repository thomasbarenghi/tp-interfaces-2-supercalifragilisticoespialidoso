import { API } from '../config/api'
import { useAsyncAction } from './useAsyncAction'

interface DeletePostPayload {
  postId: string
}

export const useDeletePost = () => {
  const {
    run: deletePost,
    isSubmitting,
    error,
  } = useAsyncAction(async ({ postId }: DeletePostPayload) => {
    const res = await fetch(`${API.POSTS}/${postId}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Error al eliminar la publicación')

    if (res.status === 204) return null

    return res.json()
  })

  return { deletePost, isSubmitting, error }
}
