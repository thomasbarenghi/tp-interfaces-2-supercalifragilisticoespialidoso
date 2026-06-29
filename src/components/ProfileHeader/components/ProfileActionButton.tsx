import { Button } from '@heroui/react'

interface ProfileActionButtonProps {
  isOwnProfile: boolean
  isFollowing: boolean
  isLoading: boolean
  onEditProfile: () => void
  onToggleFollow: () => void
}

const ProfileActionButton = ({
  isOwnProfile,
  isFollowing,
  isLoading,
  onEditProfile,
  onToggleFollow,
}: ProfileActionButtonProps) => {
  if (isOwnProfile) {
    return (
      <Button variant="outline" onClick={onEditProfile}>
        Editar perfil
      </Button>
    )
  }

  return (
    <Button
      variant={isFollowing ? 'outline' : 'primary'}
      isDisabled={isLoading}
      onClick={onToggleFollow}
    >
      {isFollowing ? 'Dejar de seguir' : 'Seguir'}
    </Button>
  )
}

export default ProfileActionButton
