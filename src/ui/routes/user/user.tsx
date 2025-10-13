import { Profile } from "../../../domain";
import ProfileDetail from "../../components/organisms/user-profile-detail/user-profile-detail";
import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function UserRoute(){

    const {isFollowing, 
        toggleFollow, 
        userProfile,
        onFollowersClick, 
        onFollowingClick
    } = ViewModel();

    return (

        <Layout withHeader={true}>
            { userProfile &&
                <>
                    <ProfileHeader 
                        isFollowing={isFollowing}
                        onClick={toggleFollow}
                        ownProfile={false}
                        profile={Profile.fromEntity(userProfile, undefined)}   
                        followersCount={userProfile.followersCount}      
                        followingCount={userProfile.followingCount}
                        onFollowersClick={onFollowersClick}
                        onFollowingClick={onFollowingClick}        
                    />

                    <ProfileDetail
                        profile={userProfile}
                    />
                </>
            }
        </Layout>
    )
}