import type { ReactNode } from 'react'
import { Surface } from '@heroui/react'
import { Star } from '@gravity-ui/icons'

interface Props {
  children: ReactNode
}

const Root = ({ children }: Props) => {
  return (
    <Surface variant="transparent" className="overflow-hidden rounded-2xl lg:rounded-[2rem]">
      <div className="grid gap-6 pb-6 lg:gap-10 lg:pb-10 lg:grid-cols-2">{children}</div>
    </Surface>
  )
}

const Content = ({ children }: Props) => {
  return <div className="flex flex-col justify-center">{children}</div>
}

const Badge = ({ children }: Props) => {
  return (
    <div className="mb-6 inline-flex w-fit items-center rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground">
      {children}
    </div>
  )
}

const Title = ({ children }: Props) => {
  return (
    <h1 className="max-w-xl text-4xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-7xl">
      {children}
    </h1>
  )
}

const Description = ({ children }: Props) => {
  return <p className="mt-4 max-w-lg text-base leading-relaxed text-muted lg:mt-6">{children}</p>
}

const Actions = ({ children }: Props) => {
  return <div className="mt-5 flex flex-wrap items-center gap-3 lg:mt-8">{children}</div>
}

const Features = ({ children }: Props) => {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted lg:mt-10 lg:gap-x-8">
      {children}
    </div>
  )
}

const Feature = ({ children }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-success">✓</span>
      <span>{children}</span>
    </div>
  )
}

const Visual = ({ children }: Props) => {
  return (
    <div className="relative flex items-center justify-center lg:justify-end">
      <Surface
        variant="transparent"
        className="relative flex h-[280px] w-full sm:h-[380px] lg:h-[520px] lg:max-w-[520px] items-center justify-end overflow-hidden rounded-2xl lg:rounded-[2rem] bg-gradient-to-br from-[#2E2E33] to-[#0A0A0D]"
      >
        {children}
      </Surface>
    </div>
  )
}

const Rating = ({ children }: Props) => {
  return (
    <div className="absolute top-6 left-6 z-10 flex items-center gap-2 rounded-full border border-border bg-overlay px-4 py-2 text-sm text-overlay-foreground backdrop-blur-md">
      <Star className="text-warning" />
      {children}
    </div>
  )
}

const ProductCard = ({ children }: Props) => {
  return (
    <Surface
      variant="default"
      className="absolute bottom-6 left-6 z-10 rounded-[1.5rem] px-5 py-4 shadow-sm"
    >
      {children}
    </Surface>
  )
}

const BackgroundText = ({ children }: Props) => {
  return (
    <span className="pointer-events-none absolute bottom-[-1rem] left-1/2 z-0 -translate-x-1/2 select-none text-[6rem] font-black leading-none tracking-[-0.08em] text-white sm:text-[9rem] lg:text-[14rem] pb-4 lg:pb-6">
      {children}
    </span>
  )
}

type HomeHeroComponent = typeof Root & {
  Content: typeof Content
  Badge: typeof Badge
  Title: typeof Title
  Description: typeof Description
  Actions: typeof Actions
  Features: typeof Features
  Feature: typeof Feature
  Visual: typeof Visual
  Rating: typeof Rating
  ProductCard: typeof ProductCard
  BackgroundText: typeof BackgroundText
}

const HomeHero = Root as HomeHeroComponent

HomeHero.Content = Content
HomeHero.Badge = Badge
HomeHero.Title = Title
HomeHero.Description = Description
HomeHero.Actions = Actions
HomeHero.Features = Features
HomeHero.Feature = Feature
HomeHero.Visual = Visual
HomeHero.Rating = Rating
HomeHero.ProductCard = ProductCard
HomeHero.BackgroundText = BackgroundText

export default HomeHero
