import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";
import ProfileFeed from "../../components/organisms/profile-feed/profile-feed";

export default function ProfileRoute(){

    const { 
        goToEditProfile,
        user, 
        onClickOnAvatarItem, 
        onClickOnComments,
        onClickDelete,
        handleVotePost,
        posts,
        events,
        onClickOnPost,
        isMine,
        cancelDelete,
        proceedDelete,
        isDeleteOpen,
        onFollowersClick,
        onFollowingClick,
        onClickOnCreatePost,
        onClickOnCreatePage,
        onClickOnEvent,
        onClickEditEvent,
        tabs,
        activeTab,
        onTabClick,
        reviews,
        onClickOnReview,
        onClickOnAvatarReview,
        onClickOnCreateReview,
        onClickEditReview,
        onClickOnCreateEvent,
        onClickOnOwnAvatar
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
                        profile={user.toProfile()}
                        ownProfile={true} 
                        followersQuantity={user.profile.followersQuantity}
                        followingQuantity={user.profile.followingQuantity}
                        onFollowersClick={onFollowersClick}
                        onFollowingClick={onFollowingClick}
                    />
                    <ProfileFeed
                        userProfile={user.profile}
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabClick={onTabClick}
                        onClickOnAvatarPost={(post) => onClickOnAvatarItem(post)}
                        onClickOnAvatarEvent={(event) => onClickOnAvatarItem(event)}
                        onClickOnComments={onClickOnComments}
                        onClickDeletePost={onClickDelete}
                        onClickDeleteEvent={onClickDelete}
                        handleVotePost={handleVotePost}
                        events={events} 
                        posts={posts}
                        onClickOnPost={onClickOnPost}
                        onClickOnEvent={onClickOnEvent}
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
