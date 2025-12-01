import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";
import ProfileFeed from "../../components/organisms/profile-feed/profile-feed";

export default function ProfileRoute(){

    const { 
        goToEditProfile,
        user, 
        onProfileClick,
        onClickOnAvatarItem, 
        onClickOnComments,
        onClickDelete,
        handleVotePost,
        posts,
        onClickOnPost,
        isMine,
        events,
        review,
        cancelDelete,
        proceedDelete,
        isDeleteOpen,
        onFollowersClick,
        onFollowingClick,
        onClickOnCreatePost,
        onClickOnCreatePage,
        onClickOnCreateReview,
        onClickOnCreateEvent,
        onClickOnEvent,
        onClickEditPost,
        onClickEditEvent,
        onClickonAvatarReview,
        activeTab,
        onTabClick,
        onClickOnCalendar
    } = ViewModel();

    return (
        <Layout 
            withHeader={true}
            headerProfile={user ? user.toProfile() : undefined}
        >
            { user && posts &&
                <>
                    <ProfileHeader 
                        isFollowing
                        onClickOnEditProfile={goToEditProfile} 
                        onClickOnCreatePost={onClickOnCreatePost}
                        onClickOnCreatePage={onClickOnCreatePage}
                        profile={user.toProfile()}
                        ownProfile={true} 
                        followersQuantity={user.profile.followersQuantity}
                        followingQuantity={user.profile.followingQuantity}
                        onFollowersClick={onFollowersClick}
                        onFollowingClick={onFollowingClick}
                        onClickOnCalendar={onClickOnCalendar}
                    />
                    <ProfileFeed
                        userProfile={user.profile}
                        activeTab={activeTab}
                        onTabClick={onTabClick}
                        onProfileClick={onProfileClick}
                        onClickEditPost={onClickEditPost}
                        onClickEditEvent={onClickEditEvent} 
                        onClickOnAvatarPost={(post) => onClickOnAvatarItem(post)}
                        onClickOnAvatarEvent={(event) => onClickOnAvatarItem(event)}
                        onClickOnAvatarReview={onClickonAvatarReview}
                        onClickOnComments={onClickOnComments}
                        onClickDeletePost={onClickDelete}
                        onClickDeleteEvent={onClickDelete}
                        onClickDeleteReview={onClickDelete}
                        handleVotePost={handleVotePost}
                        events={events}
                        posts={posts}
                        onClickOnPost={onClickOnPost}
                        onClickOnEvent={onClickOnEvent}
                        reviews={review}
                        isMine={isMine}
                        onClickOnCreatePost={onClickOnCreatePost}
                        onClickOnCreateReview={onClickOnCreateReview}
                        onClickOnCreateEvent={onClickOnCreateEvent}
                        cancelDelete={cancelDelete}
                        proceedDelete={proceedDelete}
                        isDeleteOpen={isDeleteOpen}
                    />

                </>  
            }
        </Layout>
    )

}
