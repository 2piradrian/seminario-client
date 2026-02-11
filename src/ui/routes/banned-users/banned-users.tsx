import Loading from "../../components/atoms/loading/loading";
import NoResults from "../../components/atoms/no-results/no-results";
import BannedUsersSection from "../../components/molecules/banned-users-section/banned-users-section";
import Layout from "../../layout/layout";
import { ViewModel } from "./viewmodel";

export default function BannedUsersRoute() {
    const {
        user,
        bannedUsers,
        isLoading,
        page,
        setPage,
        onLogout
    } = ViewModel();

    return (
        <Layout 
            user={user}
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
        >        
            <>
                <BannedUsersSection 
                    users={bannedUsers}
                />
                
                {isLoading && <Loading/>}
            
                {!isLoading && bannedUsers.length === 0 && (
                    <NoResults/>
                )}
                
            
            </>
        </Layout>
    );
}