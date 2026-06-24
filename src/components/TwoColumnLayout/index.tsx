type Gap = 'md' | 'lg' | 'xl'

const gapClass: Record<Gap, string> = {
  md: 'gap-6 lg:gap-8',
  lg: 'gap-8 lg:gap-12',
  xl: 'gap-10 lg:gap-16',
}

interface TwoColumnLayoutProps {
  children: React.ReactNode
  gap?: Gap
}

const TwoColumnLayout = ({ children, gap = 'md' }: TwoColumnLayoutProps) => (
  <div className={`flex flex-col lg:flex-row items-start ${gapClass[gap]}`}>{children}</div>
)

const Main = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full lg:flex-1 min-w-0 flex flex-col gap-8">{children}</div>
)

const Sidebar = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full lg:w-110 lg:shrink-0 flex flex-col gap-8">{children}</div>
)

TwoColumnLayout.Main = Main
TwoColumnLayout.Sidebar = Sidebar

export default TwoColumnLayout
