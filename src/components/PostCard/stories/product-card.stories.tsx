import type { Meta, StoryObj } from '@storybook/react-vite'
import ProductCard from '../index'

const meta: Meta<typeof ProductCard> = {
  component: ProductCard,
  title: 'Components/PostCard',
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProductCard>

const base = {
  id: 'urban-wave-tee-off-white',
  slug: 'urban-wave-tee-off-white',
  name: 'Urban Wave Tee Off-White',
  category: 'remeras',
  price: 42500,
  badge: null,
  description: '',
  images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80'],
  totalStock: 10,
  rating: { average: 4.6, count: 183 },
  salesCount: 5400,
  features: [],
}

export const Default: Story = {
  args: { product: base },
}

export const WithBadgeNuevo: Story = {
  args: { product: { ...base, badge: 'nuevo' } },
}

export const WithBadgeDestacado: Story = {
  args: { product: { ...base, badge: 'destacado' } },
}

export const WithBadgeCapsula: Story = {
  args: {
    product: {
      ...base,
      id: 'vintage-denim-jacket-indigo',
      slug: 'vintage-denim-jacket-indigo',
      name: 'Vintage Denim Jacket Indigo',
      category: 'camperas',
      price: 259000,
      badge: 'capsula',
      images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80'],
    },
  },
}
