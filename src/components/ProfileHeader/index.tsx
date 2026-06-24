import { Button } from '@heroui/react'
import { useNavigate } from 'react-router'
import type { User } from '../../types/user'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../config/routes'

interface ProfileHeaderProps {
  user: User
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const { user: authUser, isInitialized } = useAuth()
  const navigate = useNavigate()
  const isOwnProfile = authUser?.id === user.id

  return (
    <div className="flex justify-center px-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl w-full">
        <img
          src={user.profileImage}
          alt={user.name}
          className="w-48 h-48 rounded-full object-cover shrink-0"
        />

        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">{user.name}</h1>
            <p>{user.bio}</p>
          </div>

          {isInitialized && (
            <div className="flex flex-wrap gap-2">
              {isOwnProfile ? (
                <Button
                  variant="outline"
                  className="px-6 font-medium"
                  onClick={() => navigate(ROUTES.PROFILE_EDIT)}
                >
                  Editar perfil
                </Button>
              ) : (
                <Button variant="primary" className="px-6 font-medium">
                  Seguir
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
