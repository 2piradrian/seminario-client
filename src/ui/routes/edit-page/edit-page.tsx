import EditPageForm from "../../components/molecules/edit-page-form/edit-page-form";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EditPageRoute() {

    const { onSubmit, onCancel, page } = ViewModel();

    return(
        <Layout withHeader={true}>
            <EditPageForm 
                onSubmit={onSubmit}
                onCancel={onCancel}
                page={page}
            />
        </Layout>
    ); 

}