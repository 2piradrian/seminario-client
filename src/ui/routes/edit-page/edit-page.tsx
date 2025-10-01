import EditPageForm from "../../components/molecules/edit-page-form/edit-page-form";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EditPageRoute() {

    const { onSubmit, onCancel, pageProfile } = ViewModel();

    return(
        <Layout withHeader={true}>
            page && 
            <EditPageForm 
                onSubmit={onSubmit}
                onCancel={onCancel}
                page={pageProfile}
            />
        </Layout>
    ); 

}