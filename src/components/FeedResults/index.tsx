import { Alert } from '@heroui/react'
import PostGrid from '../../components/PostGrid'
import Paginator from '../../components/Paginator'
import { POSTS_PER_PAGE } from '../../hooks/usePosts'
import type { Post } from '../../types/post'

type FeedResultsProps = {
  posts: Post[]
  page: number
  setPage: (page: number) => void
  totalPages: number
  totalItems: number
  isLoading: boolean
  error: unknown
}

const FeedResults = ({
  posts,
  page,
  setPage,
  totalPages,
  totalItems,
  isLoading,
  error,
}: FeedResultsProps) => {
  if (error) {
    return <Alert status="danger">No se pudieron cargar las publicaciones.</Alert>
  }

  if (!isLoading && posts.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-8 text-center text-muted">
        Todavía no hay publicaciones para mostrar.
      </div>
    )
  }

  return (
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
}

export default FeedResults
