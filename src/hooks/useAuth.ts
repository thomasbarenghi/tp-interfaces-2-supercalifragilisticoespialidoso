import { useEffect, useState } from 'react'
import { API } from '../config/api'

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

const AUTH_USER_KEY = 'auth_user'

const normalizeUser = (user: Partial<AuthUser> & { _id?: string; id?: string }) =>
  ({
    ...user,
    id: user.id ?? user._id ?? '',
    _id: user._id ?? user.id ?? '',
  }) as AuthUser

const loadUser = (): AuthUser | null => {
  const savedUser = localStorage.getItem(AUTH_USER_KEY)
  if (!savedUser) return null

  try {
    return JSON.parse(savedUser) as AuthUser
  } catch {
    localStorage.removeItem(AUTH_USER_KEY)
    return null
  }
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(loadUser())
    setIsInitialized(true)
  }, [])

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
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData))
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
    localStorage.removeItem(AUTH_USER_KEY)
    setUser(null)
    setError(null)
  }

  return {
    user,
    login,
    logout,
    isLoading,
    isInitialized,
    error,
    isAuthenticated: user !== null,
  }
}
