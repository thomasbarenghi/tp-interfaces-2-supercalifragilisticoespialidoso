import { FieldError, Input, Label, TextField } from '@heroui/react'
import SectionCard from '../../../components/SectionCard'
import type { CheckoutFormData } from '../../../hooks/usePlaceOrder'

interface Props {
  defaultValues?: CheckoutFormData | null
}

const PaymentForm = ({ defaultValues }: Props) => (
  <SectionCard n="3" title="Método de pago">
    <div className="flex flex-col gap-3.5">
      <TextField
        name="cardNumber"
        fullWidth
        isRequired
        defaultValue={defaultValues?.cardNumber}
        validate={(v) =>
          v && !/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(v.trim()) ? 'Ingresá los 16 dígitos' : null
        }
      >
        <Label>Número de tarjeta</Label>
        <Input placeholder="1234 5678 9012 3456" />
        <FieldError />
      </TextField>
      <div className="grid grid-cols-2 gap-3.5">
        <TextField
          name="expiry"
          fullWidth
          isRequired
          defaultValue={defaultValues?.expiry}
          validate={(v) => (v && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(v) ? 'Formato MM/AA' : null)}
        >
          <Label>Vencimiento</Label>
          <Input placeholder="MM / AA" />
          <FieldError />
        </TextField>
        <TextField
          name="cvv"
          fullWidth
          isRequired
          defaultValue={defaultValues?.cvv}
          validate={(v) => (v && !/^\d{3}$/.test(v) ? 'CVV inválido (3 dígitos)' : null)}
        >
          <Label>CVV</Label>
          <Input placeholder="123" maxLength={3} />
          <FieldError />
        </TextField>
      </div>
      <TextField name="cardHolder" fullWidth isRequired defaultValue={defaultValues?.cardHolder}>
        <Label>Nombre del titular</Label>
        <Input placeholder="Como figura en la tarjeta" />
        <FieldError />
      </TextField>
    </div>
  </SectionCard>
)

export default PaymentForm
