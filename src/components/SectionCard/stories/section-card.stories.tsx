import type { Meta, StoryObj } from '@storybook/react-vite'
import SectionCard from '../index'

const meta: Meta<typeof SectionCard> = {
  component: SectionCard,
  title: 'Components/SectionCard',
}

export default meta
type Story = StoryObj<typeof SectionCard>

export const WithBadge: Story = {
  args: {
    n: '1',
    title: 'Información de contacto',
    children: <p className="text-sm text-muted">Contenido de la sección</p>,
  },
}

export const WithoutBadge: Story = {
  args: {
    title: 'Resumen del pedido',
    children: <p className="text-sm text-muted">Contenido de la sección</p>,
  },
}
