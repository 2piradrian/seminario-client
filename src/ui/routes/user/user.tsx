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
        userPages,
        onFollowersClick, 
        onFollowingClick,
        onClickDelete,
        onClickCancel,
        onClickOnPage,
        onClickOnAvatarItem,
        onClickonAvatarReview,
        onClickOnComments,
        handleVotePost, 
        posts,
        onClickOnPost,
        cancelDelete,
        cancelCancelEvent,
        isMine,
        isAdminOrMod,
        proceedDelete,
        proceedCancel,
        isDeleteOpen,
        isCancelOpen,
        onClickOnCreatePost,
        onClickOnCreatePage,
        onClickOnCreateEvent,
        onClickOnEditProfile,
        activeTab,
        onTabClick,
        events,
        onClickOnEvent,
        review,
        onClickEditEvent,
        onClickEditPost,
        onClickOnCalendar,
        currentUserId,
        currentUser,
        onClickOnChat,
        onLogout,
        postTypes,
        newReviewRating,
        onReviewRatingChange,
        onSubmitReview,
        handleSharePost,
        isAdmin,
        onClickOnBanUser,
        cancelBanUser,
        proceedBanUser,
        isBanUserOpen,
        moderationReasons,
        selectedModerationReason,
        setSelectedModerationReason,
        onClickEditReview,     
        editingReview, 
        onEditReview,
        cancelEditReview,
        editingRating,
        onEditingRatingChange,

    } = ViewModel();

    return (
        <Layout 
            withHeader={true}
            headerProfile={currentUser ? currentUser.profile.toProfile() : undefined}
            onLogout={onLogout}
            user={user}
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
                        isAdmin={isAdmin}
                        onClickOnBanUser={onClickOnBanUser}
                        cancelBanUser={cancelBanUser}
                        proceedBanUser={proceedBanUser}
                        isBanUserOpen={isBanUserOpen}
                        moderationReasonOptions={moderationReasons.map(r => r.name)}
                        selectedModerationReason={selectedModerationReason}
                        onModerationReasonChange={setSelectedModerationReason}
                    />
                    <ProfileFeed
                        userProfile={user.profile}
                        activeTab={activeTab}
                        onTabClick={onTabClick}
                        posts={posts}
                        userPagesProfiles={userPages}
                        isMine={isMine}
                        isAdminOrMod={isAdminOrMod}
                        onProfileClick={() => { }}
                        onClickOnPage={onClickOnPage}
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
                        onClickCancelEvent={onClickCancel}
                        onClickEditEvent={onClickEditEvent}
                        onClickOnCreateEvent={onClickOnCreateEvent}

                        reviews={review}
                        onClickOnAvatarReview={onClickonAvatarReview}
                        onClickDeleteReview={onClickDelete}
                        currentUserId={currentUserId}

                        cancelDelete={cancelDelete}
                        cancelCancelEvent={cancelCancelEvent}
                        proceedDelete={proceedDelete}
                        proceedCancel={proceedCancel}
                        isDeleteOpen={isDeleteOpen}
                        activeMenuId={activeMenuId}
                        onToggleMenu={toggleMenu}
                        onCloseMenu={closeMenu}
                        postTypes={postTypes}
                        isCancelOpen={isCancelOpen}

                        reviewRating={newReviewRating}
                        onReviewRatingChange={onReviewRatingChange}
                        onSubmitReview={onSubmitReview}
                        onClickEditReview={onClickEditReview}
                        editingReview={editingReview}
                        onUpdateReview={onEditReview}
                        onCancelEditReview={cancelEditReview}
                        editingRating={editingRating}
                        onEditingRatingChange={onEditingRatingChange}

                        onClickSharePost={handleSharePost}
                    />
                    
                </>
            }
        </Layout>
    )
}
