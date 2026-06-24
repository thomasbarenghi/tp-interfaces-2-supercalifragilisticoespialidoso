import { FieldError, Input, Label, TextArea, TextField } from '@heroui/react'
import SectionCard from '../../../components/SectionCard'
import type { CheckoutFormData } from '../../../hooks/usePlaceOrder'

interface Props {
  defaultValues?: CheckoutFormData | null
}

const ContactForm = ({ defaultValues }: Props) => (
  <SectionCard n="1" title="Datos de contacto">
    <div className="grid grid-cols-2 gap-3.5">
      <TextField
        name="email"
        type="email"
        fullWidth
        isRequired
        defaultValue={defaultValues?.email}
        validate={(v) =>
          v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Ingresá un email válido' : null
        }
      >
        <Label>Email</Label>
        <Input placeholder="tu@email.com" />
        <FieldError />
      </TextField>
      <TextField name="phone" fullWidth isRequired defaultValue={defaultValues?.phone}>
        <Label>Teléfono</Label>
        <Input placeholder="+54 11 0000 0000" />
        <FieldError />
      </TextField>
    </div>
    <TextField name="notes" fullWidth defaultValue={defaultValues?.notes}>
      <Label>Aclaraciones (opcional)</Label>
      <TextArea
        placeholder="Indicaciones especiales para tu pedido..."
        className="resize-none"
        rows={3}
      />
    </TextField>
  </SectionCard>
)

export default ContactForm
