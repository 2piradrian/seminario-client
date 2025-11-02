import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";
import { Profile } from "../../../domain";
import ProfileFeed from "../../components/organisms/profile-feed/profile-feed";

export default function ProfileRoute(){

    const { 
        goToEditProfile,
        user, 
        onClickOnAvatar, 
        onClickOnComments,
        onClickDelete,
        handleVotePost,
        posts,
        onClickOnPost,
        isMine,
        cancelDelete,
        proceedDelete,
        isDeleteOpen,
        onFollowersClick,
        onFollowingClick,
        onClickOnCreatePost,
        onClickOnCreatePage,
    } = ViewModel();

    return (
        <Layout withHeader={true}>
            { user && posts &&
                <>
                    <ProfileHeader 
                        isFollowing
                        onClickOnEditProfile={goToEditProfile} 
                        onClickOnCreatePost={onClickOnCreatePost}
                        onClickOnCreatePage={onClickOnCreatePage}
                        profile={Profile.fromEntity(user, undefined)}
                        ownProfile={true} 
                        followersQuantity={user.profile.followersQuantity}
                        followingQuantity={user.profile.followingQuantity}
                        onFollowersClick={onFollowersClick}
                        onFollowingClick={onFollowingClick}
                    />
                    <ProfileFeed
                        userProfile={user.profile}
                        onClickOnAvatar={(post) => onClickOnAvatar(post)}
                        onClickOnComments={onClickOnComments}
                        onClickDelete={onClickDelete}
                        handleVotePost={handleVotePost} 
                        posts={posts}
                        onClickOnPost={onClickOnPost}
                        isMine={isMine}
                        cancelDelete={cancelDelete}
                        proceedDelete={proceedDelete}
                        isDeleteOpen={isDeleteOpen}
                    />

                </>  
            }
        </Layout>
    )

}