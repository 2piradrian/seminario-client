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
        onClickOnEvent,
        review,
        onClickEditReview,
        onClickOnCreateReview,
        onClickOnReview,
        onClickEditEvent,
        onClickEditPost
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
                        ownProfile={user.profile.isOwnProfile}
                        profile={user.toProfile()}   
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

                        reviews={review}
                        onClickOnReview={onClickOnReview}
                        onClickOnAvatarReview={onClickOnAvatarItem}
                        onClickDeleteReview={onClickDelete}
                        onClickEditReview={onClickEditReview}
                        onClickOnCreateReview={onClickOnCreateReview}

                        cancelDelete={cancelDelete}
                        proceedDelete={proceedDelete}
                        isDeleteOpen={isDeleteOpen}
                    />
                    
                </>
            }
        </Layout>
    )
}