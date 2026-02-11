import Layout from "../../layout/layout";
import EditRolesForm from "../../components/molecules/edit-roles-form/edit-roles-form";
import TabNavigator from "../../components/atoms/tab-navigator/tab-navigator";
import UserRoleItem from "../../components/atoms/user-role-item/user-role-item";
import NoResults from "../../components/atoms/no-results/no-results";
import Loading from "../../components/atoms/loading/loading";
import { Tabs } from "../../../core";
import { Role } from "../../../domain";
import ReportsDashboard from "../../components/organisms/reports-dashboard/reports-dashboard";
import ViewModel from "./viewmodel";

export default function ReportsRoute() {

    const {
        isLoading,
        activeTab,
        onTabClick,
        user,
        reports,
        onLogout
    } = ViewModel();


    return (
        <Layout 
            user={user}
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
        >        
            <ReportsDashboard
                activeTab={activeTab}
                onTabClick={onTabClick}
                tabs={Tabs.results}
                reports={reports}
            />

            {isLoading && <Loading/>}

            {!isLoading && (
                <NoResults/>
            )}
        </Layout>
    );
}
