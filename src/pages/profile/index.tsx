import { usePageTitle } from '../../hooks/usePageTitle.ts'
import PostGrid from "../../components/PostGrid";
import Main from "../../components/Main";
import { POSTS_PER_PAGE } from "../../hooks/useUserPosts.ts";
import { useUser } from "../../hooks/useUser.ts";
import ProfileHeader from "../../components/ProfileHeader";
import EmptyState from "../../components/EmptyState";
import {ShoppingCart} from "@gravity-ui/icons";
import PostCardSkeleton from "../../components/PostGrid/PostCardSkeleton.tsx";
import PostCard from "../../components/PostCard";
import PostCardEmptyState from "../../components/PostGrid/PostCardEmptyState.tsx";

const Profile = () => {
    usePageTitle('Profile')
    const { user, isLoading } = useUser()
    console.log(user)
    return (
        <Main>
            {
                user && (
                    <section className="flex flex-col gap-14">
                        <ProfileHeader user={user} />

                      <PostGrid posts={user.posts} isLoading={isLoading} skeletonCount={6} user={user} />



                    </section>
                )
            }
        </Main>
    )
}

export default Profile
