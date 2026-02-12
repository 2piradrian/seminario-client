import GenericFeed from "../../components/organisms/generic-feed/generic-feed";
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
        onClickEdit,
        proceedDelete,
        cancelDelete,
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
            {user && postTypes.length !== 0 && (
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
                    onClickEdit={onClickEdit}
                    onClickCancel={onClickCancel}
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
