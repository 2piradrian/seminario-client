import BannedUsersSection from "../../components/molecules/banned-users-section/banned-users-section";
import Layout from "../../layout/layout";
import { ViewModel } from "./viewmodel";

export default function BannedUsersRoute() {
    const {
        user,
/*         bannedUsers,
 */        onLogout
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

            </>
        </Layout>
    );
}