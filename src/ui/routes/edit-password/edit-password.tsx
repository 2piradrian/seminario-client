import EditPasswordForm from "../../components/molecules/edit-password-form/edit-password-form";
import Layout from "../../layout/layout";
import { ViewModel } from "./viewmodel";

export default function EditPasswordRoute() {

    const { onSubmit } = ViewModel();

    return (
        <Layout withHeader={false}>
            <EditPasswordForm onSubmit={onSubmit}/>
        </Layout>
    )
}
