import { useState } from 'react'
import { API } from '../config/api'
import { useSyncUserInCache } from './useSyncUserInCache.ts'

interface AuthUser {
  _id: string
  id: string
  nickName: string
  email: string
  name: string
  profileImage: string
  bio: string
  followers: string[]
  following: string[]
  posts: string[]
  createdAt: string
  updatedAt: string
}

const normalizeUser = (user: Partial<AuthUser> & { _id?: string; id?: string }) =>
  ({
    ...user,
    id: user.id ?? user._id ?? '',
    _id: user._id ?? user.id ?? '',
  }) as AuthUser

export const useAuth = () => {
  const { user, setUser, clearUser, isInitialized } = useSyncUserInCache()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(API.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message ?? 'Error al iniciar sesión')
      }

      const userData = normalizeUser(data.user)
      setUser(userData)

      return userData
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    clearUser()
    setError(null)
  }

  return {
    user,
    setUser,
    login,
    logout,
    isLoading,
    isInitialized,
    error,
    isAuthenticated: user !== null,
  }
}
