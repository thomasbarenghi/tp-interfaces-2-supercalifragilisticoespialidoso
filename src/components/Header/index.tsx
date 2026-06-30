import { Link } from '@heroui/react'
import clsx from 'clsx'
import { Bars } from '@gravity-ui/icons'
import { useState } from 'react'
import Logo from '../Logo'
import MobileMenu from '../MobileMenu'
import { ROUTES } from '../../config/routes'
import UserMenu from '../UserMenu'
import { useAuth } from '../../hooks/useAuth.ts'
import CreatePostModal from './CreatePostModal'

const NAV_ITEMS = [
  { text: 'Feed', underline: false, href: ROUTES.HOME },
  { text: 'Contacto', underline: false, href: ROUTES.CONTACT },
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated } = useAuth()

  return (
    <>
      <header className="w-full py-4 bg-background sticky top-0 z-40 border-b border-current/5">
        <nav className="container px-6 xl:px-10 flex items-center justify-between">
          <div className="flex items-center">
            <Link href={ROUTES.HOME} className="no-underline text-foreground">
              <Logo />
            </Link>

            <ul className="hidden xl:flex px-10 gap-6 items-center">
              {NAV_ITEMS.map((item) => (
                <li key={item.text}>
                  <Link
                    className={clsx(
                      'whitespace-nowrap',
                      item.underline
                        ? 'underline decoration-(--accent) text-(--foreground)'
                        : 'no-underline',
                    )}
                    href={item.href}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}

              {isAuthenticated && (
                <li>
                  <CreatePostModal triggerLabel="Crear publicación" />
                </li>
              )}
            </ul>
          </div>

          {/* Desktop: user menu */}
          <div className="hidden xl:flex items-center gap-6">{isAuthenticated && <UserMenu />}</div>

          {/* Mobile: user menu + hamburger */}
          <div className="flex xl:hidden items-center gap-4">
            {isAuthenticated && <UserMenu />}
            <button onClick={() => setMenuOpen((o) => !o)} aria-label="Abrir menú" className="p-1">
              <Bars width={20} height={20} />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)}>
        <MobileMenu.Nav>
          {NAV_ITEMS.map((item) => (
            <MobileMenu.NavItem
              key={item.text}
              href={item.href}
              underline={item.underline}
              onPress={() => setMenuOpen(false)}
            >
              {item.text}
            </MobileMenu.NavItem>
          ))}

          {isAuthenticated && (
            <div onClick={() => setMenuOpen(false)} className="px-4 py-2">
              <CreatePostModal triggerLabel="Crear publicación" />
            </div>
          )}
        </MobileMenu.Nav>
      </MobileMenu>
    </>
  )
}

export default Header
