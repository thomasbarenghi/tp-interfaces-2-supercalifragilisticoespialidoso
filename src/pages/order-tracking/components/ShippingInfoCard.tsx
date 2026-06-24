import { Separator } from '@heroui/react'
import SectionCard from '../../../components/SectionCard'
import type { Order } from '../../../types/order.ts'

interface Props {
  shippingAddress: Order['shippingAddress']
  customer: Order['customer']
}

const ShippingInfoCard = ({ shippingAddress, customer }: Props) => (
  <SectionCard title="Información de envío">
    <div className="flex flex-col gap-0">
      <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5">Dirección</p>
      <p className="text-sm text-foreground">
        {shippingAddress.firstName} {shippingAddress.lastName}
      </p>
      <p className="text-sm text-foreground">{shippingAddress.address}</p>
      <p className="text-sm text-foreground">
        {shippingAddress.city}, {shippingAddress.province} {shippingAddress.postalCode}
      </p>
      <Separator className="my-4" />
      <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5">Contacto</p>
      <p className="text-sm text-foreground">{customer.email}</p>
      <p className="text-sm text-foreground">{customer.phone}</p>
    </div>
  </SectionCard>
)

export default ShippingInfoCard
