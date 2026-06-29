import { useNavigate, useParams } from 'react-router'
import { Avatar, Button } from '@heroui/react'
import { usePageTitle } from '../../hooks/usePageTitle.ts'
import { usePost } from '../../hooks/usePost.ts'
import { useAuth } from '../../hooks/useAuth.ts'
import Main from '../../components/Main'
import TwoColumnLayout from '../../components/TwoColumnLayout'
import PostComments from '../../components/PostComments'
import PostTags from '../../components/PostTags'
import PostDetailSkeleton from './PostDetailSkeleton'
import { ROUTES } from '../../config/routes.ts'
import { formatRelativeDate } from '../../utils/format.ts'

const PostDetail = () => {
  usePageTitle('Publicación')
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { post, isLoading } = usePost(id!)
  const { user } = useAuth()

  if (isLoading)
    return (
      <Main>
        <PostDetailSkeleton />
      </Main>
    )
  if (!post) {
    navigate(ROUTES.HOME, { replace: true })
    return null
  }

  const { author } = post
  const isAuthor = user?._id === author._id

  return (
    <Main contentClassName="max-w-7xl">
      <TwoColumnLayout gap="xl">
        <TwoColumnLayout.Main>
          <div className="rounded-2xl overflow-hidden">
            <img
              src={post.images[0]?.url}
              alt={post.description}
              className="w-full h-full object-cover aspect-3/4"
            />
          </div>
        </TwoColumnLayout.Main>

        <TwoColumnLayout.Sidebar>
          <div className="flex items-center justify-between pt-10">
            <button
              className="flex items-center gap-3 text-left w-fit cursor-pointer"
              onClick={() => navigate(ROUTES.PROFILE(author.nickName))}
            >
              <Avatar size="md">
                <Avatar.Image
                  src={author.profileImage}
                  alt={author.name}
                  className="object-cover"
                />
                <Avatar.Fallback>{author.name?.[0]}</Avatar.Fallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-base">{author.name}</span>
                <span className="text-sm text-gray-400">{formatRelativeDate(post.createdAt)}</span>
              </div>
            </button>

            {isAuthor && (
              <Button
                variant="outline"
                className="px-6 font-medium"
                onClick={() => navigate(ROUTES.POST_EDIT(id!))}
              >
                Editar
              </Button>
            )}
          </div>

          <p className="text-base leading-relaxed">{post.description}</p>

          <PostTags tags={post.tags} />

          <PostComments postId={post._id} comments={post.comments ?? []} />
        </TwoColumnLayout.Sidebar>
      </TwoColumnLayout>
    </Main>
  )
}

export default PostDetail
