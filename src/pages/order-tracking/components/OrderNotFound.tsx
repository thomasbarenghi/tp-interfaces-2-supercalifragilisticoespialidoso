import { CircleXmark } from '@gravity-ui/icons'
import { useNavigate } from 'react-router'
import EmptyState from '../../../components/EmptyState'
import { ROUTES } from '../../../config/routes'

const OrderNotFound = ({ orderNumber }: { orderNumber: string }) => {
  const navigate = useNavigate()
  return (
    <EmptyState
      icon={<CircleXmark width={28} height={28} className="text-(--accent)" />}
      title="Pedido no encontrado"
      description={
        <>
          <p>No encontramos el pedido</p>
          <p className="font-medium text-(--accent)">{orderNumber}</p>
        </>
      }
      action={{ label: 'Buscar otro pedido', onClick: () => navigate(ROUTES.TRACKING) }}
    />
  )
}

export default OrderNotFound
