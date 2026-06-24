import type { Meta, StoryObj } from '@storybook/react-vite'
import HelpCard from '../index'

const meta: Meta<typeof HelpCard> = {
  component: HelpCard,
  title: 'Components/HelpCard',
}

export default meta
type Story = StoryObj<typeof HelpCard>

export const Default: Story = {}
