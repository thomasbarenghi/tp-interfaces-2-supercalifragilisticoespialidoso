import type { Meta, StoryObj } from '@storybook/react-vite'
import { Comment } from '@gravity-ui/icons'
import InfoCard from '../index'

const meta: Meta<typeof InfoCard> = {
  component: InfoCard,
  title: 'Components/InfoCard',
}

export default meta
type Story = StoryObj<typeof InfoCard>

export const Default: Story = {
  args: {
    icon: <Comment width={18} height={18} className="text-(--accent)" />,
    title: 'Necesito ayuda',
    description: 'Hablá con nuestro equipo',
  },
}
