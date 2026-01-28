import { ViewModel } from "./viewmodel";
import EditProfileForm from "../../components/molecules/edit-profile-form/edit-profile-form";
import Layout from "../../layout/layout";

export default function EditProfileRoute() {

    const { 
        onSubmit, onCancel, 
        styles, selectedStyles, onAddStyles, onRemoveStyles, 
        instruments, selectedInstruments, onAddInstruments, onRemoveInstruments, 
        user, onLogout, isSubmitting
    } = ViewModel();

    return (
        <Layout 
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
        >
            {
                user &&
                <EditProfileForm 
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    styles={styles}
                    selectedStyles={selectedStyles}
                    onAddStyles={onAddStyles}
                    onRemoveStyles={onRemoveStyles}
                    instruments={instruments}
                    selectedInstruments={selectedInstruments}
                    onAddInstruments={onAddInstruments}
                    onRemoveInstruments={onRemoveInstruments}
                    profile={user.profile}
                    isSubmitting={isSubmitting}
                />
            }
        </Layout>
    )

}
