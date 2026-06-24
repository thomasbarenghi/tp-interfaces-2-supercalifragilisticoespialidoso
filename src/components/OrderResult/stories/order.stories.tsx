import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@heroui/react'
import OrderResult from '../index'
import Check from '@gravity-ui/icons/Check'

const meta: Meta<typeof OrderResult> = {
  component: OrderResult,
  title: 'Components/OrderResult',
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof OrderResult>

export const Default: Story = {
  render: () => (
    <OrderResult>
      <OrderResult.Stepper>
        <div>Stepper</div>
      </OrderResult.Stepper>

      <OrderResult.Card>
        <OrderResult.Icon>
          <div className="p-6 rounded-full bg-[#DCF2E2] dark:bg-green-900/40">
            <div className="flex justify-center items-center p-2 rounded-full bg-[#16A34A]">
              <Check width={64} height={64} className="text-white" />
            </div>
          </div>
        </OrderResult.Icon>

        <OrderResult.Title>Operación exitosa</OrderResult.Title>

        <OrderResult.Description>Tu solicitud fue procesada correctamente.</OrderResult.Description>

        <OrderResult.Metadata>
          <div className="text-sm text-muted">Número de orden: #123456</div>
        </OrderResult.Metadata>

        <OrderResult.Actions>
          <Button variant="outline">Continuar</Button>
          <Button variant="primary">Volver</Button>
        </OrderResult.Actions>
      </OrderResult.Card>
    </OrderResult>
  ),
}
