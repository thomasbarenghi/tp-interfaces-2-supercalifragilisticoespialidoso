import { Outlet } from 'react-router'
import { Toaster } from 'sonner'

const LoginRegisterLayout = () => (
  <>
    <Outlet />
    <Toaster richColors />
  </>
)

export default LoginRegisterLayout
