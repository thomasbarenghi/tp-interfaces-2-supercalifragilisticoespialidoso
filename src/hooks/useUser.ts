import useSWR from 'swr'
import { API } from '../config/api'
import { fetcher } from '../lib/fetcher'
import type { User } from '../types/user.ts'
import { useAuth } from './useAuth'

export const useUser = (id?: string) => {
  const { user: authUser } = useAuth()
  const userId = id || authUser?.id || '6a3c2ca0c708d8c1710c264a'
  const endpoint = `${API.USER_BY_ID(userId)}`

  const { data, error, isLoading } = useSWR<User>(endpoint, fetcher)

  // Si estamos pidiendo el perfil del usuario logueado, podemos usar los datos locales
  // mientras cargan los de la API (o si hay error pero tenemos algo guardado)
  const user = userId === authUser?.id ? ({ ...authUser, ...data } as User) : data

  return {
    user,
    isLoading: !data && isLoading,
    error,
  }
}
