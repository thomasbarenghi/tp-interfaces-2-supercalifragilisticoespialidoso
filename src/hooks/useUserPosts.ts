import useSWR from 'swr'
import { useSearchParams } from 'react-router'
import { API } from '../config/api'
import { fetcher } from '../lib/fetcher'
import type { Post } from '../types/post'

export const POSTS_PER_PAGE = 10

type PostsResponse = {
  data: Post[]
  pagination: {
    totalItems: number
    totalPages: number
    currentPage: number
    limit: number
  }
}

type UsePostOptions = {
  limit?: number
}

export const useUserPosts = ({ limit }: UsePostOptions = {}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page') ?? '1')

  const params = new URLSearchParams()
  params.set('_page', String(page))
  params.set('_limit', String(limit ?? POSTS_PER_PAGE))

  const endpoint = `${API.USER_POSTS_BY_ID('6a3b4ebde62a22d0367285c6')}?${params}`

  const { data, error, isLoading } = useSWR<PostsResponse>(endpoint, fetcher)

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(page))
    setSearchParams(params)
  }

  const totalItems = data?.pagination.totalItems ?? 0
  const pageSize = limit ?? POSTS_PER_PAGE

  return {
    posts: data?.data ?? [],
    totalItems,
    totalPages: data?.pagination.totalPages ?? Math.ceil(totalItems / pageSize),
    page,
    setPage,
    isLoading,
    error,
  }
}
