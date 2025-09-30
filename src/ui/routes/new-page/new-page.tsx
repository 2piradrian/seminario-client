import { ViewModel } from "./viewmodel"
import PageForm from "../../components/molecules/new-page-form/new-page-form"
import Layout from "../../layout/layout"

export default function NewPageRoute(){
    const{
        onSubmit, onCancel, pageTypes
    } = ViewModel()

    return(
        <Layout withHeader={true}>
            {
                <PageForm
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    pageTypes={pageTypes}
                />
            }
        </Layout>
    )
}