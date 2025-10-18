import ProfileList from "../../components/organisms/profile-list/profile-list";
import ViewModel  from "./viewmodel";

export default function FollowsRoute() {
    const {profiles} = ViewModel();

    return( 
        <>
            { profiles.length === 0 ? 
                <span>No hay seguidores</span> :
                <ProfileList profiles={profiles} />
            }        
        </>
    )
}