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
        onClickOnAvatarItem,
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
        onClickOnEditProfile,
        tabs,
        activeTab,
        onTabClick,
        events,
        onClickOnEvent
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
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabClick={onTabClick}
                        onClickOnAvatarPost={onClickOnAvatarItem}
                        onClickOnComments={onClickOnComments}
                        onClickDeletePost={onClickDelete}
                        handleVotePost={handleVotePost} 
                        posts={posts}
                        onClickOnPost={onClickOnPost}
                        isMine={isMine}
                        events={events}
                        onClickOnEvent={onClickOnEvent}
                        onClickOnAvatarEvent={onClickOnAvatarItem}
                        onClickDeleteEvent={onClickDelete}
                        cancelDelete={cancelDelete}
                        proceedDelete={proceedDelete}
                        isDeleteOpen={isDeleteOpen}
                    />
                    
                </>
            }
        </Layout>
    )
}