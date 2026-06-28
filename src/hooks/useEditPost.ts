import { useSWRConfig } from 'swr'
import { API } from '../config/api'
import { useAsyncAction } from './useAsyncAction'
import { toFormData } from '../utils/toFormData'

interface EditPostPayload {
  description: string
  image?: File | null
}

export const useEditPost = (postId: string) => {
  const { mutate } = useSWRConfig()

  const {
    run: editPost,
    isSubmitting,
    error,
  } = useAsyncAction(async ({ description, image }: EditPostPayload) => {
    const formData = toFormData({
      description,
      image: image ?? undefined,
    })

    const res = await fetch(API.POST_BY_ID(postId), {
      method: 'PUT',
      body: formData,
    })

    if (!res.ok) throw new Error('Error al editar la publicación')

    await mutate(API.POST_BY_ID(postId))
  })

  return { editPost, isSubmitting, error }
}
