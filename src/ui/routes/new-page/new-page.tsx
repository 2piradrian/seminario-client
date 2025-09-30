import { ViewModel } from "./viewmodel"
import PageForm from "../../components/molecules/new-page/new-page"
import Layout from "../../layout/layout"

export default function NewPageRoute(){
    const{
        onSubmit, onCancel, users, selectedMembers,
        onAddMember, onRemoveMember,
    } = ViewModel()

    return(
        <Layout withHeader={true}>
            {
                <PageForm
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    users={users}
                    selectedMembers={selectedMembers}
                    onAddMember={onAddMember}
                    onRemoveMember={onRemoveMember}
                />
            }
        </Layout>
    )
}