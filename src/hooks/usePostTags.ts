import { useEffect, useMemo, useState } from 'react'
import { useSWRConfig } from 'swr'
import { API } from '../config/api'
import type { Tag } from '../types/tag.ts'

export const usePostTags = (postId: string) => {
  const { mutate } = useSWRConfig()

  const [tags, setTags] = useState<Tag[]>([])
  const [isLoadingTags, setIsLoadingTags] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const postKey = useMemo(() => API.POST_BY_ID(postId), [postId])

  const revalidatePost = () => mutate(postKey)

  const withSubmission = async <T>(fn: () => Promise<T>) => {
    setIsSubmitting(true)
    try {
      return await fn()
    } finally {
      setIsSubmitting(false)
    }
  }

  const loadTags = async () => {
    setIsLoadingTags(true)
    try {
      const res = await fetch(API.TAGS)
      if (!res.ok) throw new Error('Error al cargar tags')

      const data = await res.json()
      setTags(Array.isArray(data) ? data : (data.tags ?? []))
    } finally {
      setIsLoadingTags(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadTags()
  }, [])

  const addTagToPost = (tagId: string) =>
    withSubmission(async () => {
      const res = await fetch(API.POST_TAG(postId, tagId), {
        method: 'POST',
      })

      if (!res.ok) throw new Error('Error al agregar tag')

      await revalidatePost()
    })

  const removeTagFromPost = (tagId: string) =>
    withSubmission(async () => {
      const res = await fetch(API.POST_TAG(postId, tagId), {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Error al quitar tag')

      await revalidatePost()
    })

  return {
    tags,
    isLoadingTags,
    isSubmitting,
    loadTags,
    addTagToPost,
    removeTagFromPost,
  }
}
