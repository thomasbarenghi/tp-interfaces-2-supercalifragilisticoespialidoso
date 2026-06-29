import { Switch } from '@heroui/react'
import Logo from '../Logo'
import { useDarkMode } from '../../hooks/useDarkMode'
import { ROUTES } from '../../config/routes'

const Footer = () => {
  const { dark, toggle } = useDarkMode()
  return (
    <footer
      className="mt-auto bg-(--background) text-(--foreground) min-h-[350px] dark:border-t dark:border-current/5"
      data-theme="dark"
    >
      <div className="container px-6 md:px-10 py-16 flex flex-col sm:flex-row justify-between gap-10">
        <div className="flex flex-col gap-6">
          <a href={ROUTES.HOME}>
            <Logo />
          </a>
          <p className="text-sm opacity-60 leading-relaxed">
            Una red social creada para compartir, descubrir y hacer ruido.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-semibold text-sm">Ayuda</p>
          <a
            href={ROUTES.CONTACT}
            className="text-sm opacity-60 hover:opacity-100 transition-opacity"
          >
            Contacto
          </a>
        </div>
      </div>

      <div className="container px-6 md:px-10 py-5 border-t border-current/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs opacity-40">© 2026 Bang. Todos los derechos reservados.</p>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs opacity-60">Modo oscuro</span>
            <Switch isSelected={dark} onChange={toggle} aria-label="Modo oscuro">
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch>
          </label>
        </div>
      </div>
    </footer>
  )
}

export default Footer
