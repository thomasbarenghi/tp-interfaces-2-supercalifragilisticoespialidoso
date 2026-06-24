import { Card } from '@heroui/react'
import { ArrowRight } from '@gravity-ui/icons'
import clsx from 'clsx'

interface InfoCardProps {
  icon: React.ReactNode
  title: string
  description: string
  onClick?: () => void
}

const InfoCard = ({ icon, title, description, onClick }: InfoCardProps) => (
  <Card className={clsx('px-5 py-4.5', onClick && 'cursor-pointer')} onClick={onClick}>
    <Card.Content className="flex-row items-center gap-3.5">
      <div className="bg-(--accent)/10 rounded-[20px] size-10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold">{title}</p>
        <p className="text-xs text-muted">{description}</p>
      </div>
      <ArrowRight width={16} height={16} className="text-muted shrink-0" />
    </Card.Content>
  </Card>
)

export default InfoCard
