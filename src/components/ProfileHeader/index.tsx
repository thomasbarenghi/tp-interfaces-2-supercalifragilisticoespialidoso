import type { User } from '../../types/user'
import ProfileInfo from './components/ProfileInfo.tsx'
import ProfileStats from './components/ProfileStats.tsx'
import ProfileActionButton from './components/ProfileActionButton.tsx'
import { useProfileHeader } from './hooks/useProfileHeader.ts'

interface ProfileHeaderProps {
  user: User
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const {
    isInitialized,
    isOwnProfile,
    isFollowing,
    isLoading,
    handleFollowToggle,
    handleEditProfile,
  } = useProfileHeader(user)

  return (
    <div className="flex justify-center px-4">
      <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-8 md:flex-row">
        <img
          src={user.profileImage}
          alt={user.name}
          className="h-48 w-48 rounded-full object-cover"
        />

        <div className="flex flex-col items-center gap-4 md:items-start">
          <ProfileInfo name={user.name} bio={user.bio} />
          <ProfileStats followers={user.followers ?? []} following={user.following ?? []} />

          {isInitialized && (
            <ProfileActionButton
              isOwnProfile={isOwnProfile}
              isFollowing={isFollowing}
              isLoading={isLoading}
              onEditProfile={handleEditProfile}
              onToggleFollow={handleFollowToggle}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
