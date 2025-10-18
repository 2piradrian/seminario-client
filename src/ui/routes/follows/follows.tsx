import ProfileList from "../../components/organisms/profile-list/profile-list";
import Layout from "../../layout/layout";
import ViewModel  from "./viewmodel";

export default function FollowsRoute() {
    const {profiles, title, toggleFollow} = ViewModel();

    return( 
        <>
        <Layout withHeader={true}>
                <ProfileList 
                    profiles={profiles}
                    title={title}
                    toggleFollow={toggleFollow}
                />
            </Layout>
        </>
    )
}