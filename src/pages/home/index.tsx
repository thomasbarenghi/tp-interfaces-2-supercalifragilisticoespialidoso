import { Button, Link } from '@heroui/react'
import { useNavigate } from 'react-router'
import CategoryCard from '../../components/CategoryCard'
import ShowcaseSection from '../../components/ShowcaseSection'
import { categories } from './constants/categories'
import ProductGrid from '../../components/ProductGrid'
import { useProducts } from '../../hooks/useProducts.ts'
import CapsuleBanner from './components/CapsuleBanner.tsx'
import Main from '../../components/Main'
import { usePageTitle } from '../../hooks/usePageTitle.ts'
import { ROUTES } from '../../config/routes'
import HomeHero from './components/HomeHero'

const Home = () => {
  usePageTitle('Inicio')
  const navigate = useNavigate()
  const { products } = useProducts({ limit: 4 })
  return (
    <Main>
      <HomeHero>
        <HomeHero.Content>
          <HomeHero.Badge>Nueva colección · Otoño 2026</HomeHero.Badge>

          <HomeHero.Title>
            Estilo urbano,
            <br />
            para cada día.
          </HomeHero.Title>

          <HomeHero.Description>
            Prendas pensadas para moverte. Denim, algodón y técnicos. Envío gratis en compras desde
            $50.000.
          </HomeHero.Description>

          <HomeHero.Actions>
            <Button size="md" onPress={() => navigate(ROUTES.LIST)}>
              Explorar colección
            </Button>

            <Button
              variant="outline"
              size="md"
              onPress={() =>
                document.getElementById('mas-vendido')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Lo más vendido
            </Button>
          </HomeHero.Actions>

          <HomeHero.Features>
            <HomeHero.Feature>Envío gratis +$50.000</HomeHero.Feature>

            <HomeHero.Feature>6 cuotas sin interés</HomeHero.Feature>

            <HomeHero.Feature>30 días para cambios</HomeHero.Feature>
          </HomeHero.Features>
        </HomeHero.Content>

        <HomeHero.Visual>
          <HomeHero.Rating>4.9 · +12k reseñas</HomeHero.Rating>

          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
            alt="Wild West Vest"
            className="absolute inset-0 h-full w-full object-cover object-center z-[1] opacity-80"
          />
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0A0A0D] via-[#0A0A0D]/40 to-transparent" />

          <a href={ROUTES.PRODUCT('wild-west-vest-black-denim')}>
            <HomeHero.ProductCard>
              <div className="flex items-end gap-6">
                <div>
                  <h3 className="font-semibold text-foreground">Wild West Vest</h3>

                  <p className="text-sm text-muted">Black Denim · Talle S</p>
                </div>

                <span className="font-semibold text-foreground">$329.000</span>
              </div>
            </HomeHero.ProductCard>
          </a>

          <HomeHero.BackgroundText>hero</HomeHero.BackgroundText>
        </HomeHero.Visual>
      </HomeHero>
      <ShowcaseSection>
        <ShowcaseSection.Header>
          <ShowcaseSection.Title eyebrow="CATEGORÍAS" title="Comprá por categoría" />

          <ShowcaseSection.Action>
            <Link
              className="underline underline-offset-2 text-foreground decoration-(--accent)"
              href="/list"
            >
              Ver todo
              <Link.Icon className="text-(--accent)" />
            </Link>
          </ShowcaseSection.Action>
        </ShowcaseSection.Header>

        <ShowcaseSection.Content>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.slug} {...category} />
            ))}
          </div>
        </ShowcaseSection.Content>
      </ShowcaseSection>

      <ShowcaseSection id="mas-vendido">
        <ShowcaseSection.Header>
          <ShowcaseSection.Title eyebrow="MÁS POPULARES" title="Lo más vendido esta semana" />

          <ShowcaseSection.Action>
            <Link
              className="underline underline-offset-2 text-foreground decoration-(--accent)"
              href="/list"
            >
              Ver todo
              <Link.Icon className="text-(--accent)" />
            </Link>
          </ShowcaseSection.Action>
        </ShowcaseSection.Header>

        <ShowcaseSection.Content>
          <ProductGrid products={products} skeletonCount={4} />
        </ShowcaseSection.Content>
      </ShowcaseSection>
      <CapsuleBanner>
        <CapsuleBanner.Content>
          <CapsuleBanner.Eyebrow>EDICIÓN LIMITADA</CapsuleBanner.Eyebrow>

          <CapsuleBanner.Title>La cápsula Denim 2.0</CapsuleBanner.Title>

          <CapsuleBanner.Description>
            Diez piezas únicas en denim reciclado. Diseños limpios, calce relajado y detalles
            utilitarios.
          </CapsuleBanner.Description>

          <CapsuleBanner.Action>
            <Button onPress={() => navigate(`${ROUTES.LIST}?badge=capsula`)}>
              Descubrir cápsula
            </Button>
          </CapsuleBanner.Action>
        </CapsuleBanner.Content>

        <CapsuleBanner.Visual>
          <CapsuleBanner.Number>02</CapsuleBanner.Number>
        </CapsuleBanner.Visual>
      </CapsuleBanner>
    </Main>
  )
}

export default Home
