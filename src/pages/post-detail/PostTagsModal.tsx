import { Button, Modal } from '@heroui/react'
import { usePostTags } from '../../hooks/usePostTags.ts'
import type { Tag } from '../../types/tag.ts'
import { Plus, Xmark } from '@gravity-ui/icons'

interface PostTagsModalProps {
  postId: string
  postTags: Tag[]
}

const PostTagsModal = ({ postId, postTags }: PostTagsModalProps) => {
  const { tags, isLoadingTags, isSubmitting, addTagToPost, removeTagFromPost } = usePostTags(postId)

  const selectedTagIds = new Set(postTags.map((tag) => tag._id))

  return (
    <Modal>
      <Modal.Trigger>
        <Button variant="ghost">Administrar tags</Button>
      </Modal.Trigger>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="w-full max-w-lg rounded-2xl bg-background shadow-2xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Tags del post</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              {isLoadingTags ? (
                <p>Cargando tags...</p>
              ) : (
                <div className="space-y-4 text-foreground">
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Tags actuales</h3>
                    <div className="flex flex-wrap gap-2">
                      {postTags.length === 0 ? (
                        <p className="text-sm text-neutral-500">No tiene tags asignados.</p>
                      ) : (
                        postTags.map((tag) => (
                          <div
                            key={tag._id}
                            className="flex items-center gap-1 rounded-full border px-3 py-1 text-sm"
                          >
                            <span>{tag.name}</span>
                            <Button
                              isDisabled={isSubmitting}
                              size="sm"
                              variant="ghost"
                              isIconOnly
                              className="hover:bg-transparent p-0 h-4 w-4"
                              onClick={() => removeTagFromPost(tag._id)}
                            >
                              <Xmark className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium">Agregar tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags
                        .filter((tag) => !selectedTagIds.has(tag._id))
                        .map((tag) => (
                          <Button
                            key={tag._id}
                            size="sm"
                            variant="outline"
                            isDisabled={isSubmitting}
                            onClick={() => addTagToPost(tag._id)}
                          >
                            <Plus className="h-4 w-4" /> {tag.name}
                          </Button>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default PostTagsModal
