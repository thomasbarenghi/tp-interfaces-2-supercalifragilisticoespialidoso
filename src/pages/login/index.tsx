import { useState } from 'react'
import { usePageTitle } from '../../hooks/usePageTitle.ts'
import { useAuth } from '../../hooks/useAuth'
import { Button, Input, Label, TextField } from '@heroui/react'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../config/routes'
import { toast } from 'sonner'
import Logo from '../../components/Logo/index.tsx'

const Login = () => {
  usePageTitle('Login')
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(formData.email, formData.password)
      navigate('/')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión'
      toast.error(message)
    }
  }

  return (
    <div className="relative">
      <div className="absolute top-14.5 left-14.5">
        <Logo></Logo>
      </div>
      <div className="min-h-screen lg:flex">
        <div className="hidden lg:block lg:w-2/3 lg:h-screen overflow-hidden">
          <img
            src="https://images.stockcake.com/public/6/b/b/6bba682c-6349-468f-92a7-7c220b1c687e_large/party-aftermath-scene-stockcake.jpg"
            className="w-full h-full object-cover"
          ></img>
        </div>
        <div className="w-full lg:w-1/3 flex items-center">
          <div className="w-full px-15 py-20">
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 py-8">
              <div className="w-full">
                <h1 className="text-3xl font-bold">Bienvenido nuevamente</h1>
                <p className="mt-1">Compartí lo que pensás, descubrí lo que estás explorando</p>
              </div>

              <div className="w-full">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <TextField>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="Ingresa tu email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </TextField>

                  <TextField>
                    <Label>Contraseña</Label>
                    <Input
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </TextField>

                  <Button type="submit" variant="primary" fullWidth isDisabled={isLoading}>
                    Ingresar
                  </Button>

                  <Button
                    variant="outline"
                    fullWidth
                    className="rounded-full border-accent text-accent"

                    onClick={() => navigate(ROUTES.REGISTER)}
                  >
                    Crear cuenta
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
