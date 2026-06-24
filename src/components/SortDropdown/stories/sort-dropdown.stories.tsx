import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import SortDropdown from '../index'

const meta: Meta<typeof SortDropdown> = {
  component: SortDropdown,
  title: 'Components/SortDropdown',
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SortDropdown>

export const Default: Story = {}

export const PriceAsc: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/?sort=price-asc']}>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export const PriceDesc: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/?sort=price-desc']}>
        <Story />
      </MemoryRouter>
    ),
  ],
}
