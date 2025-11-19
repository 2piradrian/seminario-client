import EditPostForm from "../../components/molecules/edit-post-form/edit-post-form";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EditPostRoute() {

    const { 
        onSubmit, onCancel, post 
    } = ViewModel();

    return(
        <Layout withHeader={true}>
            { post &&
                <EditPostForm 
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    post={post}
                />
            }
        </Layout>
    )

}