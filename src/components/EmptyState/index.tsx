import { Button } from '@heroui/react'
import Main from '../Main'

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: React.ReactNode
  action: { label: string; onClick: () => void }
}

const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <Main>
    <section className="flex flex-col items-center">
      <div className="bg-(--accent)/10 rounded-full size-16 flex items-center justify-center mb-5">
        {icon}
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="text-sm text-muted mb-6 text-center max-w-xs">{description}</div>
      <Button variant="primary" className="rounded-full" onClick={action.onClick}>
        {action.label}
      </Button>
    </section>
  </Main>
)

export default EmptyState
