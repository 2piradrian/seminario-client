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
        onClickOnAvatar, 
        onClickOnComments,
        onClickDelete,
        handleVotePost,
        posts,
        isMine,
        cancelDelete,
        proceedDelete,
        isDeleteOpen,
        onClickOnPost,
        onClickOnMember
    } = ViewModel();

    return(
     <Layout withHeader={true}>
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
                        onClickOnAvatar={onClickOnAvatar}
                        onClickDelete={onClickDelete}
                        isMine={isMine}
                        onClickOnPost={onClickOnPost}
                    />
                </>  
            }
        </Layout>
    )
}