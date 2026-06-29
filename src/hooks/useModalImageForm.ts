import { useEffect, useState } from 'react'

type TextMap = Record<string, string>

interface UseModalImageFormParams<T extends TextMap> {
  isOpen: boolean
  initialTextValues: T
  initialImageUrl?: string | null
}

export const useModalImageForm = <T extends TextMap>({
  isOpen,
  initialTextValues,
  initialImageUrl = null,
}: UseModalImageFormParams<T>) => {
  const [textValues, setTextValues] = useState<T>(initialTextValues)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(initialImageUrl)

  useEffect(() => {
    if (!isOpen) return

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTextValues(initialTextValues)
    setImage(null)
    setImagePreview(initialImageUrl)
  }, [isOpen, initialImageUrl, ...Object.values(initialTextValues)])

  useEffect(() => {
    if (!image) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImagePreview(initialImageUrl)
      return
    }

    const objectUrl = URL.createObjectURL(image)
    setImagePreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [image, initialImageUrl])

  const setTextField = <K extends keyof T>(field: K, value: T[K]) => {
    setTextValues((current) => ({
      ...current,
      [field]: value,
    }))
  }

  return {
    textValues,
    setTextField,
    image,
    setImage,
    imagePreview,
  }
}
