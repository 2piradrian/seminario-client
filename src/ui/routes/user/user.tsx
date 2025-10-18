import { Profile } from "../../../domain";
import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ProfileFeed from "../../components/organisms/profile-feed/profile-feed";
import ViewModel from "./viewmodel";

export default function UserRoute(){

    const {
        toggleFollow, 
        userProfile,
        onFollowersClick, 
        onFollowingClick,
        onClickDelete,
        onClickOnAvatar,
        onClickOnComments,
        handleVotePost, 
        posts,
        onClickOnPost,
        cancelDelete, 
        isMine, 
        proceedDelete, 
        isDeleteOpen,
        onClickOnCreatePost,
        onClickOnCreatePage,
        onClickOnEditProfile
    } = ViewModel();

    return (
        <Layout withHeader={true}>
            { userProfile &&
                <>
                    <ProfileHeader 
                        isFollowing={userProfile.isFollowing}
                        onClick={toggleFollow}
                        onClickOnEditProfile={onClickOnEditProfile}
                        onClickOnCreatePost={onClickOnCreatePost}
                        onClickOnCreatePage={onClickOnCreatePage}
                        ownProfile={userProfile.ownProfile}
                        profile={Profile.fromEntity(userProfile, undefined)}   
                        followersCount={userProfile.followersCount}      
                        followingCount={userProfile.followingCount}
                        onFollowersClick={onFollowersClick}
                        onFollowingClick={onFollowingClick}        
                    />
                    <ProfileFeed
                        userProfile={userProfile}
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