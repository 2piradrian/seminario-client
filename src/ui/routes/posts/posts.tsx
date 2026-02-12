import GenericFeed from "../../components/organisms/generic-feed/generic-feed";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function PostsRoute() {
    const { user, 
    onProfileClick,
    onClickOnAvatar,
    onClickOnComments,
    handleVotePost,
    posts,
    pages,
    onClickOnPost,
    onLogout,
    onClickOnCreatePost,
    postTypes,
    cancelDelete,
    onClickCancel,
    onClickDelete,
    isMine,
    isAdmin,
    isAdminOrMod,
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
            { user && postTypes.length !== 0 &&
                    <GenericFeed
                        user={user}
                        onProfileClick={onProfileClick}
                        onClickOnAvatarItem={onClickOnAvatar}
                        onClickOnComments={onClickOnComments}
                        handleVotePost={handleVotePost}
                        items={posts}
                        onClickOnItem={onClickOnPost}
                        onClickOnCreateItem={onClickOnCreatePost}
                        postTypes={postTypes}
                        onClickCancel={onClickCancel}
                        onClickDelete={onClickDelete}
                        createButtonText="Crear nueva publicación"
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