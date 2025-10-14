import { Profile, Vote } from "../../../domain";
import PageDetail from "../../components/organisms/page-detail/page-detail";
import PostsList from "../../components/organisms/posts-list/posts-list";
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
        isMine
    } = ViewModel();

    return(
     <Layout withHeader={true}>
            { pageProfile &&
                <>
                    <ProfileHeader 
                        isFollowing={isFollowing}
                        onClick={toggleFollow}
                        profile={Profile.fromEntity(undefined, pageProfile)}
                        ownProfile={false}
                        followersCount={pageProfile.followersCount}
                        onFollowersClick={onFollowersClick}
                    />
                    <PageDetail 
                        page={pageProfile}
                    />
                    {posts.length > 0 && (
                        <PostsList
                            posts={posts}
                            handleVotePost={handleVotePost}
                            onClickOnComments={onClickOnComments}
                            onClickOnAvatar={onClickOnAvatar}
                            onClickDelete={onClickDelete}
                            isMine={isMine}
                            onClickOnPost={()=>{}}
                        />
                    )}
                </>  
            }
        </Layout>
    )
}