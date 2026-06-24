import type { Meta, StoryObj } from '@storybook/react-vite'
import ProductItemRow from '../index'

const meta: Meta<typeof ProductItemRow> = {
  component: ProductItemRow,
  title: 'Components/ProductItemRow',
  args: {
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200',
    name: 'Wild West Vest Black Denim',
    subtitle: 'Cant. 1',
    price: 329000,
  },
}

export default meta
type Story = StoryObj<typeof ProductItemRow>

export const Small: Story = {
  args: { size: 'sm' },
}

export const Large: Story = {
  args: { size: 'lg' },
}
