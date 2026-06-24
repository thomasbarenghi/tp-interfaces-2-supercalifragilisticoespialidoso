import { Button } from '@heroui/react'
import type { User } from '../../types/user'
interface ProfileHeaderProps {
  user: User
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
      <div className="flex justify-center px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl w-full">
          <img
              src={user.profileImage || 'https://via.placeholder.com/150'}
              alt={user.name}
              className="w-48 h-48 rounded-full object-cover shrink-0"
          />

          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold">{user.name}</h1>
              <p>{user.bio}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="px-6 font-medium"
              >
                Seguir
              </Button>

              <Button
                variant="ghost"
                className="px-6 font-medium"
              >
                Editar perfil
              </Button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ProfileHeader