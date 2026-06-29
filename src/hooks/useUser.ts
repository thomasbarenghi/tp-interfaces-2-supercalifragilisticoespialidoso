import useSWR from 'swr'
import { API } from '../config/api'
import { fetcher } from '../lib/fetcher'
import type { User } from '../types/user.ts'
import { useAuth } from './useAuth'

export const useUser = (nickName?: string) => {
  const { user: authUser } = useAuth()
  const resolvedNickName = nickName || authUser?.nickName
  const endpoint = `${API.USER_BY_NICKNAME(resolvedNickName)}`

  const { data, error, isLoading } = useSWR<User>(endpoint, fetcher)

  // Si estamos pidiendo el perfil del usuario logueado, podemos usar los datos locales
  // mientras cargan los de la API (o si hay error pero tenemos algo guardado)
  const user = resolvedNickName === authUser?.nickName ? ({ ...authUser, ...data } as User) : data

  return {
    user,
    isLoading: !data && isLoading,
    error,
  }
}
