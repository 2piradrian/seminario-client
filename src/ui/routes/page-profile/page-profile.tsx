import PostDetail from "../../components/organisms/post-detail/post-detail";
import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";


export default function PageProfileRoute() {
    
    const { 
        profile, 
        toggleFollow,
        isFollowing,
        onClickOnAvatar, 
        onClickOnComments,
        onDownVote,
        onUpVote,
        posts,
        comments, 
    } = ViewModel();

    return(
     <Layout withHeader={true}>
            { profile &&
                <>
                    <ProfileHeader 
                        isFollowing={isFollowing}
                        onClick={toggleFollow}
                        profile={profile}
                        ownProfile={false}
                    />
                    {posts.length > 0 && (
                        <PostDetail
                            post={posts[0]}
                            onClickOnAvatarPost={onClickOnAvatar}
                            onClickOnComment={onClickOnComments}
                            onDownVotePost={onDownVote}
                            onUpVotePost={onUpVote}
                            comments={comments}
                            onClickOnAvatarComment={onClickOnAvatar}
                            onDownVoteComment={onDownVote}
                            onUpVoteComment={onUpVote}
                        />
                    )}

                </>  
            }
        </Layout>
    )

}