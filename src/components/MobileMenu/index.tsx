import { Link } from '@heroui/react'
import { Xmark } from '@gravity-ui/icons'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import Logo from '../Logo'
import { ROUTES } from '../../config/routes'

interface RootProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

const Root = ({ open, onClose, children }: RootProps) => (
  <div
    className={clsx(
      'fixed inset-0 z-50 flex flex-col bg-(--background) transition-all duration-300 ease-in-out xl:hidden',
      open
        ? 'opacity-100 translate-y-0 pointer-events-auto'
        : 'opacity-0 -translate-y-4 pointer-events-none',
    )}
  >
    <div className="flex items-center justify-between px-6 py-4 border-b border-current/10">
      <Link href={ROUTES.HOME} className="no-underline text-foreground" onPress={onClose}>
        <Logo />
      </Link>
      <button onClick={onClose} aria-label="Cerrar menú" className="p-1">
        <Xmark width={20} height={20} />
      </button>
    </div>
    <div className="flex flex-col gap-6 px-6 py-8 overflow-y-auto">{children}</div>
  </div>
)

const Nav = ({ children }: { children: ReactNode }) => (
  <ul className="flex flex-col gap-1">{children}</ul>
)

interface NavItemProps {
  href: string
  underline?: boolean
  icon?: boolean
  onPress?: () => void
  children: ReactNode
}

const NavItem = ({ href, underline, icon, onPress, children }: NavItemProps) => (
  <li>
    <Link
      href={href}
      onPress={onPress}
      className={clsx(
        'py-3 text-lg block w-full border-b border-current/10',
        underline ? 'underline decoration-(--accent) text-(--foreground)' : 'no-underline',
      )}
    >
      {children}
      {icon && <Link.Icon className="text-(--accent)" />}
    </Link>
  </li>
)

type MobileMenuComponent = typeof Root & {
  Nav: typeof Nav
  NavItem: typeof NavItem
}

const MobileMenu = Root as MobileMenuComponent

MobileMenu.Nav = Nav
MobileMenu.NavItem = NavItem

export default MobileMenu
