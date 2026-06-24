import clsx from 'clsx'

type MainProps = {
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

const Main = ({ children, className, contentClassName }: MainProps) => {
  return (
    <main className={clsx('bg-background', className)}>
      <div className={clsx('container px-4 py-10 sm:px-6 lg:px-10 lg:py-15', contentClassName)}>
        {children}
      </div>
    </main>
  )
}

export default Main
