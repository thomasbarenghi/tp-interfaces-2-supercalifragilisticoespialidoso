import { Button, Dropdown, Label, type Selection } from '@heroui/react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { ChevronDown } from '@gravity-ui/icons'

const SORT_OPTIONS = {
  default: 'Relevancia',
  'price-asc': 'Menor precio',
  'price-desc': 'Mayor precio',
} as const

const SortDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentSort = searchParams.get('sort') ?? 'default'

  const selected = useMemo(() => new Set([currentSort]), [currentSort])

  const handleSort = (keys: Selection) => {
    const key = Array.from(keys)[0] as string

    const params = new URLSearchParams(searchParams)

    if (key === 'default') {
      params.delete('sort')
    } else {
      params.set('sort', key)
    }

    // reset pagination
    params.set('page', '1')

    setSearchParams(params)
  }

  return (
    <div className="flex items-center">
      <p>Ordenar por:</p>
      <Dropdown>
        <Button aria-label="Ordenar" variant="ghost" size="sm" className="text-base font-medium">
          {SORT_OPTIONS[currentSort as keyof typeof SORT_OPTIONS]} <ChevronDown />
        </Button>

        <Dropdown.Popover>
          <Dropdown.Menu
            selectedKeys={selected}
            selectionMode="single"
            disallowEmptySelection
            onSelectionChange={handleSort}
          >
            <Dropdown.Item id="default" textValue="Relevancia">
              <Label>Relevancia</Label>
              <Dropdown.ItemIndicator />
            </Dropdown.Item>

            <Dropdown.Item id="price-asc" textValue="Menor precio">
              <Label>Menor precio</Label>
              <Dropdown.ItemIndicator />
            </Dropdown.Item>

            <Dropdown.Item id="price-desc" textValue="Mayor precio">
              <Label>Mayor precio</Label>
              <Dropdown.ItemIndicator />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  )
}

export default SortDropdown
