import { useState } from 'react'
import { usePageTitle } from '../../hooks/usePageTitle.ts'
import { Xmark } from '@gravity-ui/icons'
import { useAuth } from '../../hooks/useAuth'
import { Alert, Button, Input, Label, TextField, toast } from '@heroui/react'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../config/routes'
import Logo from '../../components/Logo/index.tsx'

const noop = () => {}

const Login = () => {
  usePageTitle('Login')
  const { login, isLoading, error } = useAuth()
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
    } catch {
      // El error ya se maneja en el hook y se muestra en la UI
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
                  {error && <Alert status="danger">{error}</Alert>}

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

                  <Button
                    type="submit"
                    className="w-full bg-[#E51E14] text-white font-semibold py-3 rounded-full"
                    isDisabled={isLoading}
                    onPress={() =>
                      toast.danger('Error al iniciar sesión', {
                        actionProps: {
                          children: 'Cerrar',
                          onPress: noop,
                          variant: 'danger-soft',
                        },
                        description:
                          'Hubo un error al iniciar sesión. Por favor, verifica tus credenciales e intenta nuevamente.',
                        indicator: <Xmark />,
                      })
                    }
                  >
                    {isLoading ? 'Guardando...' : 'Ingresar'}
                  </Button>

                  <Button
                    variant="outline"
                    fullWidth
                    className="rounded-full border-[#E51E14] text-[#E51E14]"
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
