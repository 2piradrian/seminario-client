import ProfileList from "../../components/organisms/profile-list/profile-list";
import ViewModel  from "./viewmodel";

export default function FollowsRoute() {
    const {profiles, title} = ViewModel();

    return( 
        <>
            <ProfileList 
                profiles={profiles}
                title={title}
            />
        </>
    )
}