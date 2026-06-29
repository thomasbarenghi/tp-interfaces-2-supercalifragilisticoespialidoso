import { Button, Modal } from '@heroui/react'
import type { ReactNode } from 'react'

interface ConfirmationModalProps {
  trigger: ReactNode
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  isLoading?: boolean
  onConfirm: () => void | Promise<void>
}

const ConfirmationModal = ({
  trigger,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  isLoading = false,
  onConfirm,
}: ConfirmationModalProps) => {
  return (
    <Modal>
      <Modal.Trigger>{trigger}</Modal.Trigger>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="w-full max-w-md rounded-2xl bg-background shadow-2xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>{title}</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <div className="space-y-4 text-foreground">
                {description && <p className="text-sm">{description}</p>}

                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="ghost" isDisabled={isLoading} slot="close">
                    {cancelLabel}
                  </Button>

                  <Button isPending={isLoading} onPress={onConfirm}>
                    {confirmLabel}
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default ConfirmationModal
