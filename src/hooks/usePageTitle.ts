import { useEffect } from 'react'

const APP_NAME = 'Hero'

export const usePageTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} | ${APP_NAME}` : APP_NAME
  }, [title])
}
