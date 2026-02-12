import GenericFeed from "../../components/organisms/generic-feed/generic-feed";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function PostsRoute() {
    const {
        user,
        onProfileClick,
        onClickOnAvatar,
        onClickOnComments,
        handleVotePost,
        posts,
        onClickOnPost,
        onLogout,
        onClickOnCreatePost,
        postTypes,
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
        isMine,
        isAdminOrMod,
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
            {user && postTypes.length !== 0 && (
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
                    onClickEdit={onClickEdit}
                    createButtonText="Crear nueva publicación"
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
