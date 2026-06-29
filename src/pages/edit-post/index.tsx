import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { usePageTitle } from '../../hooks/usePageTitle.ts'
import { usePost } from '../../hooks/usePost.ts'
import { useEditPost } from '../../hooks/useEditPost.ts'
import Main from '../../components/Main'
import FormPageLayout from '../../components/FormPageLayout'
import PostFormFields from '../../components/PostFormFields'
import { ROUTES } from '../../config/routes.ts'

const EditPost = () => {
  usePageTitle('Editar publicación')
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { post, isLoading } = usePost(id!)
  const { editPost, isSubmitting, error } = useEditPost(id!)

  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!post || initialized) return

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDescription(post.description ?? '')
    setImagePreview(post.images?.[0]?.url ?? null)
    setInitialized(true)
  }, [post, initialized])

  useEffect(() => {
    if (!image) return

    const objectUrl = URL.createObjectURL(image)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImagePreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [image])

  if (isLoading) {
    return (
      <Main>
        <p className="text-center py-20">Cargando...</p>
      </Main>
    )
  }

  if (!post) {
    navigate(ROUTES.HOME, { replace: true })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await editPost({ description, image })
    navigate(ROUTES.POST(id!))
  }

  return (
    <FormPageLayout
      title="Editar publicación"
      subtitle="Porque equivocarnos no está mal"
      submitLabel="Guardar cambios"
      isSubmitting={isSubmitting}
      error={error}
      onSubmit={handleSubmit}
    >
      <PostFormFields
        description={description}
        onDescriptionChange={setDescription}
        onImageChange={setImage}
        imagePreview={imagePreview}
      />
    </FormPageLayout>
  )
}

export default EditPost
