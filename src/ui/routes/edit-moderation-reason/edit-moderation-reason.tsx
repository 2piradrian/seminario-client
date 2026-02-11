import EditCatalogForm from "../../components/molecules/edit-catalog-form/edit-catalog-form";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EditModerationReasonRoute() {

    const { 
        onSubmit, onCancel, moderationReason, user, onLogout, isSubmitting
    } = ViewModel();

    return(
        <Layout 
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
            user={user}
        >
            { moderationReason &&
                <EditCatalogForm 
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    item={moderationReason}
                    isSubmitting={isSubmitting}
                />
            }
        </Layout>
    )

}
