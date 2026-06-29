import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Alert, Button, Link, Modal } from '@heroui/react'
import { useCreatePost } from '../../hooks/useCreatePost.ts'
import PostFormFields from '../../components/PostFormFields'
import { ROUTES } from '../../config/routes.ts'

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
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) return

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDescription('')
    setImage(null)
    setImagePreview(null)
  }, [isOpen])

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

    setIsOpen(false)
    onSuccess?.()

    navigate(ROUTES.POST(newPost._id ?? newPost.id))
  }

  return (
    <>
      <Link
        className="underline decoration-(--accent) text-(--foreground)"
        onClick={() => setIsOpen(true)}
      >
        {triggerLabel}
        <Link.Icon className="text-(--accent)" />
      </Link>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="w-full max-w-2xl rounded-2xl bg-background shadow-2xl">
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Heading>Crear publicación</Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-2">
                  {error && <Alert status="danger">{error}</Alert>}

                  <PostFormFields
                    isEdit={false}
                    postId=""
                    description={description}
                    onDescriptionChange={setDescription}
                    onImageChange={setImage}
                    imagePreview={imagePreview}
                    imageRequired
                  />

                  <div className="flex justify-end gap-3 pt-2">
                    <Button type="submit" isPending={isSubmitting}>
                      Publicar
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

export default CreatePostModal
