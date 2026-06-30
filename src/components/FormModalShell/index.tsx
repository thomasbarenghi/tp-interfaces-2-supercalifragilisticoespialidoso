import { Alert, Button, Modal } from '@heroui/react'
import type { ReactNode } from 'react'

interface FormModalShellProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
  trigger: ReactNode
  onSubmit: (e: React.FormEvent) => void | Promise<void>
  submitLabel: string
  isSubmitting?: boolean
  error?: string | null
  secondaryAction?: ReactNode
  children: ReactNode
}

const FormModalShell = ({
  isOpen,
  onOpenChange,
  title,
  trigger,
  onSubmit,
  submitLabel,
  isSubmitting = false,
  error,
  secondaryAction,
  children,
}: FormModalShellProps) => {
  return (
    <>
      {trigger}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="w-full max-w-2xl rounded-2xl bg-background shadow-2xl">
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Heading>{title}</Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                <form onSubmit={onSubmit} className="flex flex-col gap-5 pt-2">
                  {error && <Alert status="danger">{error}</Alert>}

                  {children}

                  <div className="flex justify-end gap-3 pt-2">
                    {secondaryAction}
                    <Button type="submit" isPending={isSubmitting}>
                      {submitLabel}
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

export default FormModalShell
