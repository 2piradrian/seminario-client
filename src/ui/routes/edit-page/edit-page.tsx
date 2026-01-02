import EditPageForm from "../../components/molecules/edit-page-form/edit-page-form";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EditPageRoute() {

    const {
        onSubmit,
        onCancel,
        pageTypes,
        users,
        selectedMembers,
        onAddMembers,
        onRemoveMembers,
        page,
        user,
        onLogout
    } = ViewModel();

    return (
        <Layout
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
        >
            {page &&
                <EditPageForm
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    onAddMembers={onAddMembers}
                    onRemoveMembers={onRemoveMembers}
                    pageTypes={pageTypes}
                    users={users}
                    selectedMembers={selectedMembers}
                    page={page}
                />
            }
        </Layout>
    );

}
