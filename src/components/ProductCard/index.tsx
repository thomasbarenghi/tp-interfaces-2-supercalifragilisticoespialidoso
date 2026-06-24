import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Chip } from '@heroui/react'
import { Check, ShoppingCart } from '@gravity-ui/icons'
import clsx from 'clsx'
import type { Product } from '../../types/product'
import { ROUTES } from '../../config/routes'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/format'

const Badge = ({ outOfStock, badge }: { outOfStock: boolean; badge: string | null }) => {
  if (outOfStock)
    return (
      <Chip
        color="default"
        variant="primary"
        className="uppercase font-bold absolute top-3 left-3 z-10"
      >
        Sin stock
      </Chip>
    )
  if (badge)
    return (
      <Chip
        color="accent"
        variant="primary"
        className="uppercase font-bold absolute top-3 left-3 z-10"
      >
        {badge}
      </Chip>
    )
  return null
}

const CartButton = ({
  added,
  onClick,
}: {
  added: boolean
  onClick: (e: React.MouseEvent) => void
}) => (
  <button
    onClick={onClick}
    aria-label="Agregar al carrito"
    className={clsx(
      'absolute bottom-3 right-3 z-10 size-10 rounded-full flex items-center justify-center',
      'shadow-lg cursor-pointer transition-all duration-200',
      'opacity-100 sm:opacity-0 sm:translate-y-1 group-hover:opacity-100 group-hover:translate-y-0',
      'hover:scale-110 active:scale-95',
      added ? 'bg-success text-success-foreground' : 'bg-overlay text-overlay-foreground',
    )}
  >
    {added ? (
      <Check width={14} height={14} className="text-white" />
    ) : (
      <ShoppingCart width={14} height={14} />
    )}
  </button>
)

const ProductCard = ({ product }: { product: Product }) => {
  const outOfStock = product.totalStock === 0
  const navigate = useNavigate()
  const { addItem, cart } = useCart()
  const [added, setAdded] = useState(false)

  const cartQuantity = cart?.items.find((i) => i.productId === product.id)?.quantity ?? 0
  const maxReached = cartQuantity >= product.totalStock

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (outOfStock || added || maxReached) return
    addItem(product.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div
      className="group relative flex flex-col gap-2 cursor-pointer"
      onClick={() => navigate(ROUTES.PRODUCT(product.slug))}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <Badge outOfStock={outOfStock} badge={product.badge} />
        <img
          alt={product.name}
          loading="lazy"
          src={product.images[0]}
          className={clsx(
            'h-full w-full object-cover aspect-3/4 dark:brightness-90 transition-[opacity,transform] duration-300',
            outOfStock ? 'opacity-40' : 'group-hover:scale-[1.03]',
          )}
        />
        {!outOfStock && !maxReached && <CartButton added={added} onClick={handleAddToCart} />}
      </div>

      <div className="py-3 gap-1">
        <p className="text-muted uppercase font-bold text-xs">{product.category}</p>
        <p className={clsx('font-medium', outOfStock && 'text-muted')}>{product.name}</p>
        <p className="font-bold">{formatPrice(product.price)}</p>
      </div>
    </div>
  )
}

export default ProductCard
