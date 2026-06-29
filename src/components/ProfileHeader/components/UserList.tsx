import { Avatar, Link } from '@heroui/react'
import type { FollowUser } from '../../../types/user.ts'
import { ROUTES } from '../../../config/routes.ts'

const UserList = ({ users }: { users: FollowUser[] }) => {
  if (users.length === 0) {
    return <p className="text-center text-default-500 py-6">No hay usuarios para mostrar.</p>
  }

  return (
    <div className="flex max-h-80 flex-col gap-3 overflow-y-auto">
      {users.map((user) => (
        <Link href={ROUTES.PROFILE(user.nickName)} className="hover:no-underline">
          <div className="flex items-center gap-2 cursor-pointer rounded-full">
            <Avatar size="lg">
              <Avatar.Image src={user?.profileImage} alt={user?.name} className="object-cover" />
              <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-foreground">{user?.name}</span>
              <span className="text-foreground font-light">@{user?.nickName}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default UserList
