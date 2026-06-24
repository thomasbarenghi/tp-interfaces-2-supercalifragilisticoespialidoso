import { useNavigate, useParams } from 'react-router'
import { ShoppingCart } from '@gravity-ui/icons'
import useSWR from 'swr'
import { fetcher } from '../../lib/fetcher'
import { API } from '../../config/api'
import type { Product } from '../../types/product'
import { usePageTitle } from '../../hooks/usePageTitle'
import EmptyState from '../../components/EmptyState'
import { ROUTES } from '../../config/routes'
import ProductDetailSkeleton from './components/ProductDetailSkeleton'
import ProductDetailView from './components/ProductDetailView'

const ProductDetail = () => {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()
  const { data: product, isLoading } = useSWR<Product>(slug ? API.PRODUCT(slug) : null, fetcher)
  usePageTitle(product?.name)

  if (isLoading) return <ProductDetailSkeleton />

  if (!product)
    return (
      <EmptyState
        icon={<ShoppingCart width={24} height={24} className="text-(--accent)" />}
        title="Producto no encontrado"
        description="El producto que buscás no existe o fue removido."
        action={{ label: 'Ver productos', onClick: () => navigate(ROUTES.LIST) }}
      />
    )

  return <ProductDetailView product={product} />
}

export default ProductDetail
