import type { Meta, StoryObj } from '@storybook/react-vite'
import Logo from '../index'

const meta: Meta<typeof Logo> = {
  component: Logo,
  title: 'Components/Logo',
}

export default meta
type Story = StoryObj<typeof Logo>

export const Default: Story = {}
