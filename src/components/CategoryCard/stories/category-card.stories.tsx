import type { Meta, StoryObj } from '@storybook/react-vite'
import CategoryCard from '../index'

const meta: Meta<typeof CategoryCard> = {
  component: CategoryCard,
  title: 'Components/CategoryCard',
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
type Story = StoryObj<typeof CategoryCard>

export const Light: Story = {
  args: {
    title: 'Remeras',
    count: 120,
    slug: 'remeras',
    bg: 'bg-zinc-100 dark:bg-zinc-800',
    text: 'text-zinc-900 dark:text-white',
    muted: 'text-zinc-500 dark:text-zinc-400',
  },
}

export const Dark: Story = {
  args: {
    title: 'Camperas',
    count: 45,
    slug: 'camperas',
    bg: 'bg-black dark:bg-zinc-800',
    text: 'text-white',
    muted: 'text-zinc-300',
  },
}

export const Accent: Story = {
  args: {
    title: 'Zapatillas',
    count: 60,
    slug: 'zapatillas',
    bg: 'bg-red-600',
    text: 'text-white',
    muted: 'text-red-100',
  },
}
