import EditCatalogForm from "../../components/molecules/edit-catalog-form/edit-catalog-form";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EditInstrumentRoute() {

    const { 
        onSubmit, onCancel, instrument, user, onLogout, isSubmitting
    } = ViewModel();

    return(
        <Layout 
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
            user={user}
        >
            { instrument &&
                <EditCatalogForm 
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    item={instrument}
                    isSubmitting={isSubmitting}
                />
            }
        </Layout>
    )

}
