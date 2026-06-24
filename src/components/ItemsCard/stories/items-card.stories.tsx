import type { Meta, StoryObj } from '@storybook/react-vite'
import ItemsCard from '../index'

const meta: Meta<typeof ItemsCard> = {
  component: ItemsCard,
  title: 'Components/ItemsCard',
}

export default meta
type Story = StoryObj<typeof ItemsCard>

export const Default: Story = {
  args: {
    title: 'Tu pedido',
    items: [
      {
        id: '1',
        name: 'Wild West Vest Black Denim',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200',
        quantity: 1,
        price: 329000,
      },
      {
        id: '2',
        name: 'Urban Cargo Pants',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200',
        quantity: 2,
        price: 174950,
      },
    ],
  },
}
