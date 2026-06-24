import { useNavigate } from 'react-router'
import clsx from 'clsx'
import { ROUTES } from '../../config/routes'
import type {Post} from "../../types/post.ts";

const PostCard = ({ post }: { post: Post }) => {
  const navigate = useNavigate()
  console.log("post: ", post, "")
  return (
    <div
      className="group relative flex flex-col gap-2 cursor-pointer"
      onClick={() => navigate(ROUTES.POST(post._id))}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <img
          alt={post._id}
          loading="lazy"
          src={post.images[0].url}
          className={clsx(
            'h-full w-full object-cover aspect-3/4 dark:brightness-90 transition-[opacity,transform] duration-300 group-hover:scale-[1.03]')}
        />
      </div>
    </div>
  )
}

export default PostCard
