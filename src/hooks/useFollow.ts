import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { API } from '../config/api'

export const useFollow = (viewedUserId: string, authUserId?: string) => {
  const { mutate } = useSWRConfig()
  const [isLoading, setIsLoading] = useState(false)

  const execute = async (method: 'POST' | 'DELETE') => {
    if (!authUserId) return

    setIsLoading(true)

    try {
      const url =
        method === 'POST'
          ? API.FOLLOW(authUserId, viewedUserId)
          : API.UNFOLLOW(authUserId, viewedUserId)

      const res = await fetch(url, { method })

      if (!res.ok) {
        throw new Error('Request failed')
      }
    } finally {
      await mutate(API.USER_BY_ID(viewedUserId))
      setIsLoading(false)
    }
  }

  const follow = () => execute('POST')
  const unfollow = () => execute('DELETE')

  return { follow, unfollow, isLoading }
}
