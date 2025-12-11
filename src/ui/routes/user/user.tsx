import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ProfileFeed from "../../components/organisms/profile-feed/profile-feed";
import ViewModel from "./viewmodel";

export default function UserRoute(){

    const {
        toggleFollow, 
        toggleMenu,
        activeMenuId,
        closeMenu,
        user,
        onFollowersClick, 
        onFollowingClick,
        onClickDelete,
        onClickOnAvatarItem,
        onClickonAvatarReview,
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
        onClickOnCreateEvent,
        onClickOnEditProfile,
        activeTab,
        onTabClick,
        events,
        onClickOnEvent,
        review,
        onClickOnCreateReview,
        onClickEditEvent,
        onClickEditPost,
        onClickOnCalendar,
        currentUserId,
        currentUser,
        onClickOnChat,
        onLogout,
        postTypes
    } = ViewModel();

    return (
        <Layout 
            withHeader={true}
            headerProfile={currentUser ? currentUser.profile.toProfile() : undefined}
            onLogout={onLogout}
        >
            { user && postTypes &&
                <>
                    <ProfileHeader 
                        isFollowing={user.profile.isFollowing}
                        onClick={toggleFollow}
                        onClickOnEditProfile={onClickOnEditProfile}
                        onClickOnCreatePost={onClickOnCreatePost}
                        onClickOnCreatePage={onClickOnCreatePage}
                        ownProfile={isMine}
                        profile={user.profile.toProfile()}   
                        followersQuantity={user.profile.followersQuantity}      
                        followingQuantity={user.profile.followingQuantity}
                        onFollowersClick={onFollowersClick}
                        onFollowingClick={onFollowingClick}        
                        onClickOnCalendar={onClickOnCalendar}
                        onClickOnChat={onClickOnChat}
                    />
                    <ProfileFeed
                        userProfile={user.profile}
                        activeTab={activeTab}
                        onTabClick={onTabClick}
                        posts={posts}
                        isMine={isMine}
                        onProfileClick={() => { }}
                        onClickOnCreatePost={onClickOnCreatePost} 

                        onClickOnPost={onClickOnPost}
                        onClickOnComments={onClickOnComments}
                        handleVotePost={handleVotePost}
                        onClickOnAvatarPost={onClickOnAvatarItem}
                        onClickDeletePost={onClickDelete}
                        onClickEditPost={onClickEditPost}

                        events={events}
                        onClickOnEvent={onClickOnEvent}
                        onClickOnAvatarEvent={onClickOnAvatarItem}
                        onClickDeleteEvent={onClickDelete}
                        onClickEditEvent={onClickEditEvent}
                        onClickOnCreateEvent={onClickOnCreateEvent}

                        reviews={review}
                        onClickOnAvatarReview={onClickonAvatarReview}
                        onClickDeleteReview={onClickDelete}
                        onClickOnCreateReview={onClickOnCreateReview}
                        currentUserId={currentUserId}

                        cancelDelete={cancelDelete}
                        proceedDelete={proceedDelete}
                        isDeleteOpen={isDeleteOpen}
                        activeMenuId={activeMenuId}
                        onToggleMenu={toggleMenu}
                        onCloseMenu={closeMenu}
                        postTypes={postTypes}
                    />
                    
                </>
            }
        </Layout>
    )
}
