import { ViewModel } from "./viewmodel";
import Layout from "../../layout/layout";
import NewPostForm from "../../components/molecules/new-post-form/new-post-form";

export default function NewPostRoute() {
    
    const { 
        onSubmit, onCancel, profiles, postTypes, onLogout
    } = ViewModel();

    return (
        <Layout 
            withHeader={true}
            headerProfile={profiles && profiles[0] ? profiles[0] : undefined}
            onLogout={onLogout}
        >
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
