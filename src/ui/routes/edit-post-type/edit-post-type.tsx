import EditCatalogForm from "../../components/molecules/edit-catalog-form/edit-catalog-form";
import EditPostForm from "../../components/molecules/edit-post-form/edit-post-form";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EditPostTypeRoute() {

    const { 
        onSubmit, onCancel, postType, user, onLogout, isSubmitting
    } = ViewModel();

    return(
        <Layout 
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
            user={user}
        >
            { postType &&
                <EditCatalogForm 
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    item={postType}
                    isSubmitting={isSubmitting}
                />
            }
        </Layout>
    )

}
