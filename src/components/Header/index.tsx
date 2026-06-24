import { Avatar, Link, SearchField } from '@heroui/react'
import clsx from 'clsx'
import { Bars, ShoppingCart } from '@gravity-ui/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import Logo from '../Logo'
import MobileMenu from '../MobileMenu'
import { ROUTES } from '../../config/routes'

const NAV_ITEMS = [
  { text: 'Todo', icon: false, underline: false, href: ROUTES.LIST },
  { text: 'Remeras', icon: false, underline: false, href: `${ROUTES.LIST}?category=remeras` },
  { text: 'Pantalones', icon: false, underline: false, href: `${ROUTES.LIST}?category=pantalones` },
  { text: 'Camperas', icon: false, underline: false, href: `${ROUTES.LIST}?category=camperas` },
  { text: 'Zapatillas', icon: false, underline: false, href: `${ROUTES.LIST}?category=zapatillas` },
  { text: 'Seguir mi compra', icon: true, underline: true, href: ROUTES.TRACKING },
]

const Header = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`${ROUTES.LIST}?search=${encodeURIComponent(value.trim())}`)
      setMenuOpen(false)
    }
  }

  return (
    <>
      <header className="w-full py-4 bg-background sticky top-0 z-40 border-b border-current/5">
        <nav className="container px-6 xl:px-10 flex items-center justify-between">
          <div className="flex items-center">
            <Link href={ROUTES.HOME} className="no-underline text-foreground">
              <Logo />
            </Link>
            <ul className="hidden xl:flex px-10 gap-6">
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
                    {item.icon && <Link.Icon className="text-(--accent)" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop: search + cart */}
          <div className="hidden xl:flex items-center gap-6">
            <SearchField name="search" variant="secondary" onSubmit={handleSearch}>
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input className="w-70" placeholder="Busca entre miles de productos" />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <Link href={ROUTES.CART} className="no-underline">
              <Avatar color="accent" variant="soft">
                <Avatar.Fallback>
                  <ShoppingCart />
                </Avatar.Fallback>
              </Avatar>
            </Link>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex xl:hidden items-center gap-4">
            <Link href={ROUTES.CART} className="no-underline">
              <Avatar color="accent" variant="soft">
                <Avatar.Fallback>
                  <ShoppingCart />
                </Avatar.Fallback>
              </Avatar>
            </Link>
            <button onClick={() => setMenuOpen((o) => !o)} aria-label="Abrir menú" className="p-1">
              <Bars width={20} height={20} />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)}>
        <MobileMenu.Search onSubmit={handleSearch} />
        <MobileMenu.Nav>
          {NAV_ITEMS.map((item) => (
            <MobileMenu.NavItem
              key={item.text}
              href={item.href}
              underline={item.underline}
              icon={item.icon}
              onPress={() => setMenuOpen(false)}
            >
              {item.text}
            </MobileMenu.NavItem>
          ))}
        </MobileMenu.Nav>
      </MobileMenu>
    </>
  )
}

export default Header
