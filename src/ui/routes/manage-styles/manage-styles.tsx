import Layout from "../../layout/layout";
import NoResults from "../../components/atoms/no-results/no-results";
import Loading from "../../components/atoms/loading/loading";
import { ViewModel } from "./viewmodel";
import ManageCatalogSection from "../../components/organisms/manage-catalog-section/manage-catalog-section";
import Modal from "../../components/molecules/modal/modal";

export default function ManageStylesRoute() {
    const {
        isLoading,
        styles,
        user,
        onClickOnEditItem,
        onClickOnAddItem,
        onClickDelete,
        onLogout,
        cancelDelete,
        proceedDelete,
        isDeleteOpen
    } = ViewModel();

    return (
        <Layout
            user={user}
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
        >
            {isLoading && <Loading />}

            {!isLoading && styles.length > 0 && (
                <ManageCatalogSection
                    title="Gestión de Estilos"
                    items={styles}
                    onClickOnAddItem={onClickOnAddItem}
                    onClickOnDeleteItem={onClickDelete}
                    onClickOnEditItem={onClickOnEditItem}
                />
            )}

            {!isLoading && styles.length === 0 && <NoResults />}

            {isDeleteOpen && (
                <Modal
                    title="Eliminar del catálogo"
                    cancelText="Cancelar"
                    deleteText="Eliminar"
                    onCancel={cancelDelete}
                    onProceed={proceedDelete}
                />
            )}
        </Layout>
    );
}
