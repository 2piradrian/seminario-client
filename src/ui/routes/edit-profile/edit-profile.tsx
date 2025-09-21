import EditProfileForm from "../../components/molecules/edit-profile-form/edit-profile-form";
import Layout from "../../layout/layout";
import { ViewModel } from "./viewmodel";

export default function EditProfileRoute() {
    const {  } = ViewModel();

    return (
        <Layout withHeader={true}>
            <EditProfileForm 
            />
        </Layout>
    )

}