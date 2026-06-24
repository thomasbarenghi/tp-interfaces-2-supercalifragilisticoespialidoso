import { Chip } from '@heroui/react'
import { useSearchParams } from 'react-router'

const BADGE_OPTIONS = [
  { value: 'nuevo', label: 'Nuevos' },
  { value: 'destacado', label: 'Destacados' },
  { value: 'capsula', label: 'Cápsula Denim 2.0' },
]

const BadgeFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const current = searchParams.get('badge')

  const toggle = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (current === value) {
      params.delete('badge')
    } else {
      params.set('badge', value)
    }
    params.set('page', '1')
    setSearchParams(params)
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {BADGE_OPTIONS.map((opt) => (
        <button key={opt.value} onClick={() => toggle(opt.value)}>
          <Chip
            variant={current === opt.value ? 'primary' : 'secondary'}
            color={current === opt.value ? 'accent' : 'default'}
            size="lg"
          >
            <Chip.Label>{opt.label}</Chip.Label>
          </Chip>
        </button>
      ))}
    </div>
  )
}

export default BadgeFilter
