import Layout from "../../layout/layout";
import NoResults from "../../components/atoms/no-results/no-results";
import Loading from "../../components/atoms/loading/loading";
import { ViewModel } from "./viewmodel";
import ManageCatalogSection from "../../components/organisms/manage-catalog-section/manage-catalog-section";

export default function ManagePostTypesRoute() {

    const {
    isLoading,
    postTypes,
    user,

    isFormOpen,
    itemToEdit,
    handleCancel,
    handleSubmit,

    onClickOnEditItem,
    onClickOnAddItem,
    onClickOnDeleteItem,

    onLogout
    } = ViewModel();


    return (
        <Layout 
            user={user}
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
        >        
            <>
                {isLoading && <Loading />}

                {!isLoading && postTypes.length > 0 && (
                    <ManageCatalogSection
                        title="Gestión de Tipos de Publicación"
                        items={postTypes}
                        onClickOnAddItem={onClickOnAddItem}
                        onClickOnDeleteItem={onClickOnDeleteItem}
                        onClickOnEditItem={onClickOnEditItem}
                        itemToEdit={itemToEdit}
                        handleCancel={handleCancel}
                        handleSubmit={handleSubmit}
                        isFormOpen={isFormOpen}
                        itemText=" tipo de publicación"
                    />
                )}

                {!isLoading && postTypes.length === 0 && (
                    <NoResults />
                )}
            </>
        </Layout>
    );
}
