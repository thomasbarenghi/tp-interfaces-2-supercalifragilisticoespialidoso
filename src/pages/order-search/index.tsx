import { useState } from 'react'
import { useNavigate } from 'react-router'
import { usePageTitle } from '../../hooks/usePageTitle'
import { Button, Input, TextField } from '@heroui/react'
import { ArrowRotateLeft, Trolley } from '@gravity-ui/icons'
import Main from '../../components/Main'
import FeatureCard from '../../components/FeatureCard'

const OrderSearch = () => {
  usePageTitle('Seguí tu pedido')
  const navigate = useNavigate()
  const [orderNumber, setOrderNumber] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = orderNumber.trim()
    if (trimmed) navigate(`/tracking/${trimmed}`)
  }

  return (
    <Main>
      <section className="flex flex-col items-center gap-8">
        <div className="w-full max-w-sm text-center">
          <div className="bg-(--accent)/10 rounded-full size-16 flex items-center justify-center mx-auto mb-6">
            <Trolley width={28} height={28} className="text-(--accent)" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Seguí tu pedido</h1>
          <p className="text-sm text-muted mb-6">
            Ingresá el número de pedido que recibiste en tu email de confirmación.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <TextField name="orderNumber" fullWidth>
              <Input
                placeholder="Ej: HR-2026-008417"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                autoFocus
              />
            </TextField>
            <Button variant="primary" fullWidth className="rounded-full" type="submit">
              Buscar pedido
            </Button>
          </form>
        </div>

        <FeatureCard
          className="w-full max-w-sm"
          icon={<ArrowRotateLeft width={18} height={18} />}
          title="Cambios y devoluciones gratis"
          description="Tenés 30 días desde la entrega para gestionar tu cambio sin costo."
        />
      </section>
    </Main>
  )
}

export default OrderSearch
