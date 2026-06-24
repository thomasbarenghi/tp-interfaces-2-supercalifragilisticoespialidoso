import useSWR from 'swr'
import { useSearchParams } from 'react-router'
import { API } from '../config/api'
import { paginatedFetcher } from '../lib/fetcher'
import type { Product } from '../types/product'

export const PRODUCTS_PER_PAGE = 10

type ProductsResponse = {
  data: Product[]
  totalItems: number
}

type UseProductsOptions = {
  limit?: number
}

export const useProducts = ({ limit }: UseProductsOptions = {}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const sort = searchParams.get('sort')
  const badge = searchParams.get('badge')

  const page = Number(searchParams.get('page') ?? '1')

  const params = new URLSearchParams()

  if (category) {
    params.set('category', category)
  }

  if (badge) {
    params.set('badge', badge)
  }

  if (search) {
    params.set('name_like', search)
  }

  if (sort === 'price-asc') {
    params.set('_sort', 'price')
    params.set('_order', 'asc')
  }

  if (sort === 'price-desc') {
    params.set('_sort', 'price')
    params.set('_order', 'desc')
  }

  params.set('_page', String(page))

  params.set('_limit', String(limit ?? PRODUCTS_PER_PAGE))

  const endpoint = `${API.PRODUCTS}?${params}`

  const { data, error, isLoading } = useSWR<ProductsResponse>(endpoint, paginatedFetcher)

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams)

    params.set('page', String(page))

    setSearchParams(params)
  }

  const totalItems = data?.totalItems ?? 0
  const pageSize = limit ?? PRODUCTS_PER_PAGE

  return {
    products: data?.data ?? [],
    totalItems,
    totalPages: Math.ceil(totalItems / pageSize),
    page,
    setPage,
    isLoading,
    error,
    filters: {
      category,
      search,
      sort,
      badge,
    },
  }
}
