import GenericFeed from "../../components/organisms/generic-feed/generic-feed";
import PagesFeed from "../../components/organisms/generic-feed/generic-feed";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function PagesRoute() {
    const { 
        user,
        items,
        onClickOnAvatarItem,
        onClickOnItem,
        onClickOnComments,
        handleVotePost,
        onLogout,
        postTypes,
        onProfileClick,
        onClickCancel,
        onClickDelete,
        isAdminOrMod,
        isMine,
        activeMenuId,
        cancelDelete,
        isAdmin,
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
                { user && postTypes.length !== 0 &&
                        <GenericFeed
                            items={items}
                            user={user}
                            postTypes={postTypes}
                            onClickOnItem={onClickOnItem}
                            onClickOnAvatarItem={onClickOnAvatarItem}
                            onClickOnComments={onClickOnComments}
                            handleVotePost={handleVotePost}
                            onProfileClick={onProfileClick}
                            onClickDelete={onClickDelete}
                            onClickCancel={onClickCancel}
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