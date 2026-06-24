import { PRODUCTS_PER_PAGE, useProducts } from '../../hooks/useProducts'
import SortDropdown from '../../components/SortDropdown'
import Paginator from '../../components/Paginator'
import BadgeFilter from './components/BadgeFilter'
import Main from '../../components/Main'
import ProductGrid from '../../components/ProductGrid'
import EmptyState from '../../components/EmptyState'
import { usePageTitle } from '../../hooks/usePageTitle.ts'
import { Magnifier } from '@gravity-ui/icons'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../config/routes'
import CollectionBanner from '../../components/CollectionBanner'

const BADGE_TITLES: Record<string, string> = {
  capsula: 'Cápsula Denim 2.0',
  nuevo: 'Novedades',
  destacado: 'Destacados',
  oferta: 'Ofertas',
}

const List = () => {
  usePageTitle('Listado de productos')
  const navigate = useNavigate()
  const { products, page, setPage, totalPages, totalItems, filters, isLoading } = useProducts()

  const title = filters.badge
    ? (BADGE_TITLES[filters.badge] ?? filters.badge)
    : filters.search
      ? `Resultados para "${filters.search}"`
      : filters.category || 'Todos los productos'

  if (!isLoading && products.length === 0) {
    return (
      <EmptyState
        icon={<Magnifier width={24} height={24} className="text-(--accent)" />}
        title={`Sin resultados: ${title}`}
        description="Probá cambiando el filtro o revisá más tarde."
        action={{ label: 'Ver todos los productos', onClick: () => navigate(ROUTES.LIST) }}
      />
    )
  }

  return (
    <Main>
      <section className="flex flex-col gap-y-12">
        <CollectionBanner
          eyebrow="Próxima temporada"
          title={
            <>
              Cápsula 3.0 x <span className="italic">Billie Eilish</span>
            </>
          }
          description="Disponible en primavera 2027. Diseño colaborativo, edición limitada."
          image="https://images.unsplash.com/photo-1561390713-b08f7fe46f58?w=2000&q=100"
          action={{ label: 'Avisame cuando llegue', onClick: () => {} }}
        />
        <div className="flex flex-col gap-y-6">
          <h1 className="text-3xl font-bold capitalize">{title}</h1>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <BadgeFilter />
            <SortDropdown />
          </div>
        </div>
        <ProductGrid products={products} isLoading={isLoading} skeletonCount={PRODUCTS_PER_PAGE} />
        <Paginator
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={PRODUCTS_PER_PAGE}
          onPageChange={setPage}
        />
      </section>
    </Main>
  )
}

export default List
