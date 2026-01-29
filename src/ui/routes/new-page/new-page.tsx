import ViewModel from "./viewmodel";
import PageForm from "../../components/molecules/new-page-form/new-page-form"
import Layout from "../../layout/layout"

export default function NewPageRoute(){
    const{
        onSubmit, onCancel, pageTypes, user, onLogout, isSubmitting
    } = ViewModel()

    return(
        <Layout 
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
        >
            {
                <PageForm
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    pageTypes={pageTypes}
                    isSubmitting={isSubmitting}
                />
            }
        </Layout>
    )
}
