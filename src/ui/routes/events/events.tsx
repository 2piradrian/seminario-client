import GenericFeed from "../../components/organisms/generic-feed/generic-feed";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EventsRoute() {
    const { events, 
        onClickOnCreateEvent, 
        onClickOnEvent, 
        onProfileClick, 
        user, 
        onLogout, 
        onClickOnAvatar,
        cancelDelete,
        onClickCancel,
        onClickDelete,
        isAdminOrMod,
        isAdmin,
        isMine,
        activeMenuId,
        onCloseMenu,
        onToggleMenu
    } = ViewModel();

    return(
        <Layout 
            withHeader
            headerProfile={user ? user.toProfile() : undefined}
            onLogout={onLogout}
            user={user}
        >
            { user && 
                <GenericFeed
                    user={user}
                    onProfileClick={onProfileClick}
                    onClickOnAvatarItem={onClickOnAvatar}
                    items={events}
                    onClickOnItem={onClickOnEvent}
                    onClickOnCreateItem={onClickOnCreateEvent}
                    onClickCancel={onClickCancel}
                    onClickDelete={onClickDelete}
                    createButtonText="Crear nuevo evento"
                    isAdminOrMod={isAdminOrMod}
                    isMine={isMine}
                    activeMenuId={activeMenuId}
                   onCloseMenu={onCloseMenu}
                   onToggleMenu={onToggleMenu}
                />
            }
        </Layout>
    )
}