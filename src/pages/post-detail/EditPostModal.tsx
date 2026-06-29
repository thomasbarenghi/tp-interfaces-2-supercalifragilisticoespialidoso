import { useEffect, useState } from 'react'
import { Alert, Button, Modal } from '@heroui/react'
import { useEditPost } from '../../hooks/useEditPost.ts'
import PostFormFields from '../../components/PostFormFields'
import { useDeletePost } from '../../hooks/useDeletePost.ts'
import { ROUTES } from '../../config/routes.ts'
import { useNavigate } from 'react-router'
import type { Tag } from '../../types/tag.ts'

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
  const id = postId
  const [isOpen, setIsOpen] = useState(false)
  const { editPost, isSubmitting, error } = useEditPost(postId)

  const [description, setDescription] = useState(initialDescription)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(initialImageUrl)
  const { deletePost, isSubmitting: isDeleting } = useDeletePost()

  useEffect(() => {
    if (!isOpen) return

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDescription(initialDescription)
    setImage(null)
    setImagePreview(initialImageUrl)
  }, [isOpen, initialDescription, initialImageUrl])

  useEffect(() => {
    if (!image) return

    const objectUrl = URL.createObjectURL(image)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImagePreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [image])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await editPost({ description, image })

    setIsOpen(false)
    onSuccess?.()
  }

  const handleDelete = async () => {
    await deletePost({ postId: id! })
    console.log('eliminado')
    navigate(ROUTES.OWN_PROFILE)
  }

  return (
    <>
      <Button variant="outline" className="font-medium" onClick={() => setIsOpen(true)}>
        {triggerLabel}
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="w-full max-w-2xl rounded-2xl bg-background shadow-2xl">
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Heading>Editar publicación</Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-2">
                  {error && <Alert status="danger">{error}</Alert>}

                  <PostFormFields
                    isEdit={true}
                    description={description}
                    onDescriptionChange={setDescription}
                    onImageChange={setImage}
                    imagePreview={imagePreview}
                    postId={postId}
                    postTags={postTags}
                  />

                  <div className="flex justify-end gap-3 pt-2">
                    <Button type="submit" isPending={isSubmitting}>
                      Guardar cambios
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleDelete}
                      isPending={isDeleting}
                    >
                      Eliminar
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  )
}

export default EditPostModal
