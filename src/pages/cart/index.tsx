import { useNavigate } from 'react-router'
import { ShoppingCart } from '@gravity-ui/icons'
import Main from '../../components/Main'
import EmptyState from '../../components/EmptyState'
import TwoColumnLayout from '../../components/TwoColumnLayout'
import PaymentSummary from '../../components/PaymentSummary'
import { useEnrichedCart } from '../../hooks/useEnrichedCart'
import { usePageTitle } from '../../hooks/usePageTitle'
import { ROUTES } from '../../config/routes'
import CartItemCard from '../../components/CartItemCard'

const SKELETON_ITEMS = [{ id: '1' }, { id: '2' }, { id: '3' }]

const Cart = () => {
  usePageTitle('Mi carrito')
  const navigate = useNavigate()
  const { items, subtotal, totalItems, isEmpty, isLoading, addItem, decrementItem, removeItem } =
    useEnrichedCart()

  if (isEmpty) {
    return (
      <EmptyState
        icon={<ShoppingCart width={24} height={24} className="text-(--accent)" />}
        title="Tu carrito está vacío"
        description="Explorá nuestros productos y agregá lo que más te guste."
        action={{ label: 'Ver productos', onClick: () => navigate(ROUTES.LIST) }}
      />
    )
  }

  return (
    <Main>
      <h1 className="mb-8 text-2xl font-medium sm:text-3xl lg:text-4xl">Tu carrito</h1>

      <TwoColumnLayout>
        <TwoColumnLayout.Main>
          {isLoading
            ? SKELETON_ITEMS.map((s) => (
                <CartItemCard
                  key={s.id}
                  isLoading
                  item={{
                    id: s.id,
                    productId: '',
                    name: '',
                    category: '',
                    image: '',
                    quantity: 1,
                    stock: Infinity,
                    unitPrice: 0,
                    price: 0,
                  }}
                  onIncrement={() => {}}
                  onDecrement={() => {}}
                  onRemove={() => {}}
                />
              ))
            : items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onIncrement={() => addItem(item.productId)}
                  onDecrement={() => decrementItem(item.productId)}
                  onRemove={() => removeItem(item.productId)}
                />
              ))}
        </TwoColumnLayout.Main>

        <TwoColumnLayout.Sidebar>
          <PaymentSummary
            subtotal={subtotal}
            shipping={0}
            total={subtotal}
            showAction
            title="Resumen de compra"
            actionLabel="Continuar al pago"
            subtotalLabel={`Subtotal (${totalItems} ${totalItems === 1 ? 'producto' : 'productos'})`}
            onAction={() => navigate(ROUTES.CHECKOUT)}
          />
        </TwoColumnLayout.Sidebar>
      </TwoColumnLayout>
    </Main>
  )
}

export default Cart
