import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { API } from '../config/api'
import type { User } from '../types/user'

export const useFollow = (viewedUserId: string, authUserId: string | undefined) => {
  const { mutate } = useSWRConfig()
  const [isLoading, setIsLoading] = useState(false)

  const updateFollowersCache = (add: boolean) => {
    mutate(
      API.USER_BY_ID(viewedUserId),
      (current: User | undefined) => {
        if (!current || !authUserId) return current
        const followers = current.followers ?? []
        const updated = add
          ? [...followers, { _id: authUserId, id: authUserId, nickName: '', name: '' }]
          : followers.filter((f) => f._id !== authUserId && f.id !== authUserId)
        return { ...current, followers: updated }
      },
      { revalidate: false },
    )
  }

  const follow = async () => {
    if (!authUserId) return
    setIsLoading(true)
    updateFollowersCache(true)
    try {
      await fetch(API.FOLLOW(authUserId, viewedUserId), { method: 'POST' })
    } catch {
      updateFollowersCache(false)
    } finally {
      await mutate(API.USER_BY_ID(viewedUserId))
      setIsLoading(false)
    }
  }

  const unfollow = async () => {
    if (!authUserId) return
    setIsLoading(true)
    updateFollowersCache(false)
    try {
      await fetch(API.UNFOLLOW(authUserId, viewedUserId), { method: 'DELETE' })
    } catch {
      updateFollowersCache(true)
    } finally {
      await mutate(API.USER_BY_ID(viewedUserId))
      setIsLoading(false)
    }
  }

  return { follow, unfollow, isLoading }
}
