import { usePageTitle } from '../../hooks/usePageTitle'
import Main from '../../components/Main'
import FeedResults from '../../components/FeedResults'
import { usePosts } from '../../hooks/usePosts'
import { useAuth } from '../../hooks/useAuth'
import Logo from '../../components/Logo'

const Feed = () => {
  usePageTitle('Feed')
  const { user } = useAuth()
  const { posts, page, setPage, totalPages, totalItems, isLoading, error } = usePosts()

  const firstName = user?.name?.trim().split(/\s+/)[0] ?? ''
  const greeting = firstName ? `Hola ${firstName}, bienvenidx a` : 'Hola, bienvenida a'

  return (
    <Main>
      <section className="flex flex-col gap-y-10">
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <h1 className="text-3xl font-semibold sm:text-4xl">
            {greeting}{' '}
            <span className="inline-block h-12 w-auto align-middle">
              <Logo />
            </span>
          </h1>
          <p className="text-sm text-accent">Estas son tus publicaciones del día de hoy</p>
        </div>

        <FeedResults
          posts={posts}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          totalItems={totalItems}
          isLoading={isLoading}
          error={error}
        />
      </section>
    </Main>
  )
}

export default Feed
