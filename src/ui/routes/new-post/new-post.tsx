import { ViewModel } from "./viewmodel";
import Layout from "../../layout/layout";
import NewPostForm from "../../components/molecules/new-post-form/new-post-form";

export default function NewPostRoute() {
    
    const { 
        onSubmit, onCancel, profiles, postTypes
    } = ViewModel();

    return (
        <Layout withHeader={true}>
            { profiles &&
                <NewPostForm 
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    profiles={profiles}
                    postTypes={postTypes}
                />
            }
        </Layout>
    );
}
