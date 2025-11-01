// ProfileRoute.tsx
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
    onClickEdit,
    onFollowersClick,
    onFollowingClick,
    onClickOnCreatePost,
    onClickOnCreatePage,
    events,
    onClickOnEvent,
    tabs,
    activeTab,
    onTabClick,
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
            onClickEdit={onClickEdit}
          />
        </>  
      }
    </Layout>
  );
}
