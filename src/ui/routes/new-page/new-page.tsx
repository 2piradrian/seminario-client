import { ViewModel } from "./viewmodel"
import PageForm from "../../components/molecules/page-form/page-form"
import Layout from "../../layout/layout"

export default function NewPageRoute(){
    const{
        onSubmit, onCancel, users, selectedMembers,
        onAddMember, onRemoveMember, initial
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
                    initial={initial}
                />
            }
        </Layout>
    )
}