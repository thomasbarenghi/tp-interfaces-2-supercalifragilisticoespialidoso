import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import MobileMenu from '../index'

const meta: Meta<typeof MobileMenu> = {
  component: MobileMenu,
  title: 'Components/MobileMenu',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MobileMenu>

const NAV_ITEMS = [
  { text: 'Todo', href: '/list', underline: false, icon: false },
  { text: 'Remeras', href: '/list?category=remeras', underline: false, icon: false },
  { text: 'Pantalones', href: '/list?category=pantalones', underline: false, icon: false },
  { text: 'Camperas', href: '/list?category=camperas', underline: false, icon: false },
  { text: 'Seguir mi compra', href: '/tracking', underline: true, icon: true },
]

export const Open: Story = {
  render: () => (
    <MobileMenu open={true} onClose={() => {}}>
      <MobileMenu.Search onSubmit={() => {}} />
      <MobileMenu.Nav>
        {NAV_ITEMS.map((item) => (
          <MobileMenu.NavItem
            key={item.text}
            href={item.href}
            underline={item.underline}
            icon={item.icon}
          >
            {item.text}
          </MobileMenu.NavItem>
        ))}
      </MobileMenu.Nav>
    </MobileMenu>
  ),
}

export const Closed: Story = {
  render: () => (
    <MobileMenu open={false} onClose={() => {}}>
      <MobileMenu.Search onSubmit={() => {}} />
      <MobileMenu.Nav>
        {NAV_ITEMS.map((item) => (
          <MobileMenu.NavItem key={item.text} href={item.href}>
            {item.text}
          </MobileMenu.NavItem>
        ))}
      </MobileMenu.Nav>
    </MobileMenu>
  ),
}
