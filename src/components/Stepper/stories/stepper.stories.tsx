import type { Meta, StoryObj } from '@storybook/react-vite'
import Stepper from '../index'

const meta: Meta<typeof Stepper> = {
  component: Stepper,
  title: 'Components/Stepper',
}

export default meta
type Story = StoryObj<typeof Stepper>

export const FirstStep: Story = {
  args: {
    steps: [
      { label: 'Carrito', status: 'current' },
      { label: 'Pago', status: 'pending' },
      { label: 'Confirmación', status: 'pending' },
    ],
  },
}

export const MiddleStep: Story = {
  args: {
    steps: [
      { label: 'Carrito', status: 'completed' },
      { label: 'Pago', status: 'current' },
      { label: 'Confirmación', status: 'pending' },
    ],
  },
}

export const Completed: Story = {
  args: {
    steps: [
      { label: 'Carrito', status: 'completed' },
      { label: 'Pago', status: 'completed' },
      { label: 'Confirmación', status: 'completed' },
    ],
  },
}
