import { useState } from 'react'
import { API } from '../config/api'
import { useAuthContext, type AuthUser } from '../context/AuthContext'

const normalizeUser = (user: Partial<AuthUser> & { _id?: string; id?: string }) =>
  ({
    ...user,
    id: user.id ?? user._id ?? '',
    _id: user._id ?? user.id ?? '',
  }) as AuthUser

export const useAuth = () => {
  const { user, setUser, clearUser, isInitialized } = useAuthContext()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRequest = async (
    request: () => Promise<Response>,
    errorMessage: string,
  ): Promise<AuthUser> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await request()
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message ?? errorMessage)
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

  const login = (email: string, password: string) =>
    handleRequest(
      () =>
        fetch(API.LOGIN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }),
      'Error al iniciar sesión',
    )

  const register = (nickname: string, name: string, email: string, password: string) =>
    handleRequest(
      () =>
        fetch(API.REGISTER, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nickName: nickname, name, email, password }),
        }),
      'Error al registrarse',
    )

  const logout = () => {
    clearUser()
    setError(null)
  }

  return {
    user,
    setUser,
    login,
    register,
    logout,
    isLoading,
    isInitialized,
    error,
    isAuthenticated: user !== null,
  }
}
