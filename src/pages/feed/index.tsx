import { Alert } from '@heroui/react'
import { usePageTitle } from '../../hooks/usePageTitle.ts'
import Main from '../../components/Main'
import PostGrid from '../../components/PostGrid'
import Paginator from '../../components/Paginator'
import { POSTS_PER_PAGE, usePosts } from '../../hooks/usePosts'
import { useAuth } from '../../hooks/useAuth.ts'
import Logo from '../../components/Logo'

const Feed = () => {
  usePageTitle('Feed')
  const { user } = useAuth()

  const { posts, page, setPage, totalPages, totalItems, isLoading, error } = usePosts()

  const hasPosts = !error && (isLoading || posts.length > 0)
  const isEmpty = !isLoading && !error && posts.length === 0
  const firstName = user?.name?.trim().split(/\s+/)[0] ?? ''
  const greeting = firstName ? `Hola ${firstName}, bienvenida a` : 'Hola, bienvenida a'
  let content = null

  if (hasPosts) {
    content = (
      <>
        <PostGrid posts={posts} isLoading={isLoading} skeletonCount={POSTS_PER_PAGE} />
        <Paginator
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={POSTS_PER_PAGE}
          onPageChange={setPage}
          itemLabel="publicaciones"
        />
      </>
    )
  } else if (isEmpty) {
    content = (
      <div className="rounded-3xl border border-border bg-surface p-8 text-center text-muted">
        Todavía no hay publicaciones para mostrar.
      </div>
    )
  }

  return (
    <Main>
      <section className="flex flex-col gap-y-10">
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <h1 className="text-3xl font-semibold sm:text-4xl">
            {greeting} <Logo className="inline-block h-12 w-auto align-middle" />
          </h1>
          <p className="text-sm text-accent">Estas son tus publicaciones del día de hoy</p>
        </div>

        {error && <Alert status="danger">No se pudieron cargar las publicaciones.</Alert>}
        {content}
      </section>
    </Main>
  )
}

export default Feed
