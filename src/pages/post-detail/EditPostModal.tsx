import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@heroui/react'
import { useEditPost } from '../../hooks/useEditPost.ts'
import PostFormFields from '../../components/PostFormFields'
import { useDeletePost } from '../../hooks/useDeletePost.ts'
import { ROUTES } from '../../config/routes.ts'
import type { Tag } from '../../types/tag.ts'
import FormModalShell from '../../components/FormModalShell'
import { useModalImageForm } from '../../hooks/useModalImageForm'

interface EditPostModalProps {
  postId: string
  initialDescription: string
  initialImageUrl?: string | null
  triggerLabel?: string
  onSuccess?: () => void
  postTags: Tag[]
}

const EditPostModal = ({
  postId,
  initialDescription,
  initialImageUrl = null,
  triggerLabel = 'Editar',
  onSuccess,
  postTags,
}: EditPostModalProps) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const { editPost, isSubmitting, error } = useEditPost(postId)
  const { deletePost, isSubmitting: isDeleting } = useDeletePost()

  const { textValues, setTextField, image, setImage, imagePreview } = useModalImageForm({
    isOpen,
    initialTextValues: { description: initialDescription },
    initialImageUrl,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await editPost({
      description: textValues.description,
      image,
    })

    setIsOpen(false)
    onSuccess?.()
  }

  const handleDelete = async () => {
    await deletePost({ postId })
    navigate(ROUTES.OWN_PROFILE)
  }

  return (
    <FormModalShell
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      title="Editar publicación"
      error={error}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel="Guardar cambios"
      secondaryAction={
        <Button type="button" variant="outline" onClick={handleDelete} isPending={isDeleting}>
          Eliminar
        </Button>
      }
      trigger={
        <Button variant="outline" className="font-medium" onClick={() => setIsOpen(true)}>
          {triggerLabel}
        </Button>
      }
    >
      <PostFormFields
        isEdit={true}
        description={textValues.description}
        onDescriptionChange={(value) => setTextField('description', value)}
        onImageChange={setImage}
        imagePreview={imagePreview}
        postId={postId}
        postTags={postTags}
      />
    </FormModalShell>
  )
}

export default EditPostModal
