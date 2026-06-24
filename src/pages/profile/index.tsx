import { usePageTitle } from '../../hooks/usePageTitle.ts'
import ProductGrid from "../../components/PostGrid";
import Main from "../../components/Main";
import {POSTS_PER_PAGE} from "../../hooks/useUserPosts.ts";
import {useUser} from "../../hooks/useUser.ts";

const Profile = () => {
    usePageTitle('Profile')
    const { user, isLoading } = useUser()

    return (
        <Main>
            hola {user.name}
            {
                user && (
                    <section className="flex flex-col gap-y-12">
                        <ProductGrid posts={user.posts ?? []} isLoading={isLoading} skeletonCount={POSTS_PER_PAGE} />
                    </section>
                )
            }
        </Main>
    )
}

export default Profile
