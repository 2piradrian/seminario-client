import EditPageForm from "../../components/molecules/edit-page-form/edit-page-form";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EditPageRoute() {

    const { onSubmit, onCancel, page, user, onLogout } = ViewModel();

    return(
        <Layout 
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
        >
            <EditPageForm 
                onSubmit={onSubmit}
                onCancel={onCancel}
                page={page}
            />
        </Layout>
    ); 

}
