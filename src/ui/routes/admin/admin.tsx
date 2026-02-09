import AdminDashboard from "../../components/organisms/admin-dashboard/admin-dashboard";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function AdminRoute() {

    const {
        onClickOnAssignRole,
        onClickOnReports,
        onClickOnManageCatalog,
        user,
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
                <AdminDashboard 
                    onClickOnAssignRole={onClickOnAssignRole}
                    onClickOnManageCatalog={onClickOnManageCatalog}
                    onClickOnReports={onClickOnReports}                
                />
            </>
        </Layout>
        
  );
}
