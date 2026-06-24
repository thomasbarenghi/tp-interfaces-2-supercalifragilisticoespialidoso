import { formatPrice } from '../../utils/format.ts'

interface ProductItemRowProps {
  image: string
  name: string
  subtitle: string
  price: number
  size?: 'sm' | 'lg'
}

const ProductItemRow = ({ image, name, subtitle, price, size = 'sm' }: ProductItemRowProps) => {
  const isLg = size === 'lg'
  return (
    <div className="flex items-center gap-3.5">
      <div
        className={`shrink-0 overflow-hidden bg-surface-secondary ${
          isLg ? 'size-20 rounded-xl' : 'w-14 h-16 rounded-lg'
        }`}
      >
        <img src={image} alt={name} className="w-full h-full object-cover dark:brightness-90" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate text-sm">{name}</p>
        <p className={`text-muted ${isLg ? 'text-sm' : 'text-xs'}`}>{subtitle}</p>
      </div>
      <p className="font-bold shrink-0 text-sm">{formatPrice(price)}</p>
    </div>
  )
}

export default ProductItemRow
