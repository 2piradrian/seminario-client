import ProfileList from "../../components/organisms/profile-list/profile-list";
import Layout from "../../layout/layout";
import ViewModel  from "./viewmodel";

export default function FollowsRoute() {
    const { 
        loading, 
        profiles, 
        title, 
        toggleFollow, 
        onClickOnProfile
    } = ViewModel();

    return( 
        <>
            <Layout withHeader={true}>
            { !loading &&
                <ProfileList 
                    profiles={profiles}
                    title={title}
                    toggleFollow={toggleFollow}
                    onClickOnProfile={onClickOnProfile}
                    showDescription={false}
                />
            }
            </Layout>
        </>
    )
}