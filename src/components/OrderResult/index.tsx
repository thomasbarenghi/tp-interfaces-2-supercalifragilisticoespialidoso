import { Card } from '@heroui/react'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Root = ({ children }: Props) => (
  <div className="flex flex-col items-center gap-8">{children}</div>
)

const Stepper = ({ children }: Props) => (
  <div className="hidden sm:flex items-center justify-center">{children}</div>
)

const CardContainer = ({ children }: Props) => (
  <div className="flex items-center justify-center w-full">
    <Card className="flex flex-col gap-4 p-7 md:p-14 justify-center items-center w-full max-w-225">
      {children}
    </Card>
  </div>
)

const Icon = ({ children }: Props) => <>{children}</>
const Title = ({ children }: Props) => (
  <h1 className="text-4xl text-center font-bold">{children}</h1>
)
const Description = ({ children }: Props) => (
  <p className="text-base text-center text-muted">{children}</p>
)
const Metadata = ({ children }: Props) => <>{children}</>

const Actions = ({ children }: Props) => (
  <div className="flex flex-row flex-wrap gap-4 w-full max-w-125 *:flex-1">{children}</div>
)

const OrderResult = Object.assign(Root, {
  Stepper,
  Card: CardContainer,
  Icon,
  Title,
  Description,
  Metadata,
  Actions,
})

export default OrderResult
