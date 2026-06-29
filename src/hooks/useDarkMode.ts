import { useEffect, useState } from 'react'

const DARK_MODE_STORAGE_KEY = 'dark-mode'

const getInitialDarkMode = () => {
  if (typeof window === 'undefined') return false

  try {
    const stored = window.localStorage.getItem(DARK_MODE_STORAGE_KEY)
    if (stored !== null) return stored === 'true'
  } catch {
    // If storage is unavailable, fall back to the system preference.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const useDarkMode = () => {
  const [dark, setDark] = useState(getInitialDarkMode)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', dark)
    root.dataset.theme = dark ? 'dark' : 'light'

    try {
      window.localStorage.setItem(DARK_MODE_STORAGE_KEY, String(dark))
    } catch {
      // Ignore storage write failures and keep the theme applied in memory.
    }
  }, [dark])

  const toggle = () => {
    console.log('[useDarkMode] Toggle presionado')
    console.log('[useDarkMode] Estado actual:', dark)

    setDark((prev) => {
      const next = !prev
      console.log('[useDarkMode] Cambiando de', prev, 'a', next)
      return next
    })
  }

  console.log('[useDarkMode] Render. Valor actual:', dark)

  return { dark, toggle }
}
