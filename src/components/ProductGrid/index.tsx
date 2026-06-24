import ProductCard from '../ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'
import type { Product } from '../../types/product'

interface Props {
  products: Product[]
  isLoading?: boolean
  skeletonCount?: number
}

const ProductGrid = ({ products, isLoading, skeletonCount = 8 }: Props) => (
  <div className="grid grid-cols-2 gap-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
    {isLoading
      ? Array.from({ length: skeletonCount }).map((_, i) => <ProductCardSkeleton key={i} />)
      : products.map((product) => <ProductCard key={product.id} product={product} />)}
  </div>
)

export default ProductGrid
