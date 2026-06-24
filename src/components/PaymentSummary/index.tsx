import { Button, Separator } from '@heroui/react'
import SectionCard from '../SectionCard'
import { formatPrice } from '../../utils/format.ts'

interface Props {
  subtotal: number
  shipping: number
  total: number
  showAction?: boolean
  isLoading?: boolean
  title?: string
  actionLabel?: string
  subtotalLabel?: string
  onAction?: () => void
}

const PaymentSummary = ({
  subtotal,
  shipping,
  total,
  showAction,
  isLoading,
  title = 'Resumen del pago',
  actionLabel = 'Pagar ahora',
  subtotalLabel = 'Subtotal',
  onAction,
}: Props) => (
  <SectionCard title={title}>
    <div className="flex flex-col gap-3">
      <div className="flex justify-between text-sm">
        <span>{subtotalLabel}</span>
        <span className="font-medium">{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Envío</span>
        <span className="font-medium text-success">
          {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
        </span>
      </div>
      <Separator />
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold">Total</span>
        <span className="text-2xl font-bold">{formatPrice(total)}</span>
      </div>
      {showAction && (
        <Button
          type={onAction ? 'button' : 'submit'}
          variant="primary"
          fullWidth
          className="mt-2 rounded-full"
          size="lg"
          isPending={isLoading}
          onPress={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  </SectionCard>
)

export default PaymentSummary
