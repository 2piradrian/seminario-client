import EditCatalogForm from "../../components/molecules/edit-catalog-form/edit-catalog-form";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EditPageTypeRoute() {

    const { 
        onSubmit, onCancel, pageType, user, onLogout, isSubmitting
    } = ViewModel();

    return(
        <Layout 
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
            user={user}
        >
            { pageType &&
                <EditCatalogForm 
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    item={pageType}
                    isSubmitting={isSubmitting}
                />
            }
        </Layout>
    )

}
