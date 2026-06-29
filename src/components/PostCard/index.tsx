import { useNavigate } from 'react-router'
import clsx from 'clsx'
import { ROUTES } from '../../config/routes'
import type { Post } from '../../types/post.ts'
import { formatRelativeDate } from '../../utils/format.ts'

interface PostCardProps {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  const navigate = useNavigate()
  const { author } = post

  return (
    <div
      className="group relative flex flex-col gap-3 cursor-pointer"
      onClick={() => navigate(ROUTES.POST(post._id))}
    >
      {author && (
        <div className="flex items-center gap-2 px-1">
          <img
            src={author.profileImage || 'https://via.placeholder.com/40'}
            alt={author.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <div className="flex items-center gap-1 text-xs font-semibold">
            <span
              className="hover:no-underline"
              onClick={(e) => {
                e.stopPropagation()
                navigate(ROUTES.PROFILE(author.nickName))
              }}
            >
              {author.name}
            </span>
            <span className="text-gray-400 font-normal">
              | {formatRelativeDate(post.createdAt)}
            </span>
          </div>
        </div>
      )}
      {post.images?.[0]?.url && (
        <div className="relative overflow-hidden rounded-2xl">
          <img
            alt={post._id}
            loading="lazy"
            src={post.images[0].url}
            className={clsx(
              'h-full w-full object-cover aspect-3/4 dark:brightness-90 transition-[opacity,transform] duration-300 group-hover:scale-[1.03]',
            )}
          />
        </div>
      )}
      <div className="px-1">
        <p className="text-sm line-clamp-2 leading-relaxed">
          {post.description ||
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper augue ex, consequat accumsan elit efficitur in....'}
        </p>
        <button className="text-sm font-bold mt-1">Ver mas</button>
      </div>
    </div>
  )
}

export default PostCard
