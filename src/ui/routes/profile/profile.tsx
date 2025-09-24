import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import ProfileDetail from "../../components/organisms/profile-detail/profile-detail"
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function ProfileRoute(){

    const { goToEditProfile, profile } = ViewModel();

    return (
        <Layout withHeader={true}>
            { profile &&
                <>
                    <ProfileHeader 
                        isFollowing 
                        onClick={goToEditProfile} 
                        profile={profile}
                        ownProfile
                    />
                    <ProfileDetail 
                        profile={profile}
                    />
                </>  
            }
        </Layout>
    )

}