import useSWR, { useSWRConfig } from 'swr'
import { API } from '../config/api'
import { fetcher } from '../lib/fetcher'
import type { Post } from '../types/post'
import { useAuth } from './useAuth'
import { useAsyncAction } from './useAsyncAction'
import { toFormData } from '../utils/toFormData'

interface CreatePostPayload {
  description: string
  image: File
}

interface EditPostPayload {
  description: string
  image?: File | null
}

export const usePost = (id?: string) => {
  const { data, error, isLoading } = useSWR<Post>(id ? API.POST_BY_ID(id) : null, fetcher, {
    keepPreviousData: true,
  })
  const { mutate } = useSWRConfig()
  const { user } = useAuth()

  const {
    run: createPost,
    isSubmitting: isCreating,
    error: createError,
  } = useAsyncAction(async ({ description, image }: CreatePostPayload) => {
    const formData = toFormData({ description, image, userId: user?._id })
    const res = await fetch(API.POSTS, { method: 'POST', body: formData })
    if (!res.ok) throw new Error('Error al crear la publicación')
    return res.json()
  })

  const {
    run: editPost,
    isSubmitting: isEditing,
    error: editError,
  } = useAsyncAction(async ({ description, image }: EditPostPayload) => {
    const formData = toFormData({ description, image: image ?? undefined })
    const res = await fetch(API.POST_BY_ID(id!), { method: 'PUT', body: formData })
    if (!res.ok) throw new Error('Error al editar la publicación')
    await mutate(API.POST_BY_ID(id!))
  })

  const { run: deletePost, isSubmitting: isDeleting } = useAsyncAction(
    async ({ postId }: { postId: string }) => {
      const res = await fetch(`${API.POSTS}/${postId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al eliminar la publicación')
      if (res.status === 204) return null
      return res.json()
    },
  )

  return {
    post: data,
    isLoading,
    error,
    createPost,
    isCreating,
    createError,
    editPost,
    isEditing,
    editError,
    deletePost,
    isDeleting,
  }
}
