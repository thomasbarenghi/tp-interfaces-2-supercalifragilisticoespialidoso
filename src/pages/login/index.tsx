import { useState } from 'react'
import { usePageTitle } from '../../hooks/usePageTitle.ts'
import { useAuth } from '../../hooks/useAuth'
import { Alert, Button, Card, Input, Label, TextField } from '@heroui/react'
import Main from '../../components/Main'
import { useNavigate } from 'react-router'

const Login = () => {
  usePageTitle('Login')
  const { login, isLoading, error } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: 'password123',
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
    <Main className="flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md">
        <Card.Header className="flex flex-col gap-1 items-center">
          <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
          <p className="text-default-500 text-small">Ingresa tus datos para continuar</p>
        </Card.Header>
        <Card.Content>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <Alert status="danger">{error}</Alert>}
            <TextField>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="tu@email.com"
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
            <Button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
              {isLoading ? 'Cargando...' : 'Entrar'}
            </Button>
          </form>
        </Card.Content>
      </Card>
    </Main>
  )
}

export default Login
