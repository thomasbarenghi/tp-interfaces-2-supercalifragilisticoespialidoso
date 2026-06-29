import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { usePageTitle } from '../../hooks/usePageTitle.ts'
import { useCreatePost } from '../../hooks/useCreatePost.ts'
import FormPageLayout from '../../components/FormPageLayout'
import PostFormFields from '../../components/PostFormFields'
import { ROUTES } from '../../config/routes.ts'

const CreatePost = () => {
  usePageTitle('Crear publicación')
  const navigate = useNavigate()
  const { createPost, isSubmitting, error } = useCreatePost()

  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (!image) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImagePreview(null)
      return
    }

    const objectUrl = URL.createObjectURL(image)
    setImagePreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [image])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!image) return

    const newPost = await createPost({ description, image })
    navigate(ROUTES.POST(newPost._id ?? newPost.id))
  }

  return (
    <FormPageLayout
      title="Crear publicación"
      subtitle="Compartí algo con el mundo"
      submitLabel="Publicar"
      isSubmitting={isSubmitting}
      error={error}
      onSubmit={handleSubmit}
    >
      <PostFormFields
        description={description}
        onDescriptionChange={setDescription}
        onImageChange={setImage}
        imagePreview={imagePreview}
        imageRequired
      />
    </FormPageLayout>
  )
}

export default CreatePost
