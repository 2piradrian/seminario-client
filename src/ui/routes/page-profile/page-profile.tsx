import Loading from "../../components/atoms/loading/loading";
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
        onClickCancel,
        handleVotePost,
        posts,
        events,
        review,
        isMine,
        isAdminOrMod,
        cancelDelete,
        cancelCancelEvent,
        proceedDelete,
        proceedCancel,
        isDeleteOpen,
        isCancelOpen,
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
        onLogout,
        postTypes,
        onClickEditPage,
        loading,
    } = ViewModel();

    return (
        <Layout
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
        >
            {loading? <Loading /> : ( 
                <>
                    <ProfileHeader
                        isFollowing={pageProfile.isFollowing}
                        onClick={toggleFollow}
                        profile={pageProfile.toProfile()}
                        ownProfile={isMine}
                        followersQuantity={pageProfile.followersQuantity}
                        onFollowersClick={onFollowersClick}
                        onClickOnEditProfile={onClickEditPage}
                        onClickOnCalendar={onClickOnCalendar}
                        isPage={true}
                    />
                    <ProfileFeed
                        pageProfile={pageProfile}
                        cancelDelete={cancelDelete}
                        cancelCancelEvent={cancelCancelEvent}
                        proceedDelete={proceedDelete}
                        proceedCancel={proceedCancel}
                        isDeleteOpen={isDeleteOpen}
                        isCancelOpen={isCancelOpen}
                        onClickOnMember={onClickOnMember}
                        onClickOnPage={() => { }}
                        posts={posts}
                        handleVotePost={handleVotePost}
                        onClickOnComments={onClickOnComments}
                        onClickOnAvatarPost={onClickOnAvatarItem}
                        onClickDeletePost={onClickDelete}
                        isMine={isMine}
                        isAdminOrMod={isAdminOrMod}
                        onClickOnPost={onClickOnPost}
                        activeTab={activeTab}
                        onTabClick={onTabClick}
                        events={events}
                        reviews={review}
                        onClickOnAvatarEvent={onClickOnAvatarItem}
                        onClickOnEvent={onClickOnEvent}
                        onClickCancelEvent={onClickCancel}
                        onClickDeleteEvent={onClickDelete}
                        onClickOnCreateEvent={onClickOnCreateEvent}
                        onClickOnCreatePost={onClickOnCreatePost}
                        onProfileClick={onProfileClick}
                        onClickEditPost={onClickEditPost}
                        onClickEditEvent={onClickEditEvent}
                        onClickOnAvatarReview={onClickonAvatarReview}
                        postTypes={postTypes}
                    />
                </>
            )}
        </Layout>
    )
}
