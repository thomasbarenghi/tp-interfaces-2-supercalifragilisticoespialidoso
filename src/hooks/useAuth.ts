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

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user')
    if (savedUser) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error('Error parsing saved user', e)
        localStorage.removeItem('auth_user')
      }
    }
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Error al iniciar sesión')
      }

      const data = await response.json()
      const userData: AuthUser = { ...data.user, id: data.user._id || data.user.id }
      localStorage.setItem('auth_user', JSON.stringify(userData))
      setUser(userData)
      return userData
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_user')
    setUser(null)
  }

  return {
    user,
    login,
    logout,
    isLoading,
    isInitialized,
    error,
    isAuthenticated: !!user,
  }
}
