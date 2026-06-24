import { Card } from '@heroui/react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

const FeatureCard = ({ icon, title, description, className }: FeatureCardProps) => (
  <Card className={className}>
    <Card.Content className="flex items-start gap-4">
      <div className="bg-(--accent)/10 text-(--accent) rounded-xl size-10 flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <Card.Title className="text-sm font-bold mb-1">{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </div>
    </Card.Content>
  </Card>
)

export default FeatureCard
