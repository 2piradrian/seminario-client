import EventDetail from "../../components/organisms/event-detail/event-detail";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EventDetailRoute() {

    const {
        onClickOnAvatar,
        onClickOnEvent,
        onClickDelete,
        onClickCancel,
        user,
        isMine,
        isAdminOrMod,
        event,
        proceedDelete,
        proceedCancel,
        cancelDelete,
        cancelCancelEvent,
        isDeleteOpen,
        isCancelOpen,
        onClickEdit,
        handleToggleAssist,
        isEnded,
        activeMenuId,
        toggleMenu,
        closeMenu,
        onLogout
    } = ViewModel();

    return (
        <Layout
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
        >
            {
                event &&
                <EventDetail
                    cancelDelete={cancelDelete}
                    cancelCancelEvent={cancelCancelEvent}
                    event={event}
                    isDeleteOpen={isDeleteOpen}
                    isCancelOpen={isCancelOpen}
                    isMine={isMine}
                    isAdminOrMod={isAdminOrMod}
                    onClickDelete={onClickDelete}
                    onClickCancel={onClickCancel}
                    onClickOnAvatar={onClickOnAvatar}
                    onClickOnEvent={onClickOnEvent}
                    proceedDelete={proceedDelete}
                    proceedCancel={proceedCancel}
                    onClickEdit={onClickEdit}
                    handleToggleAssist={handleToggleAssist}
                    isEnded={isEnded}
                    activeMenuId={activeMenuId}
                    onToggleMenu={toggleMenu}
                    onCloseMenu={closeMenu}
                />
            }
        </Layout>
    )
}
