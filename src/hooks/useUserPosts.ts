import useSWR from 'swr'
import { useSearchParams } from 'react-router'
import { API } from '../config/api'
import { paginatedFetcher } from '../lib/fetcher'
import type { Post } from '../types/post'

export const POSTS_PER_PAGE = 10

type PostResponse = {
    data: Post[]
    totalItems: number
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

    const endpoint = `${API.USER_POSTS_BY_ID("6a3b4487d5f7bc094426d202")}?${params}`

    const { data, error, isLoading } = useSWR<PostResponse>(endpoint, paginatedFetcher)

    const setPage = (page: number) => {
        const params = new URLSearchParams(searchParams)

        params.set('page', String(page))

        setSearchParams(params)
    }

    const totalItems = data?.totalItems ?? 0
    const pageSize = limit ?? POSTS_PER_PAGE

    return {
        products: data?.data ?? [],
        totalItems,
        totalPages: Math.ceil(totalItems / pageSize),
        page,
        setPage,
        isLoading,
        error,
    }
}
