import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Chip } from '@heroui/react'
import { ArrowLeft, ArrowRotateLeft, ShoppingCart } from '@gravity-ui/icons'
import CollectionBanner from '../../../components/CollectionBanner'
import InfoCard from '../../../components/InfoCard'
import Main from '../../../components/Main'
import TwoColumnLayout from '../../../components/TwoColumnLayout'
import { formatPrice } from '../../../utils/format'
import { useCart } from '../../../hooks/useCart'
import { ROUTES } from '../../../config/routes'
import type { Product } from '../../../types/product'

const formatSales = (count: number) =>
  count >= 1000 ? `+${Math.floor(count / 1000)}k` : `+${count}`

const addToCartLabel = (outOfStock: boolean, added: boolean, maxReached: boolean) => {
  if (outOfStock || maxReached) return 'Sin stock'
  if (added) return 'Agregado al carrito'
  return 'Agregar al carrito'
}

interface Props {
  product: Product
}

const ProductDetailView = ({ product }: Props) => {
  const navigate = useNavigate()
  const { addItem, cart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [added, setAdded] = useState(false)

  const outOfStock = product.totalStock === 0
  const cartQuantity = cart?.items.find((i) => i.productId === product.id)?.quantity ?? 0
  const maxReached = cartQuantity >= product.totalStock

  const handleAddToCart = () => {
    if (outOfStock || maxReached) return
    addItem(product.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Main contentClassName="flex flex-col gap-y-12">
      <CollectionBanner
        eyebrow="Cápsula Denim 2.0 — Edición limitada"
        title="Para los que vuelven cuando amanece"
        description="Diez piezas. Una sola noche para conseguirlas."
        image="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=2000&q=100"
        action={{
          label: 'Conseguí la tuya',
          onClick: () => navigate(`${ROUTES.LIST}?badge=capsula`),
        }}
      />

      <div className="flex flex-col gap-y-8">
        <button
          onClick={() => navigate(ROUTES.LIST)}
          className="flex items-center gap-2 text-sm hover:text-foreground transition-colors self-start"
        >
          <ArrowLeft width={14} height={14} />
          Volver al catálogo
        </button>

        <TwoColumnLayout gap="xl">
          <TwoColumnLayout.Main>
            <div className="flex flex-col gap-3 lg:gap-7.5">
              <div className="rounded-2xl overflow-hidden aspect-17/18 w-full">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover dark:brightness-90 transition-[filter]"
                />
              </div>
              <div className="flex gap-3 lg:gap-7.5">
                {product.images.slice(0, 3).map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? 'border-(--accent)' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover dark:brightness-90 transition-[filter]"
                    />
                  </button>
                ))}
              </div>
            </div>
          </TwoColumnLayout.Main>

          <TwoColumnLayout.Sidebar>
            <div className="flex flex-col gap-7.5 lg:py-10">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  {product.badge && (
                    <Chip color="accent" variant="primary" className="uppercase font-bold">
                      {product.badge}
                    </Chip>
                  )}
                  <p className="text-muted uppercase font-bold text-xs tracking-wide">
                    {product.category}
                  </p>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-[1.3]">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold text-sm">★★★★★</span>
                  <span className="font-bold text-sm">{product.rating.average}</span>
                  <span className="size-0.75 rounded-full bg-muted shrink-0" />
                  <span className="text-muted text-sm">
                    {formatSales(product.salesCount)} vendidos
                  </span>
                  <span className="size-0.75 rounded-full bg-muted shrink-0" />
                  <span className="text-muted text-sm">{product.totalStock} en stock</span>
                </div>

                <p className="text-base leading-relaxed">{product.description}</p>
              </div>

              <div>
                {product.features?.length > 0 && (
                  <ul className="flex flex-col gap-1.5">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-base">
                        <span className="size-1 rounded-full bg-muted shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <p className="text-xl lg:text-2xl font-bold">{formatPrice(product.price)}</p>
              <Button
                variant={added ? 'outline' : 'primary'}
                fullWidth
                className="rounded-full"
                onPress={handleAddToCart}
                isDisabled={added || outOfStock || maxReached}
              >
                <ShoppingCart width={16} height={16} />
                {addToCartLabel(outOfStock, added, maxReached)}
              </Button>
              <InfoCard
                icon={<ArrowRotateLeft width={18} height={18} className="text-(--accent)" />}
                title="Cambios gratis 30 días"
                description="Cambios y devoluciones a domicilio sin costo"
                onClick={() => navigate(ROUTES.CONTACT)}
              />
            </div>
          </TwoColumnLayout.Sidebar>
        </TwoColumnLayout>
      </div>
    </Main>
  )
}

export default ProductDetailView
