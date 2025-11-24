import ProfileFeed from "../../components/organisms/profile-feed/profile-feed";
import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";


export default function PageProfileRoute() {
    
    const { 
        pageProfile, 
        user,
        toggleFollow,
        onFollowersClick,
        onClickOnComments,
        onClickDelete,
        handleVotePost,
        posts,
        events,
        review,
        isMine,
        cancelDelete,
        proceedDelete,
        isDeleteOpen,
        onClickOnPost,
        onClickOnMember,
        activeTab,
        onClickOnAvatarItem,
        onTabClick,
        onClickOnEvent,
        onClickOnCreateEvent,
        onClickOnCreatePost,
        onProfileClick,
        onClickOnCalendar,
        onClickEditPost,
        onClickEditEvent,
        onClickonAvatarReview,
    } = ViewModel();

    return(
     <Layout 
        withHeader={true}
        headerProfile={user ? user.profile.toProfile() : undefined}
     >
            { pageProfile && posts &&
                <>
                    <ProfileHeader 
                        isFollowing={pageProfile.isFollowing}
                        onClick={toggleFollow}
                        profile={pageProfile.toProfile()}
                        ownProfile={false}
                        followersQuantity={pageProfile.followersQuantity}
                        onFollowersClick={onFollowersClick}
                        onClickOnEditProfile={() => {}}     
                        onClickOnCalendar={onClickOnCalendar}
                    />
                    <ProfileFeed
                        pageProfile={pageProfile}
                        cancelDelete={cancelDelete}
                        proceedDelete={proceedDelete}
                        isDeleteOpen={isDeleteOpen}
                        onClickOnMember={onClickOnMember}
                        posts={posts}
                        handleVotePost={handleVotePost}
                        onClickOnComments={onClickOnComments}
                        onClickOnAvatarPost={onClickOnAvatarItem}
                        onClickDeletePost={onClickDelete}
                        isMine={isMine}
                        onClickOnPost={onClickOnPost}
                        activeTab={activeTab}
                        onTabClick={onTabClick}  
                        events={events}
                        reviews={review}
                        onClickOnAvatarEvent={onClickOnAvatarItem}
                        onClickOnEvent={onClickOnEvent}
                        onClickOnCreateEvent={onClickOnCreateEvent}
                        onClickOnCreatePost={onClickOnCreatePost}
                        onProfileClick={onProfileClick}
                        onClickEditPost={onClickEditPost}
                        onClickEditEvent={onClickEditEvent}
                        onClickOnAvatarReview={onClickonAvatarReview}
                    />
                </>  
            }
        </Layout>
    )
}
