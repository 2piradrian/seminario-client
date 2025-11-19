import { ViewModel } from "./viewmodel";
import EditProfileForm from "../../components/molecules/edit-profile-form/edit-profile-form";
import Layout from "../../layout/layout";

export default function EditProfileRoute() {

    const { 
        onSubmit, onCancel, 
        styles, selectedStyles, onAddStyles, onRemoveStyles, 
        instruments, selectedInstruments, onAddInstruments, onRemoveInstruments, 
        user, onClose, isDeleteModalOpen, openDeleteModal,
        closeDeleteModal, confirmDeleteAccount
    } = ViewModel();

    return (
        <Layout withHeader={true}>
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
                    onClose={onClose}
                    isDeleteModalOpen={isDeleteModalOpen}
                    onOpenDeleteModal={openDeleteModal}
                    onCloseDeleteModal={closeDeleteModal}
                    onConfirmDeleteAccount={confirmDeleteAccount}
                />
            }
        </Layout>
    )

}
