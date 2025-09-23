import { ViewModel } from "./viewmodel";
import EditProfileForm from "../../components/molecules/edit-profile-form/edit-profile-form";
import Layout from "../../layout/layout";

export default function EditProfileRoute() {
    const { onSubmit, styles, onAddStyles, onRemoveStyles, instruments, onAddInstruments, onRemoveInstruments} = ViewModel();


    return (
        <Layout withHeader={true}>
            <EditProfileForm 
                onSubmit={onSubmit}
                styles={styles}
                onAddStyles={onAddStyles}
                onRemoveStyles={onRemoveStyles}
                instruments={instruments}
                onAddInstruments={onAddInstruments}
                onRemoveInstruments={onRemoveInstruments}
            />
        </Layout>
    )

}