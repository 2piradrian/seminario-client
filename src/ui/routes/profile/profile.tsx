import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";
import { Profile } from "../../../domain";
import ProfileFeed from "../../components/organisms/profile-feed/profile-feed";

export default function ProfileRoute(){

    const { 
        goToEditProfile, 
        profile,
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
            { profile && posts &&
                <>
                    <ProfileHeader 
                        isFollowing
                        onClickOnEditProfile={goToEditProfile} 
                        onClickOnCreatePost={onClickOnCreatePost}
                        onClickOnCreatePage={onClickOnCreatePage}
                        profile={Profile.fromEntity(profile, undefined)}
                        ownProfile={true} 
                        followersCount={profile.followersCount}
                        followingCount={profile.followingCount}
                        onFollowersClick={onFollowersClick}
                        onFollowingClick={onFollowingClick}
                    />
                    <ProfileFeed
                        userProfile={profile}
                        onClickOnAvatar={onClickOnAvatar}
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