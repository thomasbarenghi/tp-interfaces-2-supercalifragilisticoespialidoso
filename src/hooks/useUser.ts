import useSWR from 'swr'
import { API } from '../config/api'
import { fetcher } from '../lib/fetcher'
import type { User } from '../types/user.ts'
import { useAuth } from './useAuth.ts'

export const useUser = (nickName?: string) => {
  const resolvedNickName = nickName
  const { user: loggedUser } = useAuth()
  const endpoint = `${API.USER_BY_NICKNAME(resolvedNickName ?? loggedUser?.nickName ?? 'empty')}`

  const { data, error, isLoading } = useSWR<User>(endpoint, fetcher)

  // Si estamos pidiendo el perfil del usuario logueado, podemos usar los datos locales
  // mientras cargan los de la API (o si hay error pero tenemos algo guardado)
  const user = data

  return {
    user,
    isLoading: !data && isLoading,
    error,
  }
}
