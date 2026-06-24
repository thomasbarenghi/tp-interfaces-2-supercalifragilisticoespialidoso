import type { ReactNode } from 'react'
import { Surface } from '@heroui/react'

interface Props {
  children: ReactNode
}

const Root = ({ children }: Props) => {
  return (
    <Surface variant="secondary" className=" bg-transparent py-14 ">
      <div className="grid lg:grid-cols-2 min-h-105 rounded-2xl overflow-hidden">{children}</div>
    </Surface>
  )
}

const Content = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-center px-8 py-10 lg:px-12 bg-gray-100 dark:bg-surface order-2 lg:order-1">
      {children}
    </div>
  )
}

const Eyebrow = ({ children }: Props) => {
  return (
    <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-accent">{children}</p>
  )
}

const Title = ({ children }: Props) => {
  return (
    <h2 className="max-w-sm text-4xl font-bold leading-[0.95] text-foreground lg:text-6xl">
      {children}
    </h2>
  )
}

const Description = ({ children }: Props) => {
  return <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">{children}</p>
}

const Action = ({ children }: Props) => {
  return <div className="mt-8">{children}</div>
}

const Visual = ({ children }: Props) => {
  return (
    <div className="relative flex items-start lg:items-end justify-start overflow-hidden bg-zinc-900 dark:bg-[color-mix(in_oklab,var(--accent)_15%,transparent)] min-h-48 lg:min-h-0 order-1 lg:order-2">
      <div className="absolute inset-0 bg-radial-[ellipse_at_bottom_right] from-accent/30 to-transparent pointer-events-none" />
      {children}
    </div>
  )
}

const Number = ({ children }: Props) => {
  return (
    <span className="relative text-[9rem] py-4 px-8 font-black leading-none tracking-[-0.08em] text-white dark:text-accent lg:text-[14rem]">
      {children}
    </span>
  )
}

type CapsuleBannerComponent = typeof Root & {
  Content: typeof Content
  Eyebrow: typeof Eyebrow
  Title: typeof Title
  Description: typeof Description
  Action: typeof Action
  Visual: typeof Visual
  Number: typeof Number
}

const CapsuleBanner = Root as CapsuleBannerComponent

CapsuleBanner.Content = Content
CapsuleBanner.Eyebrow = Eyebrow
CapsuleBanner.Title = Title
CapsuleBanner.Description = Description
CapsuleBanner.Action = Action
CapsuleBanner.Visual = Visual
CapsuleBanner.Number = Number

export default CapsuleBanner
