import type { Meta, StoryObj } from '@storybook/react-vite'
import Footer from '../index'

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: 'Components/Footer',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {}
