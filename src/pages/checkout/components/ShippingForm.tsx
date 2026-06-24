import { FieldError, Input, Label, ListBox, Select, TextField } from '@heroui/react'
import SectionCard from '../../../components/SectionCard'
import type { CheckoutFormData } from '../../../hooks/usePlaceOrder'

interface Props {
  defaultValues?: CheckoutFormData | null
}

const ShippingForm = ({ defaultValues }: Props) => (
  <SectionCard n="2" title="Dirección de envío">
    <div className="grid grid-cols-2 gap-3.5">
      <TextField name="firstName" fullWidth isRequired defaultValue={defaultValues?.firstName}>
        <Label>Nombre</Label>
        <Input placeholder="Nombre" />
        <FieldError />
      </TextField>
      <TextField name="lastName" fullWidth isRequired defaultValue={defaultValues?.lastName}>
        <Label>Apellido</Label>
        <Input placeholder="Apellido" />
        <FieldError />
      </TextField>
    </div>
    <TextField name="address" fullWidth isRequired defaultValue={defaultValues?.address}>
      <Label>Dirección</Label>
      <Input placeholder="Av. Ejemplo 1234, Piso 2" />
      <FieldError />
    </TextField>
    <div className="grid grid-cols-3 gap-3.5">
      <TextField name="city" fullWidth isRequired defaultValue={defaultValues?.city}>
        <Label>Ciudad</Label>
        <Input placeholder="Ciudad" />
        <FieldError />
      </TextField>
      <TextField name="province" fullWidth isRequired defaultValue={defaultValues?.province}>
        <Label>Provincia</Label>
        <Input placeholder="Provincia" />
        <FieldError />
      </TextField>
      <TextField
        name="postalCode"
        fullWidth
        isRequired
        defaultValue={defaultValues?.postalCode}
        validate={(v) => (v && !/^\d{4}$/.test(v) ? 'Código postal inválido' : null)}
      >
        <Label>Código postal</Label>
        <Input placeholder="1234" />
        <FieldError />
      </TextField>
    </div>
    <Select
      name="shippingMethod"
      isRequired
      fullWidth
      defaultSelectedKey={defaultValues?.shippingMethod}
      placeholder="Selecciona un metodo de entrega"
    >
      <Label>Método de entrega</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="home_delivery" textValue="Envío a domicilio">
            Envío a domicilio
          </ListBox.Item>
          <ListBox.Item id="store_pickup" textValue="Retiro en local">
            Retiro en local
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
      <FieldError />
    </Select>
  </SectionCard>
)

export default ShippingForm
