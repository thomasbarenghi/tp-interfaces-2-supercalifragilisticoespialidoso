import { Pagination } from '@heroui/react'
import clsx from 'clsx'

type Props = {
  page: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  itemLabel?: string
}

const Paginator = ({
  page,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  itemLabel = 'productos',
}: Props) => {
  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1

  const endItem = totalItems === 0 ? 0 : Math.min(page * itemsPerPage, totalItems)

  return (
    <Pagination className="w-full">
      <Pagination.Summary>
        Mostrando {startItem}–{endItem} de {totalItems} {itemLabel}
      </Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous
            className="gap-2 text-sm font-medium text-muted data-[disabled=true]:opacity-40"
            isDisabled={page === 1}
            onPress={() => onPageChange(page - 1)}
          >
            <Pagination.PreviousIcon />
            <span>Anterior</span>
          </Pagination.Previous>
        </Pagination.Item>

        {Array.from(
          {
            length: totalPages,
          },
          (_, i) => (
            <Pagination.Item key={i + 1}>
              <Pagination.Link
                className={clsx(
                  'size-8 min-w-8 rounded-full text-sm font-medium transition-colors',
                  i + 1 === page
                    ? 'bg-foreground text-background'
                    : 'bg-transparent text-foreground hover:bg-surface-tertiary',
                )}
                isActive={i + 1 === page}
                onPress={() => onPageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Link>
            </Pagination.Item>
          ),
        )}

        <Pagination.Item>
          <Pagination.Next
            className="gap-2 text-sm font-medium text-muted data-[disabled=true]:opacity-40"
            isDisabled={page === totalPages}
            onPress={() => onPageChange(page + 1)}
          >
            <span>Siguiente</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  )
}

export default Paginator
