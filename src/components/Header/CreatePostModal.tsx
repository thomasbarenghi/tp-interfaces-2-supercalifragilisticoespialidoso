import { useState } from 'react'
import { Link } from '@heroui/react'
import { usePost } from '../../hooks/usePost.ts'
import PostFormFields from '../../components/PostFormFields'
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
  const { createPost, isCreating, createError } = usePost()
  const [isOpen, setIsOpen] = useState(false)

  const { textValues, setTextField, image, setImage, imagePreview } = useModalImageForm({
    isOpen,
    initialTextValues: { description: '' },
    initialImageUrl: null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!image) return

    await createPost({
      description: textValues.description,
      image,
    })

    setIsOpen(false)
    onSuccess?.()
  }

  return (
    <FormModalShell
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      title="Crear publicación"
      error={createError}
      onSubmit={handleSubmit}
      isSubmitting={isCreating}
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
