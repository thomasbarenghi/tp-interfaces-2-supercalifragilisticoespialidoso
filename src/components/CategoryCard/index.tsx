import { Button, Link, Surface } from '@heroui/react'
import { ArrowRight } from '@gravity-ui/icons'
import { ROUTES } from '../../config/routes'

type CategoryCardProps = {
  title: string
  count: number
  slug: string
  bg: string
  text: string
  muted: string
}

const CategoryCard = ({ title, count, slug, bg, text, muted }: CategoryCardProps) => {
  return (
    <Link className="w-full h-full no-underline" href={`${ROUTES.LIST}?category=${slug}`}>
      <Surface
        variant="default"
        className={`relative w-full h-full flex flex-col justify-between aspect-square rounded-2xl p-5 overflow-hidden ${bg}`}
      >
        <div>
          <p className={`font-bold text-2xl ${text}`}>{title}</p>
          <p className={`text-sm ${muted}`}>+{count} modelos</p>
        </div>
        <Button isIconOnly variant="ghost" className="rounded-full bg-white/80 dark:bg-white/10">
          <ArrowRight />
        </Button>
      </Surface>
    </Link>
  )
}

export default CategoryCard
