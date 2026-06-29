import { Modal } from '@heroui/react'
import { useParams } from 'react-router'
import { usePost } from '../../hooks/usePost.ts'
import { useAuth } from '../../hooks/useAuth.ts'
import PostDetailContent from '../PostDetailContent'
import PostDetailSkeleton from '../../pages/post-detail/PostDetailSkeleton.tsx'

type PostDetailModalProps = {
  isOpen: boolean
  onClose: () => void
}

const PostDetailModal = ({ isOpen, onClose }: PostDetailModalProps) => {
  const { id } = useParams<{ id: string }>()
  const { post, isLoading } = usePost(id!)
  const { user } = useAuth()

  const isAuthor = user?._id === post?.author._id

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop />
      <Modal.Container>
        <Modal.Dialog className="w-full max-w-6xl rounded-2xl bg-background shadow-2xl">
          <Modal.CloseTrigger />
          <Modal.Body className="p-0">
            {isLoading ? (
              <div className="p-6">
                <PostDetailSkeleton />
              </div>
            ) : post ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[70vh]">
                <div className="bg-black">
                  <img
                    src={post.images[0]?.url}
                    alt={post.description}
                    className="w-full h-full object-cover max-h-[70vh]"
                  />
                </div>

                <div className="p-6 overflow-y-auto">
                  <PostDetailContent post={post} isAuthor={isAuthor} onClose={onClose} compact />
                </div>
              </div>
            ) : null}
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  )
}

export default PostDetailModal
