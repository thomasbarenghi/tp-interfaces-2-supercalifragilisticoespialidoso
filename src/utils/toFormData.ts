type FormDataValue = string | Blob | null | undefined

export const toFormData = (fields: Record<string, FormDataValue>) => {
  const formData = new FormData()

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      formData.append(key, value)
    }
  })

  return formData
}
