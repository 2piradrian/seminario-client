import { ViewModel } from "./viewmodel";
import Layout from "../../layout/layout";
import NewCatalogForm from "../../components/molecules/new-catalog-form/new-catalog-form";

export default function NewStyleRoute() {
    
    const { 
        onSubmit, 
        onCancel, 
        onLogout,
        user,
        isSubmitting
    } = ViewModel();

    return (
        <Layout 
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
            user={user}
        >
            <NewCatalogForm
                isSubmitting={isSubmitting}
                onCancel={onCancel}
                onSubmit={onSubmit}
                title="Nuevo tipo de publicación"
            />
        </Layout>
    );
}
