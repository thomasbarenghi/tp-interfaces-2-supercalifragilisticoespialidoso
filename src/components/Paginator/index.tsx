import { Pagination } from '@heroui/react'

type Props = {
  page: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

const Paginator = ({ page, totalPages, totalItems, itemsPerPage, onPageChange }: Props) => {
  const startItem = (page - 1) * itemsPerPage + 1

  const endItem = Math.min(page * itemsPerPage, totalItems)

  return (
    <Pagination className="w-full">
      <Pagination.Summary>
        Mostrando {startItem}–{endItem} de {totalItems} productos
      </Pagination.Summary>

      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous isDisabled={page === 1} onPress={() => onPageChange(page - 1)}>
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
              <Pagination.Link isActive={i + 1 === page} onPress={() => onPageChange(i + 1)}>
                {i + 1}
              </Pagination.Link>
            </Pagination.Item>
          ),
        )}

        <Pagination.Item>
          <Pagination.Next isDisabled={page === totalPages} onPress={() => onPageChange(page + 1)}>
            <span>Siguiente</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  )
}

export default Paginator
