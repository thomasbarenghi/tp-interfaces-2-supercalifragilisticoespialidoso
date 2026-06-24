import type { Meta, StoryObj } from '@storybook/react-vite'
import TwoColumnLayout from '../index'

const Placeholder = ({ label }: { label: string }) => (
  <div className="bg-surface-secondary rounded-xl p-6 text-sm text-muted text-center">{label}</div>
)

const meta: Meta<typeof TwoColumnLayout> = {
  component: TwoColumnLayout,
  title: 'Components/TwoColumnLayout',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="p-10">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TwoColumnLayout>

export const GapMd: Story = {
  args: { gap: 'md' },
  render: (args) => (
    <TwoColumnLayout {...args}>
      <TwoColumnLayout.Main>
        <Placeholder label="Columna principal" />
        <Placeholder label="Columna principal" />
      </TwoColumnLayout.Main>
      <TwoColumnLayout.Sidebar>
        <Placeholder label="Sidebar" />
        <Placeholder label="Sidebar" />
      </TwoColumnLayout.Sidebar>
    </TwoColumnLayout>
  ),
}

export const GapXl: Story = {
  args: { gap: 'xl' },
  render: (args) => (
    <TwoColumnLayout {...args}>
      <TwoColumnLayout.Main>
        <Placeholder label="Columna principal" />
        <Placeholder label="Columna principal" />
      </TwoColumnLayout.Main>
      <TwoColumnLayout.Sidebar>
        <Placeholder label="Sidebar" />
        <Placeholder label="Sidebar" />
      </TwoColumnLayout.Sidebar>
    </TwoColumnLayout>
  ),
}
