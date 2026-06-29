import { API } from '../config/api'
import { useAsyncAction } from './useAsyncAction'
import { toFormData } from '../utils/toFormData'
import { useUser } from './useUser.ts'

interface UpdateProfilePayload {
  name: string
  bio: string
  profileImage: File | null
}

export const useUpdateProfile = () => {
  const { user } = useUser()

  const {
    run: updateProfile,
    isSubmitting,
    error,
  } = useAsyncAction(async ({ name, bio, profileImage }: UpdateProfilePayload) => {
    if (!user?.nickName) throw new Error('No hay usuario autenticado')

    const formData = toFormData({
      name,
      bio,
      profileImage,
    })

    const res = await fetch(API.USER_BY_ID(user.id), {
      method: 'PUT',
      body: formData,
    })

    if (!res.ok) throw new Error('Error al actualizar el perfil')

    return res.json()
  })

  return { updateProfile, isSubmitting, error }
}
