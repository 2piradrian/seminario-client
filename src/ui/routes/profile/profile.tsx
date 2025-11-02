import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";
import { Profile } from "../../../domain";
import ProfileFeed from "../../components/organisms/profile-feed/profile-feed";

export default function ProfileRoute(){

  const { 
    goToEditProfile, 
    profile,
    onClickOnAvatarItem,
    onClickOnComments,
    onClickDelete,
    handleVotePost,
    posts,
    onClickOnPost,
    isMine,
    cancelDelete,
    proceedDelete,
    isDeleteOpen,
    onClickEditPost,
    onFollowersClick,
    onFollowingClick,
    onClickOnCreatePost,
    onClickOnCreatePage,
    events,
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
      { profile && posts &&
        <>
          <ProfileHeader 
            isFollowing
            onClickOnEditProfile={goToEditProfile} 
            onClickOnCreatePost={onClickOnCreatePost}
            onClickOnCreatePage={onClickOnCreatePage}
            profile={Profile.fromEntity(profile, undefined)}
            ownProfile={true} 
            followersCount={profile.followersCount}
            followingCount={profile.followingCount}
            onFollowersClick={onFollowersClick}
            onFollowingClick={onFollowingClick}
          />
          <ProfileFeed
            userProfile={profile}
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={onTabClick}
            onClickOnOwnAvatar={onClickOnOwnAvatar}
            onClickOnAvatarPost={onClickOnAvatarItem}
            onClickOnComments={onClickOnComments}
            onClickDeletePost={onClickDelete}
            handleVotePost={handleVotePost} 
            posts={posts}
            onClickOnPost={onClickOnPost}
            onClickEditPost={onClickEditPost}
            isMine={isMine}
            events={events}
            onClickOnEvent={onClickOnEvent}
            onClickOnAvatarEvent={onClickOnAvatarItem}
            onClickDeleteEvent={onClickDelete}
            cancelDelete={cancelDelete}
            proceedDelete={proceedDelete}
            isDeleteOpen={isDeleteOpen}
            onClickEditEvent={onClickEditEvent}
            onClickOnAvatarReview={onClickOnAvatarReview}
            onClickOnCreateEvent={onClickOnCreateEvent}
            onClickOnCreatePost={onClickOnCreatePost}
            onClickOnCreateReview={onClickOnCreateReview}
            onClickOnReview={onClickOnReview}
            reviews={reviews}
            onClickDeleteReview={onClickDelete}
            onClickEditReview={onClickEditReview}
          />
        </>  
      }
    </Layout>
  );
}
