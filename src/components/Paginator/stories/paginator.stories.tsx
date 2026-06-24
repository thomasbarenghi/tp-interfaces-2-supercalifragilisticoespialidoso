import type { Meta, StoryObj } from '@storybook/react-vite'
import Paginator from '../index'

const meta: Meta<typeof Paginator> = {
  component: Paginator,
  title: 'Components/Paginator',
  parameters: { layout: 'padded' },
  args: {
    page: 1,
    totalPages: 5,
    totalItems: 48,
    itemsPerPage: 10,
    onPageChange: () => {},
  },
}

export default meta
type Story = StoryObj<typeof Paginator>

export const FirstPage: Story = {}

export const MiddlePage: Story = {
  args: { page: 3 },
}

export const LastPage: Story = {
  args: { page: 5 },
}

export const SinglePage: Story = {
  args: { totalPages: 1, totalItems: 6, itemsPerPage: 10 },
}
