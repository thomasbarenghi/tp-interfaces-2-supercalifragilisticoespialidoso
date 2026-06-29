import { useEffect } from 'react'
import useSWR from 'swr'
import { API } from '../config/api'
import { fetcher } from '../lib/fetcher'
import type { User } from '../types/user'
import { useAuth } from './useAuth'

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

const sameAuthUser = (a: AuthUser | null | undefined, b: AuthUser) => {
  if (!a) return false

  return (
    a._id === b._id &&
    a.id === b.id &&
    a.nickName === b.nickName &&
    a.email === b.email &&
    a.name === b.name &&
    a.profileImage === b.profileImage &&
    a.bio === b.bio &&
    a.createdAt === b.createdAt &&
    a.updatedAt === b.updatedAt
  )
}

export const useUser = (id?: string) => {
  const { user: authUser, setUser } = useAuth()
  const userId = id ?? authUser?.id

  const { data, error, isLoading } = useSWR<User>(userId ? ['user', userId] : null, () =>
    fetcher(API.USER_BY_ID(userId!)),
  )

  useEffect(() => {
    if (!data || !userId || !authUser) return
    if (userId !== authUser.id) return
    const nextAuthUser: AuthUser = {
      _id: data._id ?? data.id ?? authUser._id,
      id: data.id ?? data._id ?? authUser.id,
      nickName: data.nickName ?? authUser.nickName,
      email: data.email ?? authUser.email,
      name: data.name ?? authUser.name,
      profileImage: data.profileImage ?? authUser.profileImage,
      bio: data.bio ?? authUser.bio,
      followers: authUser.followers,
      following: authUser.following,
      posts: authUser.posts,
      createdAt: data.createdAt ?? authUser.createdAt,
      updatedAt: data.updatedAt ?? authUser.updatedAt,
    }

    if (!sameAuthUser(authUser, nextAuthUser)) {
      setUser(nextAuthUser)
    }
  }, [data, userId, authUser, setUser])

  const user = userId === authUser?.id ? ({ ...authUser, ...data } as User) : data

  return {
    user,
    isLoading: !data && isLoading,
    error,
  }
}
