import { ViewModel } from "./viewmodel";
import Layout from "../../layout/layout";
import NewPostForm from "../../components/molecules/new-post-form/new-post-form";

export default function NewPostRoute() {
    
    const { 
        onSubmit, onCancel
    } = ViewModel();

    return (
        <Layout withHeader={true}>
            <NewPostForm 
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </Layout>
    );
}
