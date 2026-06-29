import { useEffect, useState } from 'react'

export interface AuthUser {
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

const loadUser = (): AuthUser | null => {
  const savedUser = localStorage.getItem(AUTH_USER_KEY)

  if (!savedUser) return null

  try {
    return JSON.parse(savedUser)
  } catch {
    localStorage.removeItem(AUTH_USER_KEY)
    return null
  }
}

export const useSyncUserInCache = () => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(loadUser())
    setIsInitialized(true)
  }, [])

  const saveUser = (user: AuthUser) => {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
    setUser(user)
  }

  const clearUser = () => {
    localStorage.removeItem(AUTH_USER_KEY)
    setUser(null)
  }

  return {
    user,
    setUser: saveUser,
    clearUser,
    isInitialized,
  }
}
