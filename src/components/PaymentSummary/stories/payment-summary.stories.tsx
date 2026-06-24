import type { Meta, StoryObj } from '@storybook/react-vite'
import PaymentSummary from '../index'

const meta: Meta<typeof PaymentSummary> = {
  component: PaymentSummary,
  title: 'Components/PaymentSummary',
  args: {
    subtotal: 503900,
    shipping: 0,
    total: 503900,
  },
}

export default meta
type Story = StoryObj<typeof PaymentSummary>

export const WithFreeShipping: Story = {}

export const WithShippingCost: Story = {
  args: {
    shipping: 5000,
    total: 508900,
  },
}

export const WithAction: Story = {
  args: { showAction: true },
}
