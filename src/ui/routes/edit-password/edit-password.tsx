import EditPasswordForm from "../../components/molecules/edit-password-form/edit-password-form";
import Layout from "../../layout/layout";
import { ViewModel } from "./viewmodel";

export default function EditPasswordRoute() {

    const { onSubmit, isSubmitting } = ViewModel();

    return (
        <Layout withHeader={false}>
            <EditPasswordForm onSubmit={onSubmit} isSubmitting={isSubmitting}/>
        </Layout>
    )
}
