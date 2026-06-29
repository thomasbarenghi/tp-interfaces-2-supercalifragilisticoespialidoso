import { Alert, Button, Card } from '@heroui/react'
import Main from '../Main'
import ConfirmationModal from '../ConfirmationModal'

interface FormPageLayoutProps {
  title: string
  subtitle?: string
  submitLabel: string
  isSubmitting?: boolean
  error?: string | null
  onSubmit: (e: React.FormEvent) => void
  children: React.ReactNode

  // nuevas props
  onDelete?: () => void
  isDeleting?: boolean
}

const FormPageLayout = ({
  title,
  subtitle,
  submitLabel,
  isSubmitting = false,
  error,
  onSubmit,
  children,
  onDelete,
  isDeleting = false,
}: FormPageLayoutProps) => (
  <Main>
    <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="text-red-500 mt-1">{subtitle}</p>}
      </div>

      <Card className="w-full">
        <Card.Content>
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            {error && <Alert status="danger">{error}</Alert>}

            {children}

            <div className="flex flex-row gap-2">
              <Button
                type="submit"
                className="w-full bg-red-500 text-white font-semibold py-3 rounded-full"
                isDisabled={isSubmitting || isDeleting}
              >
                {isSubmitting ? 'Guardando...' : submitLabel}
              </Button>

              {onDelete && (
                <ConfirmationModal
                  trigger={
                    <Button type="button" variant="outline">
                      Eliminar
                    </Button>
                  }
                  title="Eliminar"
                  description="¿Seguro que querés eliminar esto?"
                  confirmLabel="Eliminar"
                  isLoading={isDeleting}
                  onConfirm={onDelete}
                />
              )}
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  </Main>
)

export default FormPageLayout
