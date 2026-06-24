import SectionCard from '../SectionCard'
import ProductItemRow from '../ProductItemRow'

interface Item {
  id: string
  name: string
  image: string
  quantity: number
  price: number
}

interface Props {
  title: string
  items: Item[]
}

const ItemsCard = ({ title, items }: Props) => (
  <SectionCard title={title}>
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <ProductItemRow
          key={item.id}
          image={item.image}
          name={item.name}
          subtitle={`Cant. ${item.quantity}`}
          price={item.price}
        />
      ))}
    </div>
  </SectionCard>
)

export default ItemsCard
