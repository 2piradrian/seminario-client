import Layout from "../../layout/layout";
import { ViewModel } from "./viewmodel";

export default function EditProfileRoute() {
    const {} = ViewModel();

    return (
        <Layout withHeader={true}>
            <div>EditProfileRoute</div>
        </Layout>
    )
}