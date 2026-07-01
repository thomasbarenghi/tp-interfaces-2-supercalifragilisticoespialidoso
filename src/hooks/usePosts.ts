import { useState } from 'react'
import useSWR from 'swr'
import { API } from '../config/api'
import { paginatedFetcher, type PaginatedResponse } from '../lib/fetcher'
import type { Post } from '../types/post'

export const POSTS_PER_PAGE = 6

export const usePosts = () => {
  const [page, setPage] = useState(1)
  const [seed, setSeed] = useState<number | null>(null)

  const seedParam = seed !== null ? `&seed=${seed}` : ''
  const endpoint = `${API.POSTS}?page=${page}&limit=${POSTS_PER_PAGE}${seedParam}`

  const {
    data,
    error,
    isLoading: isFetching,
  } = useSWR<PaginatedResponse<Post[]>>(endpoint, paginatedFetcher, {
    keepPreviousData: true,
    onSuccess: (res) => {
      if (seed === null && res.pagination.seed !== undefined) {
        setSeed(res.pagination.seed)
      }
    },
  })

  const posts = data?.data ?? []
  const totalItems = data?.pagination.totalItems ?? 0
  const totalPages =
    data?.pagination.totalPages ?? Math.max(1, Math.ceil(totalItems / POSTS_PER_PAGE))
  const currentPage = data?.pagination.currentPage ?? page

  return {
    posts,
    page: currentPage,
    setPage,
    totalPages,
    totalItems,
    isLoading: !data && isFetching,
    error,
  }
}
