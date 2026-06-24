import type { Meta, StoryObj } from '@storybook/react-vite'
import CartItemCard from '../index'

const meta: Meta<typeof CartItemCard> = {
  component: CartItemCard,
  title: 'Components/CartItemCard',
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onIncrement: () => {},
    onDecrement: () => {},
    onRemove: () => {},
  },
}

export default meta
type Story = StoryObj<typeof CartItemCard>

const base = {
  id: 'cart-1',
  productId: 'urban-wave-tee-off-white',
  name: 'Urban Wave Tee Off-White',
  category: 'remeras',
  image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
  quantity: 1,
  stock: 10,
  unitPrice: 42500,
  price: 42500,
}

export const Default: Story = {
  args: { item: base },
}

export const MultipleQuantity: Story = {
  args: { item: { ...base, quantity: 3, price: 127500 } },
}

export const AtMaxStock: Story = {
  args: { item: { ...base, quantity: 2, stock: 2 } },
}

export const Loading: Story = {
  args: {
    isLoading: true,
    item: {
      id: '1',
      productId: '',
      name: '',
      category: '',
      image: '',
      quantity: 1,
      stock: 0,
      unitPrice: 0,
      price: 0,
    },
  },
}
