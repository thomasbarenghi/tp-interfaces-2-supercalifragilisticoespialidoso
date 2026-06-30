import { usePageTitle } from '../../hooks/usePageTitle.ts'
import { useState } from 'react'
import { Alert, Button, Input, Label, TextField } from '@heroui/react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router'
import Logo from '../../components/Logo/index.tsx'

// Hook de autenticación con soporte para login, logout y register.

const Register = () => {
  usePageTitle('Register')
  const { register, isLoading, error } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nickname: '',
    name: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(formData.nickname, formData.name, formData.email, formData.password)
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
            src="https://i.pinimg.com/236x/66/a5/6f/66a56f98c3fbea121cf34166955b30e4.jpg"
            className="w-full h-full object-cover"
          ></img>
        </div>
        <div className="w-full lg:w-1/3 flex items-center">
          <div className="w-full px-15 py-20">
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-[30px] py-8">
              <div className="w-full">
                <h1 className="text-3xl font-bold">Registrate en TRADEMARK</h1>
                <p className="pt-2">Internet ya era un caos. Nosotros lo organizamos</p>
              </div>

              <div className="w-full">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {error && <Alert status="danger">{error}</Alert>}

                  <TextField>
                    <Label>Nombre</Label>
                    <Input
                      className="mt-2"
                      type="name"
                      placeholder="Ingresa tu nombre"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </TextField>

                  <TextField>
                    <Label>Usuario</Label>
                    <Input
                      className="mt-2"
                      type="nickname"
                      placeholder="Ingresa tu usuario"
                      value={formData.nickname}
                      onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                      required
                    />
                  </TextField>

                  <TextField>
                    <Label>Email</Label>
                    <Input
                      className="mt-2"
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
                      className="mt-2"
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </TextField>

                  <Button
                    type="submit"
                    className="w-full bg-[#E51E14] text-white font-semibold text-lg py-5 rounded-full min-h-[56px]"
                    isDisabled={isLoading}
                  >
                    {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
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

export default Register
