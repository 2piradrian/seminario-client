import { Profile } from "../../../domain";
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
        onClickOnAvatar, 
        onClickOnComments,
        onDownVote,
        onUpVote,
        posts,
    } = ViewModel();

    return(
     <Layout withHeader={true}>
            { pageProfile &&
                <>
                    <ProfileHeader 
                        isFollowing={isFollowing}
                        onClick={toggleFollow}
                        profile={Profile.fromEntity(pageProfile)}
                        ownProfile={false}
                    />
                    <PageDetail 
                        page={pageProfile}
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