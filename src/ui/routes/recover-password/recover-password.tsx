import RecoverForm from "../../components/molecules/recover-form/recover-form";
import Layout from "../../layout/layout";
import { ViewModel } from "./viewmodel";

export default function RecoverPasswordRoute() {

    const { onSubmit } = ViewModel();

    return (
        <Layout withHeader={false}>
            <RecoverForm onSubmit={onSubmit} />
        </Layout>
    )
}
