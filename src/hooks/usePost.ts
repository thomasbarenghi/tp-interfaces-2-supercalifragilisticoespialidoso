import useSWR from 'swr'
import { API } from '../config/api'
import { fetcher } from '../lib/fetcher'
import type { Post } from '../types/post'

export const usePost = (id: string) => {
  const { data, error, isLoading } = useSWR<Post>(API.POST_BY_ID(id), fetcher)

  return {
    post: data,
    isLoading,
    error,
  }
}
