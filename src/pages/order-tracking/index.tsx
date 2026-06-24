import { useParams } from 'react-router'
import PaymentSummary from '../../components/PaymentSummary'
import DeliveryBanner from './components/DeliveryBanner.tsx'
import HelpCard from '../../components/HelpCard'
import ItemsCard from '../../components/ItemsCard'
import OrderNotFound from './components/OrderNotFound.tsx'
import ShippingInfoCard from './components/ShippingInfoCard.tsx'
import TrackingTimeline from './components/TrackingTimeline.tsx'
import { formatCreatedAt } from '../../utils/format.ts'
import TwoColumnLayout from '../../components/TwoColumnLayout'
import Main from '../../components/Main'
import { useOrder } from '../../hooks/useOrder'
import { usePageTitle } from '../../hooks/usePageTitle'

const OrderTracking = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>()
  const { order, isLoading, notFound } = useOrder(orderNumber ?? '')

  usePageTitle(order ? `Pedido #${order.orderNumber}` : undefined)

  if (isLoading) return <Main>Cargando...</Main>
  if (notFound || !order) return <OrderNotFound orderNumber={orderNumber ?? ''} />

  const currentStep = order.tracking.steps.find((s) => s.status === 'current')

  return (
    <Main>
      <div className="flex mb-8">
        <div>
          <h1 className="text-4xl font-bold">Seguimiento de tu pedido</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-(--accent) font-medium">Pedido #{order.orderNumber}</span>
            <div className="size-1 rounded-full bg-muted" />
            <span className="text-sm text-muted">
              Realizado el {formatCreatedAt(order.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <TwoColumnLayout>
        <TwoColumnLayout.Main>
          <DeliveryBanner
            label={order.estimatedDelivery.label}
            currentStepDescription={currentStep?.description}
          />
          <TrackingTimeline
            steps={order.tracking.steps}
            trackingCode={order.shipping.trackingCode}
            carrier={order.shipping.carrier}
          />
          <ItemsCard
            title="Productos del pedido"
            items={order.items.map((item) => ({
              id: item.id,
              name: item.name,
              image: item.image,
              quantity: item.quantity,
              price: item.subtotal,
            }))}
          />
        </TwoColumnLayout.Main>

        <TwoColumnLayout.Sidebar>
          <ShippingInfoCard shippingAddress={order.shippingAddress} customer={order.customer} />
          <PaymentSummary
            subtotal={order.summary.subtotal}
            shipping={order.summary.shipping}
            total={order.summary.total}
          />
          <HelpCard />
        </TwoColumnLayout.Sidebar>
      </TwoColumnLayout>
    </Main>
  )
}

export default OrderTracking
