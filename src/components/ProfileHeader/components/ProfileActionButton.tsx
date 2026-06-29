import { Button } from '@heroui/react'
import EditProfileModal from '../../../pages/profile/EditProfileModal.tsx'

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
    return <EditProfileModal triggerLabel="Editar perfil" onSuccess={onEditProfile} />
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
