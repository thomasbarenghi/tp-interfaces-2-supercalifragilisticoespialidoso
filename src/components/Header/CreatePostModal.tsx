import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from '@heroui/react'
import { useCreatePost } from '../../hooks/useCreatePost.ts'
import PostFormFields from '../../components/PostFormFields'
import { ROUTES } from '../../config/routes.ts'
import FormModalShell from '../../components/FormModalShell'
import { useModalImageForm } from '../../hooks/useModalImageForm'

interface CreatePostModalProps {
  triggerLabel?: string
  onSuccess?: () => void
}

const CreatePostModal = ({
  triggerLabel = 'Crear publicación',
  onSuccess,
}: CreatePostModalProps) => {
  const navigate = useNavigate()
  const { createPost, isSubmitting, error } = useCreatePost()
  const [isOpen, setIsOpen] = useState(false)

  const { textValues, setTextField, image, setImage, imagePreview } = useModalImageForm({
    isOpen,
    initialTextValues: { description: '' },
    initialImageUrl: null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!image) return

    const newPost = await createPost({
      description: textValues.description,
      image,
    })

    setIsOpen(false)
    onSuccess?.()
    navigate(ROUTES.POST(newPost._id ?? newPost.id))
  }

  return (
    <FormModalShell
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      title="Crear publicación"
      error={error}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel="Publicar"
      trigger={
        <Link
          className="underline decoration-(--accent) text-(--foreground)"
          onClick={() => setIsOpen(true)}
        >
          {triggerLabel}
          <Link.Icon className="text-(--accent)" />
        </Link>
      }
    >
      <PostFormFields
        isEdit={false}
        postId=""
        description={textValues.description}
        onDescriptionChange={(value) => setTextField('description', value)}
        onImageChange={setImage}
        imagePreview={imagePreview}
        imageRequired
      />
    </FormModalShell>
  )
}

export default CreatePostModal
