import { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { Form } from '@heroui/react'
import ContactForm from './components/ContactForm.tsx'
import ItemsCard from '../../components/ItemsCard'
import PaymentSummary from '../../components/PaymentSummary'
import PaymentForm from './components/PaymentForm'
import ShippingForm from './components/ShippingForm.tsx'
import Stepper, { type Step } from '../../components/Stepper'
import Main from '../../components/Main'
import TwoColumnLayout from '../../components/TwoColumnLayout'
import { type CheckoutFormData, usePlaceOrder } from '../../hooks/usePlaceOrder'
import { usePageTitle } from '../../hooks/usePageTitle'
import { ROUTES } from '../../config/routes'

const STEPS: Step[] = [
  { label: 'Carrito', status: 'completed' },
  { label: 'Pago', status: 'current' },
  { label: 'Confirmación', status: 'pending' },
]

const AUTOFILL: CheckoutFormData = {
  email: 'juan.perez@ejemplo.com',
  phone: '+54 11 1234 5678',
  firstName: 'Juan',
  lastName: 'Pérez',
  address: 'Av. Corrientes 1234',
  city: 'Buenos Aires',
  province: 'Buenos Aires',
  postalCode: '1043',
  shippingMethod: 'home_delivery',
  cardNumber: '4242 4242 4242 4242',
  expiry: '12/26',
  cvv: '123',
  cardHolder: 'JUAN PEREZ',
}

const Checkout = () => {
  usePageTitle('Finalizar compra')
  const { placeOrder, isLoading, items, subtotal, isEmpty, submitted } = usePlaceOrder()
  const [fillKey, setFillKey] = useState(0)
  const [defaultValues, setDefaultValues] = useState<CheckoutFormData | null>(null)

  useEffect(() => {
    let count = 0
    let timer: ReturnType<typeof setTimeout>

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key !== 'Shift') return
      count++
      clearTimeout(timer)
      timer = setTimeout(() => {
        count = 0
      }, 1000)
      if (count >= 5) {
        count = 0
        setDefaultValues(AUTOFILL)
        setFillKey((k) => k + 1)
      }
    }

    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keyup', handleKeyUp)
      clearTimeout(timer)
    }
  }, [])

  if (isEmpty && !submitted.current) return <Navigate to={ROUTES.LIST} replace />

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const get = (k: string) => (fd.get(k) as string) ?? ''
    placeOrder({
      email: get('email'),
      phone: get('phone'),
      notes: get('notes') || undefined,
      firstName: get('firstName'),
      lastName: get('lastName'),
      address: get('address'),
      city: get('city'),
      province: get('province'),
      postalCode: get('postalCode'),
      shippingMethod: get('shippingMethod'),
      cardNumber: get('cardNumber'),
      expiry: get('expiry'),
      cvv: get('cvv'),
      cardHolder: get('cardHolder'),
    } satisfies CheckoutFormData)
  }

  return (
    <Main>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium">Finalizar compra</h1>
        <div className="hidden sm:block">
          <Stepper steps={STEPS} />
        </div>
      </div>

      <Form onSubmit={handleSubmit} validationBehavior="native">
        <TwoColumnLayout>
          <TwoColumnLayout.Main>
            <ContactForm key={`contact-${fillKey}`} defaultValues={defaultValues} />
            <ShippingForm key={`shipping-${fillKey}`} defaultValues={defaultValues} />
            <PaymentForm key={`payment-${fillKey}`} defaultValues={defaultValues} />
          </TwoColumnLayout.Main>

          <TwoColumnLayout.Sidebar>
            <ItemsCard title="Tu pedido" items={items} />
            <PaymentSummary
              subtotal={subtotal}
              shipping={0}
              total={subtotal}
              showAction
              isLoading={isLoading}
            />
          </TwoColumnLayout.Sidebar>
        </TwoColumnLayout>
      </Form>
    </Main>
  )
}

export default Checkout
