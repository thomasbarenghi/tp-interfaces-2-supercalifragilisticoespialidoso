import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRotateLeft } from '@gravity-ui/icons'
import FeatureCard from '../index'

const meta: Meta<typeof FeatureCard> = {
  component: FeatureCard,
  title: 'Components/FeatureCard',
}

export default meta
type Story = StoryObj<typeof FeatureCard>

export const Default: Story = {
  args: {
    icon: <ArrowRotateLeft width={18} height={18} />,
    title: 'Cambios y devoluciones gratis',
    description: 'Tenés 30 días desde la entrega para gestionar tu cambio sin costo.',
  },
}
