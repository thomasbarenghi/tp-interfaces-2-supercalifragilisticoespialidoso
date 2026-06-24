import { Button } from '@heroui/react'
import type { ReactNode } from 'react'

interface Props {
  eyebrow: string
  title: ReactNode
  description?: string
  image: string
  action?: { label: string; onClick: () => void }
}

const CollectionBanner = ({ eyebrow, title, description, image, action }: Props) => (
  <div className="relative w-full rounded-2xl overflow-hidden min-h-52 flex items-end">
    <img
      src={image}
      alt=""
      className="absolute inset-0 w-full h-full object-cover object-[center_60%] dark:brightness-75"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
    <div className="relative z-10 flex items-end justify-between w-full px-8 py-7 gap-6 flex-wrap">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">{eyebrow}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{title}</h2>
        {description && <p className="text-sm text-white/70 mt-1">{description}</p>}
      </div>
      {action && (
        <Button variant="primary" onPress={action.onClick} className="shrink-0">
          {action.label}
        </Button>
      )}
    </div>
  </div>
)

export default CollectionBanner
