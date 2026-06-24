import useSWR from 'swr'
import { fetcher } from '../lib/fetcher'
import { API } from '../config/api'
import type { Order } from '../types/order'

export const useOrder = (orderNumber: string) => {
  const { data, isLoading, error } = useSWR<Order[]>(
    orderNumber ? API.ORDER_BY_NUMBER(orderNumber) : null,
    fetcher,
  )

  return {
    order: data?.[0] ?? null,
    isLoading,
    notFound: !isLoading && !error && data !== undefined && data.length === 0,
    error,
  }
}
