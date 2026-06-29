import { Modal } from '@heroui/react'
import UserList from './UserList.tsx'
import type { FollowUser } from '../../../types/user.ts'

interface ConnectionsModalProps {
  title: string
  count: number
  users: FollowUser[]
}

const ConnectionsModal = ({ title, count, users }: ConnectionsModalProps) => {
  return (
    <Modal>
      <Modal.Trigger>
        <button className="cursor-pointer hover:underline">
          <strong>{count}</strong> {title.toLowerCase()}
        </button>
      </Modal.Trigger>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="w-full max-w-md rounded-xl bg-background shadow-2xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>{title}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <UserList users={users} />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default ConnectionsModal
