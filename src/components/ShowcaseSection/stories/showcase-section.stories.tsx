import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from '@heroui/react'
import ShowcaseSection from '../index'

const meta: Meta<typeof ShowcaseSection> = {
  component: ShowcaseSection,
  title: 'Components/ShowcaseSection',
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof ShowcaseSection>

export const WithAction: Story = {
  render: () => (
    <ShowcaseSection>
      <ShowcaseSection.Header>
        <ShowcaseSection.Title eyebrow="CATEGORÍAS" title="Comprá por categoría" />
        <ShowcaseSection.Action>
          <Link
            className="underline underline-offset-2 text-foreground decoration-(--accent)"
            href="#"
          >
            Ver todo
            <Link.Icon className="text-(--accent)" />
          </Link>
        </ShowcaseSection.Action>
      </ShowcaseSection.Header>
      <ShowcaseSection.Content>
        <div className="h-40 bg-surface-secondary rounded-xl flex items-center justify-center text-muted text-sm">
          Contenido de la sección
        </div>
      </ShowcaseSection.Content>
    </ShowcaseSection>
  ),
}

export const WithoutAction: Story = {
  render: () => (
    <ShowcaseSection>
      <ShowcaseSection.Header>
        <ShowcaseSection.Title eyebrow="MÁS POPULARES" title="Lo más vendido esta semana" />
      </ShowcaseSection.Header>
      <ShowcaseSection.Content>
        <div className="h-40 bg-surface-secondary rounded-xl flex items-center justify-center text-muted text-sm">
          Contenido de la sección
        </div>
      </ShowcaseSection.Content>
    </ShowcaseSection>
  ),
}
