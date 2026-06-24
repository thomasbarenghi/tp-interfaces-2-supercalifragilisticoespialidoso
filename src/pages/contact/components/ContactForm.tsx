import { Button, FieldError, Input, Label, TextArea, TextField } from '@heroui/react'
import SectionCard from '../../../components/SectionCard'

const ContactForm = () => (
  <SectionCard title="Escribinos un mensaje">
    <div className="flex gap-6 flex-col">
      <p className="">Te respondemos en menos de 24hs hábiles</p>
      <TextField
        name="firstName"
        fullWidth
        isRequired
        validate={(v) => (!v ? 'Completá este campo' : null)}
      >
        <Label>Nombre</Label>
        <Input placeholder="Nombre" />
        <FieldError />
      </TextField>
      <TextField
        name="email"
        type="email"
        fullWidth
        isRequired
        validate={(v) => {
          if (!v) return 'Completá este campo'
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Ingresá un email válido'
          return null
        }}
      >
        <Label>Email</Label>
        <Input placeholder="tu@email.com" />
        <FieldError />
      </TextField>

      <TextField
        name="message"
        isRequired
        fullWidth
        validate={(v) => (!v ? 'Completá este campo' : null)}
      >
        <Label>Mensaje</Label>
        <TextArea className="h-32" placeholder="Contanos en que te podemos ayudar..." />
        <FieldError />
      </TextField>
      <Button variant="primary" fullWidth className="rounded-full" type="submit">
        Enviar Mensaje
      </Button>
    </div>
  </SectionCard>
)

export default ContactForm
