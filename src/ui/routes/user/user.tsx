import { Profile } from "../../../domain";
import UserProfileDetail from "../../components/organisms/user-profile-detail/user-profile-detail";
import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";
import ProfileFeed from "../../components/organisms/profile-feed/profile-feed";

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
        isDeleteOpen
    } = ViewModel();

    return (
        <Layout withHeader={true}>
            { userProfile &&
                <>
                    <ProfileHeader 
                        isFollowing={userProfile.isFollowing}
                        onClick={toggleFollow}
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