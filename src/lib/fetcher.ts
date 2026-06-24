export const fetcher = <T>(url: string): Promise<T> =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    return res.json() as Promise<T>
  })

export const paginatedFetcher = async (url: string) => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Error fetching data')
  }

  const data = await response.json()

  const totalItems = Number(response.headers.get('X-Total-Count')) || data.length

  return {
    data,
    totalItems,
  }
}
