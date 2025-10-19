import { Profile } from "../../../domain";
import ProfileFeed from "../../components/organisms/profile-feed/profile-feed";
import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";


export default function PageProfileRoute() {
    
    const { 
        pageProfile, 
        toggleFollow,
        isFollowing,
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
        onClickOnPost
    } = ViewModel();

    return(
     <Layout withHeader={true}>
            { pageProfile && posts &&
                <>
                    <ProfileHeader 
                        isFollowing={isFollowing}
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