import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import ProductGrid from '../index'

const meta: Meta<typeof ProductGrid> = {
  component: ProductGrid,
  title: 'Components/PostGrid',
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProductGrid>

const mockProducts = [
  {
    id: '1',
    slug: 'urban-wave-tee',
    name: 'Urban Wave Tee Off-White',
    category: 'remeras',
    price: 42500,
    badge: 'nuevo',
    description: '',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80'],
    totalStock: 10,
    rating: { average: 4.6, count: 183 },
    salesCount: 5400,
    features: [],
  },
  {
    id: '2',
    slug: 'cargo-pant',
    name: 'Cargo Pant Olive Drab',
    category: 'pantalones',
    price: 89900,
    badge: null,
    description: '',
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80'],
    totalStock: 12,
    rating: { average: 4.7, count: 312 },
    salesCount: 7100,
    features: [],
  },
  {
    id: '3',
    slug: 'vintage-denim',
    name: 'Vintage Denim Jacket Indigo',
    category: 'camperas',
    price: 259000,
    badge: 'capsula',
    description: '',
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80'],
    totalStock: 6,
    rating: { average: 4.9, count: 421 },
    salesCount: 11500,
    features: [],
  },
  {
    id: '4',
    slug: 'minimal-tee',
    name: 'Minimal Tee Slate Grey',
    category: 'remeras',
    price: 38000,
    badge: null,
    description: '',
    images: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80'],
    totalStock: 30,
    rating: { average: 4.5, count: 95 },
    salesCount: 3200,
    features: [],
  },
]

export const Default: Story = {
  args: { products: mockProducts },
}

export const Loading: Story = {
  args: { products: [], isLoading: true, skeletonCount: 8 },
}

export const FewItems: Story = {
  args: { products: mockProducts.slice(0, 2) },
}
