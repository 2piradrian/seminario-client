import ProfileList from "../../components/organisms/profile-list/profile-list";
import Layout from "../../layout/layout";
import ViewModel  from "./viewmodel";

export default function FollowsRoute() {
    const { 
        loading, 
        profiles, 
        title, 
        toggleFollow, 
        onClickOnProfile,
        currentUserId,
        user
    } = ViewModel();

    return( 
        <>
            <Layout 
                withHeader={true}
                headerProfile={user ? user.profile.toProfile() : undefined}
            >
            { !loading &&
                <ProfileList 
                    profiles={profiles}
                    title={title}
                    toggleFollow={toggleFollow}
                    onClickOnProfile={onClickOnProfile}
                    showDescription={false}
                    currentUserId={currentUserId}
                />
            }
            </Layout>
        </>
    )
}
