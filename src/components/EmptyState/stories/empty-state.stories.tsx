import type { Meta, StoryObj } from '@storybook/react-vite'
import { CircleXmark, ShoppingCart } from '@gravity-ui/icons'
import EmptyState from '../index'

const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
  title: 'Components/EmptyState',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const EmptyCart: Story = {
  args: {
    icon: <ShoppingCart width={28} height={28} className="text-(--accent)" />,
    title: 'Tu carrito está vacío',
    description: 'Explorá nuestra tienda y encontrá algo que te guste.',
    action: { label: 'Ver productos', onClick: () => {} },
  },
}

export const OrderNotFound: Story = {
  args: {
    icon: <CircleXmark width={28} height={28} className="text-(--accent)" />,
    title: 'Pedido no encontrado',
    description: 'No encontramos ningún pedido con ese número.',
    action: { label: 'Buscar otro pedido', onClick: () => {} },
  },
}
