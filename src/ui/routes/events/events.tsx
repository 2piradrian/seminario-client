import GenericFeed from "../../components/organisms/generic-feed/generic-feed";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EventsRoute() {
    const {
        events,
        onClickOnCreateEvent,
        onClickOnEvent,
        onProfileClick,
        user,
        onLogout,
        onClickOnAvatar,
        cancelDelete,
        onClickCancel,
        onClickDelete,
        onClickEdit,
        proceedDelete,
        isDeleteOpen,
        moderationReasonOptions,
        selectedDeleteReason,
        setSelectedDeleteReason,
        shouldShowDeleteReasonSelector,
        isItemMine,
        isAdminOrMod,
        isMine,
        activeMenuId,
        onCloseMenu,
        onToggleMenu
    } = ViewModel();

    return (
        <Layout
            withHeader
            headerProfile={user ? user.toProfile() : undefined}
            onLogout={onLogout}
            user={user}
        >
            {user && (
                <GenericFeed
                    user={user}
                    onProfileClick={onProfileClick}
                    onClickOnAvatarItem={onClickOnAvatar}
                    items={events}
                    onClickOnItem={onClickOnEvent}
                    onClickOnCreateItem={onClickOnCreateEvent}
                    onClickCancel={onClickCancel}
                    onClickDelete={onClickDelete}
                    onClickEdit={onClickEdit}
                    createButtonText="Crear nuevo evento"
                    isAdminOrMod={isAdminOrMod}
                    isMine={isMine}
                    isItemMine={isItemMine}
                    activeMenuId={activeMenuId}
                    onCloseMenu={onCloseMenu}
                    onToggleMenu={onToggleMenu}
                    isDeleteOpen={isDeleteOpen}
                    cancelDelete={cancelDelete}
                    proceedDelete={proceedDelete}
                    moderationReasonOptions={moderationReasonOptions}
                    selectedDeleteReason={selectedDeleteReason}
                    onDeleteReasonChange={setSelectedDeleteReason}
                    showDeleteReasonSelector={shouldShowDeleteReasonSelector}
                />
            )}
        </Layout>
    );
}
