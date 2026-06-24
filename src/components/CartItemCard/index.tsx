import { Button, Card, Skeleton } from '@heroui/react'
import { Minus, Plus } from '@gravity-ui/icons'
import { formatPrice } from '../../utils/format'

export interface CartItem {
  id: string
  productId: string
  name: string
  category: string
  image: string
  quantity: number
  stock: number
  unitPrice: number
  price: number
}

interface Props {
  item: CartItem
  isLoading?: boolean
  onIncrement: () => void
  onDecrement: () => void
  onRemove: () => void
}

const CartItemCard = ({ item, isLoading, onIncrement, onDecrement, onRemove }: Props) => (
  <Card>
    <Card.Content>
      <div className="flex gap-4">
        <div className="w-24 overflow-hidden shrink-0 h-28 rounded-xl bg-default-100">
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <img
              src={item.image}
              alt={item.name}
              className="object-cover w-full h-full dark:brightness-90"
            />
          )}
        </div>

        <div className="flex flex-col justify-between flex-1 min-w-0 py-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col min-w-0 gap-1">
              {isLoading ? (
                <Skeleton className="w-40 h-4 rounded" />
              ) : (
                <p className="font-semibold leading-tight text-md line-clamp-2">{item.name}</p>
              )}
              {isLoading ? (
                <Skeleton className="w-24 h-3 rounded" />
              ) : (
                <p className="text-xs capitalize text-muted">{item.category}</p>
              )}
            </div>
            {isLoading ? (
              <Skeleton className="w-24 h-5 rounded shrink-0" />
            ) : (
              <p className="text-base font-bold shrink-0">{formatPrice(item.unitPrice)}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                isIconOnly
                size="sm"
                variant="outline"
                className="rounded-full size-8 min-w-8"
                onPress={onDecrement}
                isDisabled={isLoading}
                aria-label="Disminuir cantidad"
              >
                <Minus width={14} height={14} />
              </Button>
              <span className="w-6 text-sm font-medium text-center tabular-nums">
                {item.quantity}
              </span>
              <Button
                isIconOnly
                size="sm"
                variant="outline"
                className="rounded-full size-8 min-w-8"
                onPress={onIncrement}
                isDisabled={isLoading || item.quantity >= item.stock}
                aria-label="Aumentar cantidad"
              >
                <Plus width={14} height={14} />
              </Button>
            </div>

            <Button
              size="sm"
              variant="ghost"
              className="h-auto px-1 text-xs text-default-400 hover:text-danger"
              onPress={onRemove}
              isDisabled={isLoading}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </Card.Content>
  </Card>
)

export default CartItemCard
