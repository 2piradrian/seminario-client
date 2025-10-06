import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";
import { Profile } from "../../../domain/entity/profile";
import PagePosts from "../../components/organisms/page-posts/page-post";

export default function ProfileRoute(){

    const { 
        goToEditProfile, 
        profile,
        onClickOnAvatar, 
        onClickOnComments,
        onClickDelete,
        onDownVote,
        onUpVote,
        posts,
        onClickOnPost,
        isMine
    } = ViewModel();

    return (
        <Layout withHeader={true}>
            { profile && posts &&
                <>
                    <ProfileHeader 
                        isFollowing 
                        onClick={goToEditProfile} 
                        profile={Profile.fromEntity(profile)}
                        ownProfile
                    />
                    <PagePosts
                        profile={profile}
                        onClickOnAvatar={onClickOnAvatar}
                        onClickOnComments={onClickOnComments}
                        onClickDelete={onClickDelete}
                        onDownVote={onDownVote} 
                        onUpVote={onUpVote}
                        posts={posts}
                        onClickOnPost={onClickOnPost}
                        isMine={isMine}
                    />
                </>  
            }
        </Layout>
    )

}