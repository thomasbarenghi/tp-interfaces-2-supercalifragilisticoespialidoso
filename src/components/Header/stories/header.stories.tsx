import type { Meta, StoryObj } from '@storybook/react-vite'
import Header from '../index'

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Components/Header',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {}
