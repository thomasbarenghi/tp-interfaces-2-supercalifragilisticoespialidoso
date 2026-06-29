import { useParams } from 'react-router'
import { usePageTitle } from '../../hooks/usePageTitle.ts'
import PostGrid from '../../components/PostGrid'
import Main from '../../components/Main'
import { useUser } from '../../hooks/useUser.ts'
import ProfileHeader from '../../components/ProfileHeader'

const Profile = () => {
  usePageTitle('Profile')
  const { id } = useParams<{ id?: string }>()
  const { user, isLoading } = useUser(id)
  return (
    <Main>
      {user && (
        <section className="flex flex-col gap-14">
          <ProfileHeader user={user} />
          <PostGrid posts={user.posts} isLoading={isLoading} skeletonCount={6} />
        </section>
      )}
    </Main>
  )
}

export default Profile
