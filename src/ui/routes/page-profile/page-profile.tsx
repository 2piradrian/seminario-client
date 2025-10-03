import { Profile } from "../../../domain";
import PageDetail from "../../components/organisms/page-detail/page-detail";
import PostsList from "../../components/organisms/posts-list/posts-list";
import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";


export default function PageProfileRoute() {
    
    const { 
        page, 
        toggleFollow,
        isFollowing,
        onClickOnAvatar, 
        onClickOnComments,
        onDownVote,
        onUpVote,
        posts,
    } = ViewModel();

    return(
     <Layout withHeader={true}>
            { page &&
                <>
                    <ProfileHeader 
                        isFollowing={isFollowing}
                        onClick={toggleFollow}
                        profile={Profile.fromEntity(page)}
                        ownProfile={false}
                    />
                    <PageDetail 
                        page={page}
                    />
                    {posts.length > 0 && (
                        <PostsList
                            posts={posts}
                            onUpVote={onUpVote}
                            onDownVote={onDownVote}
                            onClickOnComments={onClickOnComments}
                            onClickOnAvatar={onClickOnAvatar}
                        />
                    )}
                </>  
            }
        </Layout>
    )
}