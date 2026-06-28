import { useState } from 'react'

type AsyncFn<TArgs extends unknown[], TResult> = (...args: TArgs) => Promise<TResult>

export const useAsyncAction = <TArgs extends unknown[], TResult>(fn: AsyncFn<TArgs, TResult>) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const run = async (...args: TArgs) => {
    setIsSubmitting(true)
    setError(null)

    try {
      return await fn(...args)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido'
      setError(message)
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }

  return { run, isSubmitting, error }
}
