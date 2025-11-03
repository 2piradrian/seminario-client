import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ProfileFeed from "../../components/organisms/profile-feed/profile-feed";
import ViewModel from "./viewmodel";

export default function UserRoute(){

    const {
        toggleFollow, 
        user,
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
            { user &&
                <>
                    <ProfileHeader 
                        isFollowing={user.profile.isFollowing}
                        onClick={toggleFollow}
                        onClickOnEditProfile={onClickOnEditProfile}
                        onClickOnCreatePost={onClickOnCreatePost}
                        onClickOnCreatePage={onClickOnCreatePage}
                        ownProfile={user.profile.ownProfile}
                        profile={user.toProfile()}   
                        followersQuantity={user.profile.followersQuantity}      
                        followingQuantity={user.profile.followingQuantity}
                        onFollowersClick={onFollowersClick}
                        onFollowingClick={onFollowingClick}        
                    />
                    <ProfileFeed
                        userProfile={user.profile}
                        onClickOnAvatar={onClickOnAvatar}
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