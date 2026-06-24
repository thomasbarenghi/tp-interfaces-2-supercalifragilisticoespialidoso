import { Card } from '@heroui/react'

const SectionBadge = ({ n }: { n: string }) => (
  <div className="size-7 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold shrink-0">
    {n}
  </div>
)

interface Props {
  n?: string
  title: string
  children: React.ReactNode
}

const SectionCard = ({ n, title, children }: Props) => (
  <Card className="p-7">
    <Card.Content className="gap-5">
      <div className="flex items-center gap-3.5">
        {n && <SectionBadge n={n} />}
        <Card.Title className="text-xl font-bold">{title}</Card.Title>
      </div>
      {children}
    </Card.Content>
  </Card>
)

export default SectionCard
