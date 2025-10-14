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
        onClickDelete,
        onDownVote,
        onUpVote,
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
                        ownProfile={false} // TO DO: IMPLEMENT FIND USER BY ID                  
                    />
                    <PageDetail 
                        page={pageProfile}
                    />
                    {posts.length > 0 && (
                        <PostsList
                            posts={posts}
                            onUpVote={onUpVote} // TO DO: IMPLEMENT HANDLE VOTE POST ON PAGE PROFILES
                            onDownVote={onDownVote}
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