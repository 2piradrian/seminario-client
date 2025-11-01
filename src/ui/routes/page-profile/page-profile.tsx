import { Profile } from "../../../domain";
import ProfileFeed from "../../components/organisms/profile-feed/profile-feed";
import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";


export default function PageProfileRoute() {
    
    const { 
        pageProfile, 
        toggleFollow,
        onFollowersClick,
        onClickOnComments,
        tabs,
        onClickDelete,
        handleVotePost,
        posts,
        isMine,
        cancelDelete,
        proceedDelete,
        isDeleteOpen,
        onClickOnPost,
        onClickOnMember,
        activeTab,
        onClickOnAvatarItem,
        onTabClick,
        events,
        onClickOnEvent,
    } = ViewModel();

    return(
     <Layout withHeader={true}>
            { pageProfile && posts &&
                <>
                    <ProfileHeader 
                        isFollowing={pageProfile.isFollowing}
                        onClick={toggleFollow}
                        profile={Profile.fromEntity(undefined, pageProfile)}
                        ownProfile={false}
                        followersCount={pageProfile.followersCount}
                        onFollowersClick={onFollowersClick}
                        onClickOnEditProfile={() => {}}     
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
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabClick={onTabClick}  
                        events={events}
                        onClickOnAvatarEvent={onClickOnAvatarItem}
                        onClickOnEvent={onClickOnEvent}
                    />
                </>  
            }
        </Layout>
    )
}