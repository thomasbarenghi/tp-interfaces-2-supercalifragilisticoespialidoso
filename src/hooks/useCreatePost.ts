import { useAuth } from './useAuth'
import { API } from '../config/api'
import { useAsyncAction } from './useAsyncAction'
import { toFormData } from '../utils/toFormData'

interface CreatePostPayload {
  description: string
  image: File
}

export const useCreatePost = () => {
  const { user } = useAuth()

  const {
    run: createPost,
    isSubmitting,
    error,
  } = useAsyncAction(async ({ description, image }: CreatePostPayload) => {
    const formData = toFormData({
      description,
      image,
      userId: user?._id,
    })

    const res = await fetch(API.POSTS, {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) throw new Error('Error al crear la publicación')

    return res.json()
  })

  return { createPost, isSubmitting, error }
}
