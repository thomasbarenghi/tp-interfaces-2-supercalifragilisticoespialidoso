import ConnectionsModal from './ConnectionsModal.tsx'
import type { FollowUser } from '../../../types/user.ts'

interface ProfileStatsProps {
  followers: FollowUser[]
  following: FollowUser[]
}

const ProfileStats = ({ followers, following }: ProfileStatsProps) => {
  return (
    <div className="flex gap-6">
      <ConnectionsModal title="Seguidores" count={followers.length} users={followers} />
      <ConnectionsModal title="Siguiendo" count={following.length} users={following} />
    </div>
  )
}

export default ProfileStats
