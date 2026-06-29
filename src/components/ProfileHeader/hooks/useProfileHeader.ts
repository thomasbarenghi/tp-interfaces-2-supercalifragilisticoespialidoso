import { useNavigate } from 'react-router'
import { useAuth } from '../../../hooks/useAuth.ts'
import { useFollow } from '../../../hooks/useFollow.ts'
import { ROUTES } from '../../../config/routes.ts'
import type { User } from '../../../types/user.ts'

export const useProfileHeader = (user: User) => {
  const { user: authUser, isInitialized } = useAuth()
  const navigate = useNavigate()

  const isOwnProfile = authUser?.id === user.id || authUser?._id === user._id
  const authId = authUser?.id || authUser?._id

  const isFollowing =
    !!authId && (user.followers ?? []).some((f) => f._id === authId || f.id === authId)

  const { follow, unfollow, isLoading } = useFollow(user._id || user.id, user.nickName, authId)

  const handleFollowToggle = () => {
    if (isFollowing) {
      unfollow()
      return
    }

    follow()
  }

  const handleEditProfile = () => navigate(ROUTES.PROFILE_EDIT)

  return {
    isInitialized,
    isOwnProfile,
    isFollowing,
    isLoading,
    handleFollowToggle,
    handleEditProfile,
  }
}
