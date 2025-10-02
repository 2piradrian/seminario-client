import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import ProfileDetail from "../../components/organisms/profile-detail/profile-detail";
import PostsList from "../../components/organisms/posts-list/posts-list";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";
import { Profile } from "../../../domain/entity/profile";

export default function ProfileRoute(){

    const { 
        goToEditProfile, profile,
        onClickOnAvatar, 
        onClickOnComments,
        onDownVote,
        onUpVote,
        posts 
    } = ViewModel();

    return (
        <Layout withHeader={true}>
            { profile &&
                <>
                    <ProfileHeader 
                        isFollowing 
                        onClick={goToEditProfile} 
                        profile={Profile.fromEntity(profile)}
                        ownProfile
                    />
                    <ProfileDetail 
                        profile={profile}
                    />
                    <PostsList 
                        onClickOnAvatar={onClickOnAvatar}
                        onClickOnComments={onClickOnComments}
                        onDownVote={onDownVote}
                        onUpVote={onUpVote}
                        posts={posts}
                    /> 
                </>  
            }
        </Layout>
    )

}