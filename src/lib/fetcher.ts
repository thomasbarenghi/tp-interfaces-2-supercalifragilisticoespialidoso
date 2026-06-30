export const fetcher = <T>(url: string): Promise<T> =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    return res.json() as Promise<T>
  })

export type PaginatedResponse<T> = {
  data: T
  pagination: {
    totalItems: number
    totalPages: number
    currentPage: number
    limit: number
  }
}

export const paginatedFetcher = async <T>(url: string): Promise<PaginatedResponse<T>> => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Error fetching data')
  }

  return response.json() as Promise<PaginatedResponse<T>>
}
