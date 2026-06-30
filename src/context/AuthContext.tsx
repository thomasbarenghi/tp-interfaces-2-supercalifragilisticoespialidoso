import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'

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

interface AuthContextValue {
  user: AuthUser | null
  isInitialized: boolean
  setUser: (user: AuthUser) => void
  clearUser: () => void
}

const AUTH_USER_KEY = 'auth_user'

const loadUser = (): AuthUser | null => {
  const saved = localStorage.getItem(AUTH_USER_KEY)
  if (!saved) return null
  try {
    return JSON.parse(saved)
  } catch {
    localStorage.removeItem(AUTH_USER_KEY)
    return null
  }
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<AuthUser | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserState(loadUser())
    setIsInitialized(true)
  }, [])

  const setUser = (user: AuthUser) => {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
    setUserState(user)
  }

  const clearUser = () => {
    localStorage.removeItem(AUTH_USER_KEY)
    setUserState(null)
  }

  return (
    <AuthContext.Provider value={{ user, isInitialized, setUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider')
  return ctx
}
