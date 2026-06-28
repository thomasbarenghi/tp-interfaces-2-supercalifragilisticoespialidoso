import Main from '../../components/Main'
import ContactForm from './components/ContactForm'
import { Form } from '@heroui/react'
import { usePageTitle } from '../../hooks/usePageTitle.ts'

const Contact = () => {
  usePageTitle('Contacto')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Mensaje enviado correctamente. Te respondemos en menos de 24hs hábiles.')
  }

  return (
    <Main>
      <section className="flex gap-12 flex-col items-center">
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-sm text-(--accent) font-bold">CONTACTO</p>
          <h1 className="text-4xl font-bold">¿Hablamos?</h1>
        </div>
        <div className="w-3/5">
          <Form onSubmit={handleSubmit} validationBehavior="native">
            <ContactForm />
          </Form>
        </div>
      </section>
    </Main>
  )
}

export default Contact
