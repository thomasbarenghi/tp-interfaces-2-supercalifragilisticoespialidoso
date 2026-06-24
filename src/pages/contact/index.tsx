import Main from '../../components/Main'
import TwoColumnLayout from '../../components/TwoColumnLayout'
import ContactForm from './components/ContactForm'
import { Card, Form } from '@heroui/react'
import { usePageTitle } from '../../hooks/usePageTitle.ts'

const Contact = () => {
  usePageTitle('Contacto')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Mensaje enviado correctamente. Te respondemos en menos de 24hs hábiles.')
  }

  return (
    <Main>
      <section className=" flex gap-12 flex-col">
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-sm text-(--accent) font-bold">CONTACTO</p>
          <h1 className="text-4xl font-bold">¿Hablamos?</h1>
        </div>

        <Form onSubmit={handleSubmit} validationBehavior="native">
          <TwoColumnLayout>
            <TwoColumnLayout.Main>
              <ContactForm />
            </TwoColumnLayout.Main>
            <TwoColumnLayout.Sidebar>
              <Card className="bg-zinc-900 dark:bg-surface p-7 ">
                <Card.Header>
                  <Card.Title className="text-white">Visitanos en nuestro local</Card.Title>
                  <Card.Description>Honduras 4870 · Palermo Soho · CABA</Card.Description>
                </Card.Header>
                <Card.Footer className="gap-6 font-medium">
                  <div>
                    <p className="text-muted">Lunes a viernes</p>
                    <p className="text-white">10 a 20hs</p>
                  </div>
                  <div>
                    <p className="text-muted">Sábados</p>
                    <p className="text-white">11 a 19hs</p>
                  </div>
                  <div>
                    <p className="text-muted">Domingos</p>
                    <p className="text-white">Cerrado</p>
                  </div>
                </Card.Footer>
              </Card>
            </TwoColumnLayout.Sidebar>
          </TwoColumnLayout>
        </Form>
      </section>
    </Main>
  )
}

export default Contact
