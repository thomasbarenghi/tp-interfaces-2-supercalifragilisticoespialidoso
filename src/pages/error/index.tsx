import Main from '../../components/Main'
import OrderResult from '../../components/OrderResult'
import { usePageTitle } from '../../hooks/usePageTitle'
import Stepper, { type Step } from '../../components/Stepper'
import { useNavigate } from 'react-router'
import { Button } from '@heroui/react'
import { ROUTES } from '../../config/routes'
import { Xmark } from '@gravity-ui/icons'

const STEPS: Step[] = [
  { label: 'Carrito', status: 'completed' },
  { label: 'Pago', status: 'failed' },
  { label: 'Confirmación', status: 'pending' },
]

const Success = () => {
  usePageTitle('Error en el pago')

  const navigate = useNavigate()

  return (
    <Main>
      <OrderResult>
        <OrderResult.Stepper>
          <Stepper steps={STEPS} />
        </OrderResult.Stepper>

        <OrderResult.Card>
          <OrderResult.Icon>
            <div className="p-6 rounded-full bg-[#FFEFE7] dark:bg-green-900/40">
              <div className="flex justify-center items-center p-2 rounded-full bg-[#E50815]">
                <Xmark width={64} height={64} className="text-white" />
              </div>
            </div>
          </OrderResult.Icon>

          <OrderResult.Title>No pudimos procesar tu pago</OrderResult.Title>

          <OrderResult.Description>
            Tu tarjeta fue rechazada por el banco emisor. No te preocupes: no se realizó ningún
            cargo y tu carrito sigue intacto.
          </OrderResult.Description>

          <OrderResult.Actions>
            <Button
              variant="primary"
              fullWidth
              className="rounded-full"
              onClick={() => navigate(ROUTES.CART)}
            >
              Reintentar
            </Button>
          </OrderResult.Actions>
        </OrderResult.Card>
      </OrderResult>
    </Main>
  )
}

export default Success
