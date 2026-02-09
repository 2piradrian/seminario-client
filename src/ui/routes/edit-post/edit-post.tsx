import EditPostForm from "../../components/molecules/edit-post-form/edit-post-form";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EditPostRoute() {

    const { 
        onSubmit, onCancel, post, postTypes, user, onLogout
    } = ViewModel();

    return(
        <Layout 
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
            user={user}
        >
            { post &&
                <EditPostForm 
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    post={post}
                    postTypes={postTypes}
                />
            }
        </Layout>
    )

}
