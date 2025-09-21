import ProfileDetail from "../../components/organisms/profile-detail/profile-detail";
import ProfileHeader from "../../components/organisms/profile-header/profile-header";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function UserRoute(){

    const {isFollowing, toggleFollow} = ViewModel();

    return (

        <Layout withHeader={true}>
            <ProfileHeader 
                isFollowing={isFollowing}
                onClick={toggleFollow}
                ownProfile={false}
            />
            <ProfileDetail/>
        </Layout>
    )
}